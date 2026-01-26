import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { PlayCircle, Award, TrendingUp, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const LandingPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';

    return (
        <div className="min-h-screen relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            {/* Hero Background */}
            <div className="absolute top-0 left-0 w-full h-[80vh] pointer-events-none"
                style={{
                    background: theme === 'dark'
                        ? 'linear-gradient(to bottom, rgba(30, 58, 138, 0.1), rgba(5, 5, 5, 0))'
                        : 'linear-gradient(to bottom, rgba(191, 219, 254, 0.3), rgba(245, 245, 245, 0))'
                }}
            />
            <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none animate-pulse-slow"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.05)' : 'rgba(0, 229, 255, 0.1)' }}
            />

            <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-primary text-sm font-medium mb-8 transition-colors duration-300"
                            style={{
                                backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
                                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {t('professionalTrading')}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                            {t('masterMarkets')} <br />
                            <span className="text-gradient-primary">{t('withConfidence')}</span>
                        </h1>

                        <p className="text-xl mb-10 max-w-xl leading-relaxed" style={{ color: textSecondary }}>
                            {t('tradingDescription')}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" onClick={() => navigate('/courses')}>
                                {t('startLearning')}
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => navigate('/courses')}>
                                {t('viewCourses')}
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center gap-8" style={{ color: textSecondary }}>
                            <div className="flex items-center gap-2">
                                <Users size={20} className="text-primary" />
                                <span>2,500+ {t('students')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award size={20} className="text-primary" />
                                <span>{t('certifiedMentors')}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass-card rounded-2xl p-6 relative z-10 animate-float"
                            style={{ borderColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.3)' }}
                        >
                            {/* Decorative Chart UI */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="text-sm" style={{ color: textSecondary }}>BTC/USD</div>
                                    <div className="text-2xl font-bold">$96,420.50</div>
                                </div>
                                <div className="px-3 py-1 rounded text-sm font-medium"
                                    style={{
                                        backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                                        color: '#22c55e'
                                    }}
                                >
                                    +5.24%
                                </div>
                            </div>

                            {/* Fake Chart Lines */}
                            <div className="h-48 flex items-end gap-2">
                                {[40, 60, 45, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80"
                                        style={{
                                            height: `${h}%`,
                                            background: theme === 'dark'
                                                ? 'linear-gradient(to top, rgba(0, 229, 255, 0.2), rgba(0, 229, 255, 1))'
                                                : 'linear-gradient(to top, rgba(0, 229, 255, 0.3), rgba(0, 229, 255, 0.8))'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 rounded-2xl"
                            style={{ borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                        />
                        <div className="absolute -z-20 top-20 -right-20 w-full h-full border-2 rounded-2xl opacity-50"
                            style={{ borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                        />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};
