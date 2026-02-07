import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useCourseCategories } from '../context/CourseCategoriesContext';
import { Navbar } from '../components/Navbar';
import { CourseCard } from '../components/CourseCard';
import { Shield, BarChart2, Newspaper, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';

const CATEGORY_ICONS = { BarChart2, Newspaper };

export const CoursesPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { getCategories } = useCourseCategories();
    const { user, LEVELS } = useAuth();
    const { getVisibleCourses, getVisibleCoursesByCategory } = useCourses();

    const categories = getCategories();
    const [activeCategoryId, setActiveCategoryId] = useState(() => categories[0]?.id || 'tradingPlatform');
    useEffect(() => {
        if (categories.length > 0 && !categories.some((c) => c.id === activeCategoryId)) {
            setActiveCategoryId(categories[0].id);
        }
    }, [categories, activeCategoryId]);

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const userLevel = user?.currentLevel || 'Beginner';
    const userLevelIndex = LEVELS.indexOf(userLevel);

    const coursesInActiveCategory = useMemo(
        () => getVisibleCoursesByCategory(activeCategoryId),
        [getVisibleCoursesByCategory, activeCategoryId]
    );

    const getCourseProgress = (course) => {
        if (!user || !course.lessons) return 0;
        const completedCount = course.lessons.filter((l) => user.completedVideos?.includes(l.id)).length;
        return Math.round((completedCount / course.lessons.length) * 100);
    };

    const isCourseLocked = (course) => {
        if (user?.role === 'admin') return false;
        if (course.categoryId === 'newsCourses') return false;
        const courseLevelIndex = LEVELS.indexOf(course.level);
        return courseLevelIndex > userLevelIndex;
    };

    const getLevelProgress = () => {
        if (!user) return 0;
        const allCourses = getVisibleCourses().filter((c) => c.categoryId === 'tradingPlatform');
        const currentLevelCourses = allCourses.filter((c) => c.level === userLevel);
        if (currentLevelCourses.length === 0) return 0;
        let totalVideos = 0;
        let watchedVideos = 0;
        currentLevelCourses.forEach((c) => {
            totalVideos += c.lessons?.length || 0;
            c.lessons?.forEach((l) => {
                if (user.completedVideos?.includes(l.id)) watchedVideos++;
            });
        });
        return totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;
    };

    const levelProgressHint = (course) => {
        const prevLevel = LEVELS[LEVELS.indexOf(course.level) - 1];
        return prevLevel ? `Complete ${prevLevel} level to unlock` : '';
    };

    if (categories.length === 0) {
        return (
            <div className="min-h-screen pb-20 transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
                <Navbar />
                <main className="pt-32 px-6 max-w-7xl mx-auto">
                    <p style={{ color: textSecondary }}>{t('noCoursesInCategory')}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{t('tradingCourses')}</h1>
                        <p style={{ color: textSecondary }}>{t('courseDescription')}</p>
                    </div>

                    {user && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl border backdrop-blur-md min-w-[300px]"
                            style={{ backgroundColor: cardBg, borderColor: borderColor }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: textSecondary }}>
                                        {t('yourCurrentLevel')}
                                    </p>
                                    <h3 className="text-xl font-bold">{t(userLevel.toLowerCase())}</h3>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span style={{ color: textSecondary }}>{t('levelProgress')}</span>
                                    <span>{getLevelProgress()}%</span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden bg-gray-500/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${getLevelProgress()}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <p className="text-[10px]" style={{ color: textSecondary }}>
                                    {getLevelProgress() === 100 ? t('levelCompleteDesc') : t('completeVideosToUnlock')}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Segmented control: category tabs */}
                <div className="mb-10">
                    <div
                        className="inline-flex p-1 rounded-xl border gap-0"
                        style={{
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            borderColor: borderColor,
                        }}
                    >
                        {categories.map((cat) => {
                            const Icon = CATEGORY_ICONS[cat.icon] || BookOpen;
                            const isActive = activeCategoryId === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setActiveCategoryId(cat.id)}
                                    className="relative flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                                    style={{
                                        color: isActive ? (isDark ? '#fff' : '#1f2937') : textSecondary,
                                        opacity: isActive ? 1 : 0.7,
                                    }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="courseCategoryTab"
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                backgroundColor: isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.12)',
                                                border: `1px solid ${isDark ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 229, 255, 0.4)'}`,
                                            }}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Icon size={18} className={isActive ? 'text-primary' : ''} />
                                        {t(cat.labelKey)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {coursesInActiveCategory.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed"
                            style={{ borderColor: borderColor }}
                        >
                            <BookOpen size={48} className="opacity-40 mb-4" style={{ color: textSecondary }} />
                            <p className="text-lg font-medium" style={{ color: textSecondary }}>
                                {t('noCoursesInCategory')}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeCategoryId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {coursesInActiveCategory.map((course, index) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    locked={isCourseLocked(course)}
                                    progress={getCourseProgress(course)}
                                    levelProgressHint={levelProgressHint(course)}
                                    onStartOrContinue={() => navigate(`/course/${course.id}`)}
                                    theme={theme}
                                    t={t}
                                    LEVELS={LEVELS}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
