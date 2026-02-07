import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { HeroVideo } from '../components/HeroVideo';
import { Navbar } from '../components/Navbar';
import {
    BookOpen,
    Layers,
    TrendingUp,
    Award,
    BarChart3,
    Target,
    Shield,
    Sparkles,
    ChevronRight,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
};

const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

export const LandingPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    const highlights = [
        {
            icon: BookOpen,
            title: t('professionalTradingEducation'),
            description: t('professionalTradingEducationDesc'),
        },
        {
            icon: Layers,
            title: t('stepByStepLearning'),
            description: t('stepByStepLearningDesc'),
        },
        {
            icon: TrendingUp,
            title: t('beginnerToProPath'),
            description: t('beginnerToProPathDesc'),
        },
    ];

    const levels = [
        { key: 'beginnerLevel', icon: Target, progress: 33 },
        { key: 'intermediateLevel', icon: BarChart3, progress: 66 },
        { key: 'professionalLevel', icon: Award, progress: 100 },
    ];

    const whyChoose = [
        { key: 'structuredCourses', subKey: 'structuredCoursesDesc', icon: Layers },
        { key: 'premiumContent', subKey: 'premiumContentDesc', icon: Sparkles },
        { key: 'realMarketKnowledge', subKey: 'realMarketKnowledgeDesc', icon: Shield },
    ];

    return (
        <div
            className="min-h-screen relative overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <Navbar />

            <main className="relative pt-20 pb-24">
                {/* Hero Video Section — main visual focus */}
                <section className="relative px-4 sm:px-6 max-w-7xl mx-auto pt-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <HeroVideo overlay className="shadow-2xl" />
                        {/* Overlay CTA for readability */}
                        <div
                            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pointer-events-none rounded-xl"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                            }}
                        >
                            <div className="max-w-2xl pointer-events-auto">
                                <motion.h1
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-3"
                                >
                                    {t('masterMarkets')}{' '}
                                    <span className="text-primary">{t('withConfidence')}</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45, duration: 0.5 }}
                                    className="text-white/90 text-lg mb-6 max-w-xl"
                                >
                                    {t('tradingDescription')}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="flex flex-wrap gap-3"
                                >
                                    <Button size="lg" onClick={() => navigate('/courses')}>
                                        {t('startLearning')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => navigate('/courses')}
                                        className="border-white/40 text-white hover:bg-white/10"
                                    >
                                        {t('viewCourses')}
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Platform Highlights */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-center mb-4"
                    >
                        {t('platformHighlights')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center max-w-2xl mx-auto mb-14"
                        style={{ color: textSecondary }}
                    >
                        {t('tradingDescription')}
                    </motion.p>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid sm:grid-cols-3 gap-6"
                    >
                        {highlights.map(({ icon: Icon, title, description }) => (
                            <motion.div
                                key={title}
                                variants={item}
                                className="rounded-2xl border p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                                        color: '#00E5FF',
                                    }}
                                >
                                    <Icon size={28} strokeWidth={1.8} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{title}</h3>
                                <p className="leading-relaxed" style={{ color: textSecondary }}>
                                    {description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Learning System Overview */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-center mb-4"
                    >
                        {t('learningSystemOverview')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center max-w-xl mx-auto mb-14"
                        style={{ color: textSecondary }}
                    >
                        {t('learningProgression')}
                    </motion.p>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid sm:grid-cols-3 gap-6"
                    >
                        {levels.map(({ key, icon: Icon, progress }, i) => (
                            <motion.div
                                key={key}
                                variants={item}
                                className="relative rounded-2xl border p-6 sm:p-8 overflow-hidden"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.03]"
                                    style={{
                                        background: `linear-gradient(90deg, #00E5FF ${progress}%, transparent ${progress}%)`,
                                    }}
                                />
                                <div className="relative flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.15)',
                                            color: '#00E5FF',
                                        }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold mb-1">{t(key)}</h3>
                                        <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mt-3">
                                            <motion.div
                                                className="h-full rounded-full bg-primary"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${progress}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {i < levels.length - 1 && (
                                    <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-6 -translate-y-1/2 text-primary/50">
                                        <ChevronRight size={24} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Why Choose This Platform */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-center mb-4"
                    >
                        {t('whyChoosePlatform')}
                    </motion.h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid sm:grid-cols-3 gap-6 mt-14"
                    >
                        {whyChoose.map(({ key, subKey, icon: Icon }) => (
                            <motion.div
                                key={key}
                                variants={item}
                                className="rounded-2xl border p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                                        color: '#00E5FF',
                                    }}
                                >
                                    <Icon size={32} strokeWidth={1.6} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t(key)}</h3>
                                <p className="leading-relaxed text-sm" style={{ color: textSecondary }}>
                                    {t(subKey)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Bottom CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="px-4 sm:px-6 max-w-3xl mx-auto mt-24 sm:mt-32 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('masterMarkets')}</h2>
                    <p className="mb-8" style={{ color: textSecondary }}>
                        {t('tradingDescription')}
                    </p>
                    <Button size="lg" onClick={() => navigate('/courses')}>
                        {t('startLearning')}
                    </Button>
                </motion.section>
            </main>
        </div>
    );
}
