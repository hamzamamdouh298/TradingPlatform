import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/Button';
import { HeroVideo } from '../components/HeroVideo';
import { Navbar } from '../components/Navbar';
import { CONTACT_LINKS, getTelegramSupportUrl } from '../config/contactLinks';
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
    Send,
    Radio,
    Users,
    CheckCircle2,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 * i },
    }),
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const sectionMotion = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
};

export const LandingPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    const supportUrl = getTelegramSupportUrl();

    const aboutPoints = [
        t('aboutPoint1'),
        t('aboutPoint2'),
        t('aboutPoint3'),
    ];

    const signalsValue = [
        { key: 'valueLiveSignals', icon: Radio },
        { key: 'valueEducationalContent', icon: BookOpen },
        { key: 'valueCommunityInteraction', icon: Users },
    ];

    const whyChooseCards = [
        { key: 'whyTrustedKnowledge', subKey: 'whyTrustedKnowledgeDesc', icon: Shield },
        { key: 'whyOrganizedLevels', subKey: 'whyOrganizedLevelsDesc', icon: Layers },
        { key: 'whyPremiumAndFree', subKey: 'whyPremiumAndFreeDesc', icon: Sparkles },
        { key: 'whyCommunityDriven', subKey: 'whyCommunityDrivenDesc', icon: Users },
    ];

    const levels = [
        { key: 'beginnerLevel', icon: Target, progress: 33 },
        { key: 'intermediateLevel', icon: BarChart3, progress: 66 },
        { key: 'professionalLevel', icon: Award, progress: 100 },
    ];

    return (
        <div
            className="min-h-screen relative overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <Navbar />

            <main className="relative pt-20 pb-24">
                {/* ——— Hero (Video + CTA) ——— */}
                <section className="relative px-4 sm:px-6 max-w-7xl mx-auto pt-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <HeroVideo overlay className="shadow-2xl" />
                        <div
                            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pointer-events-none rounded-xl"
                            style={{
                                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)',
                            }}
                        >
                            <div className="max-w-2xl pointer-events-auto">
                                <motion.h1
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.5 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4"
                                >
                                    {t('heroHeadline')}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-white/90 text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
                                >
                                    {t('heroValueProp')}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.55, duration: 0.5 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Button size="lg" onClick={() => navigate('/courses')}>
                                        {t('joinCourses')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => window.open(supportUrl, '_blank', 'noopener,noreferrer')}
                                        className="border-white/50 text-white hover:bg-white/15 bg-white/5"
                                    >
                                        <Send size={18} className="me-2 inline" />
                                        {t('contactSupport')}
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ——— About the Platform ——— */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2 {...sectionMotion} className="text-3xl sm:text-4xl font-bold text-center mb-3">
                        {t('aboutPlatform')}
                    </motion.h2>
                    <motion.p
                        {...sectionMotion}
                        className="text-center max-w-2xl mx-auto mb-14 text-lg"
                        style={{ color: textSecondary }}
                    >
                        {t('aboutPlatformLead')}
                    </motion.p>
                    <motion.ul
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {aboutPoints.map((point, i) => (
                            <motion.li
                                key={i}
                                variants={item}
                                className="flex items-start gap-4 rounded-xl border p-5 sm:p-6"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(0, 229, 255, 0.12)' : 'rgba(0, 229, 255, 0.12)',
                                        color: '#00E5FF',
                                    }}
                                >
                                    <CheckCircle2 size={20} />
                                </div>
                                <p className="leading-relaxed pt-0.5" style={{ color: textColor }}>
                                    {point}
                                </p>
                            </motion.li>
                        ))}
                    </motion.ul>
                </section>

                {/* ——— Signals & Community ——— */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2 {...sectionMotion} className="text-3xl sm:text-4xl font-bold text-center mb-3">
                        {t('signalsAndCommunity')}
                    </motion.h2>
                    <motion.p
                        {...sectionMotion}
                        className="text-center max-w-xl mx-auto mb-12"
                        style={{ color: textSecondary }}
                    >
                        {t('signalsLead')}
                    </motion.p>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="grid sm:grid-cols-2 gap-6 mb-10"
                    >
                        <motion.a
                            href={CONTACT_LINKS.telegramSignalsChannel}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={item}
                            className="block rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                            style={{ backgroundColor: cardBg, borderColor }}
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                style={{
                                    backgroundColor: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                                    color: '#00E5FF',
                                }}
                            >
                                <Radio size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('telegramSignalsChannel')}</h3>
                            <p className="mb-6" style={{ color: textSecondary }}>
                                {t('telegramSignalsDesc')}
                            </p>
                            <span className="text-primary font-medium text-sm">{t('goToChannel')} →</span>
                        </motion.a>
                        <motion.a
                            href={CONTACT_LINKS.telegramCoursesChannel}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={item}
                            className="block rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                            style={{ backgroundColor: cardBg, borderColor }}
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                style={{
                                    backgroundColor: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                                    color: '#00E5FF',
                                }}
                            >
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('telegramCoursesChannel')}</h3>
                            <p className="mb-6" style={{ color: textSecondary }}>
                                {t('telegramCoursesDesc')}
                            </p>
                            <span className="text-primary font-medium text-sm">{t('goToChannel')} →</span>
                        </motion.a>
                    </motion.div>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        {signalsValue.map(({ key, icon: Icon }) => (
                            <motion.span
                                key={key}
                                variants={item}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                                style={{ borderColor, backgroundColor: cardBg }}
                            >
                                <Icon size={18} className="text-primary" />
                                {t(key)}
                            </motion.span>
                        ))}
                    </motion.div>
                </section>

                {/* ——— Contact & Support ——— */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2 {...sectionMotion} className="text-3xl sm:text-4xl font-bold text-center mb-3">
                        {t('contactAndSupport')}
                    </motion.h2>
                    <motion.p
                        {...sectionMotion}
                        className="text-center max-w-lg mx-auto mb-10"
                        style={{ color: textSecondary }}
                    >
                        {t('contactLead')}
                    </motion.p>
                    <motion.a
                        href={supportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 rounded-2xl border p-8 sm:p-10 max-w-2xl mx-auto transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                        style={{ backgroundColor: cardBg, borderColor }}
                    >
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                            style={{
                                backgroundColor: isDark ? 'rgba(0, 229, 255, 0.12)' : 'rgba(0, 229, 255, 0.12)',
                                color: '#00E5FF',
                            }}
                        >
                            <Send size={32} />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-bold text-lg mb-1">{t('contactTelegramLabel')}</p>
                            <p className="text-primary font-mono text-xl mb-2">@{CONTACT_LINKS.telegramSupportUsername}</p>
                            <p className="text-sm" style={{ color: textSecondary }}>
                                {t('contactSupportDesc')}
                            </p>
                        </div>
                    </motion.a>
                </section>

                {/* ——— Why Choose Us ——— */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2 {...sectionMotion} className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        {t('whyChooseUs')}
                    </motion.h2>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
                    >
                        {whyChooseCards.map(({ key, subKey, icon: Icon }) => (
                            <motion.div
                                key={key}
                                variants={item}
                                className="rounded-2xl border p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                                        color: '#00E5FF',
                                    }}
                                >
                                    <Icon size={28} strokeWidth={1.6} />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{t(key)}</h3>
                                <p className="leading-relaxed text-sm" style={{ color: textSecondary }}>
                                    {t(subKey)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ——— Learning path (compact) ——— */}
                <section className="px-4 sm:px-6 max-w-7xl mx-auto mt-24 sm:mt-32">
                    <motion.h2 {...sectionMotion} className="text-3xl sm:text-4xl font-bold text-center mb-4">
                        {t('learningSystemOverview')}
                    </motion.h2>
                    <motion.p
                        {...sectionMotion}
                        className="text-center max-w-xl mx-auto mb-12"
                        style={{ color: textSecondary }}
                    >
                        {t('learningProgression')}
                    </motion.p>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="grid sm:grid-cols-3 gap-6"
                    >
                        {levels.map(({ key, icon: Icon, progress }, i) => (
                            <motion.div
                                key={key}
                                variants={item}
                                className="relative rounded-2xl border p-6 overflow-hidden"
                                style={{ backgroundColor: cardBg, borderColor }}
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        background: `linear-gradient(90deg, #00E5FF ${progress}%, transparent ${progress}%)`,
                                    }}
                                />
                                <div className="relative flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.15)',
                                            color: '#00E5FF',
                                        }}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold">{t(key)}</h3>
                                        <div className="h-1.5 rounded-full bg-black/10 overflow-hidden mt-2">
                                            <motion.div
                                                className="h-full rounded-full bg-primary"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${progress}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {i < levels.length - 1 && (
                                    <div className="hidden sm:block absolute top-1/2 -right-3 w-5 h-5 -translate-y-1/2 text-primary/40">
                                        <ChevronRight size={20} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ——— Final CTA ——— */}
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="px-4 sm:px-6 max-w-3xl mx-auto mt-24 sm:mt-32 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('masterMarkets')} {t('withConfidence')}</h2>
                    <p className="mb-8" style={{ color: textSecondary }}>
                        {t('tradingDescription')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" onClick={() => navigate('/courses')}>
                            {t('joinCourses')}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.open(supportUrl, '_blank', 'noopener,noreferrer')}
                        >
                            {t('contactSupport')}
                        </Button>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
