import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useNews } from '../context/NewsContext';
import { Navbar } from '../components/Navbar';
import { Newspaper, Calendar, Play } from 'lucide-react';

export const UserNewsPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { news, loading } = useNews();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <Newspaper size={40} className="text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('latestNews').split(' ')[0]} <span className="text-gradient-primary">{t('news')}</span>
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                            {t('newsSubtitle')}
                        </p>
                    </motion.div>

                    {/* News List */}
                    {news.length > 0 ? (
                        <div className="space-y-8">
                            {news.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-2xl border backdrop-blur-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                                    style={{ backgroundColor: cardBg, borderColor: borderColor }}
                                >
                                    <div className="grid md:grid-cols-3 gap-0">
                                        {/* Media Section */}
                                        {(item.image || item.video) && (
                                            <div className="md:col-span-1 aspect-video md:aspect-auto relative overflow-hidden bg-gray-900/20">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}
                                                {item.video && (
                                                    <div className="relative w-full h-full">
                                                        <video
                                                            src={item.video}
                                                            className="w-full h-full object-cover"
                                                            controls
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                                                            <Play size={48} className="text-white opacity-80" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Content Section */}
                                        <div className={`${item.image || item.video ? 'md:col-span-2' : 'md:col-span-3'} p-8`}>
                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-sm mb-4" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                                <Calendar size={16} />
                                                <time dateTime={item.createdAt}>
                                                    {formatDate(item.createdAt)}
                                                </time>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                                {item.description}
                                            </p>

                                            {/* Updated info if different from created */}
                                            {item.updatedAt !== item.createdAt && (
                                                <div className="mt-6 pt-6 border-t" style={{ borderColor: borderColor }}>
                                                    <p className="text-xs" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                                        {t('lastUpdated')}: {formatDate(item.updatedAt)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Newspaper size={80} className="mx-auto mb-6 opacity-10" />
                            <h3 className="text-2xl font-bold mb-2">{t('noNewsAvailable')}</h3>
                            <p className="text-lg" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                {t('checkBackLater')}
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};
