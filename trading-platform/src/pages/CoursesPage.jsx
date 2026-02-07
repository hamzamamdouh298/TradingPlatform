import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Clock, BarChart, Lock, CheckCircle, Shield, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';

export const CoursesPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { user, LEVELS } = useAuth();
    const { courses } = useCourses();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const userLevel = user?.currentLevel || 'Beginner';
    const userLevelIndex = LEVELS.indexOf(userLevel);

    const getCourseProgress = (course) => {
        if (!user || !course.lessons) return 0;
        const completedCount = course.lessons.filter(l => user.completedVideos?.includes(l.id)).length;
        return Math.round((completedCount / course.lessons.length) * 100);
    };

    const isCourseLocked = (course) => {
        if (user?.role === 'admin') return false;
        const courseLevelIndex = LEVELS.indexOf(course.level);
        return courseLevelIndex > userLevelIndex;
    };

    const getLevelProgress = () => {
        if (!user) return 0;
        const currentLevelCourses = courses.filter(c => c.level === userLevel);
        if (currentLevelCourses.length === 0) return 0;

        let totalVideos = 0;
        let watchedVideos = 0;

        currentLevelCourses.forEach(c => {
            totalVideos += c.lessons?.length || 0;
            c.lessons?.forEach(l => {
                if (user.completedVideos?.includes(l.id)) watchedVideos++;
            });
        });

        return totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;
    };

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
                                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: textSecondary }}>{t('yourCurrentLevel')}</p>
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => {
                        const locked = isCourseLocked(course);
                        const progress = getCourseProgress(course);

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`glass-card rounded-xl overflow-hidden group flex flex-col h-full transition-all duration-300 ${locked ? 'opacity-75 grayscale-[0.5]' : ''}`}
                                style={{
                                    backgroundColor: cardBg,
                                    borderColor: locked ? 'rgba(255,0,0,0.1)' : borderColor,
                                    position: 'relative'
                                }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className={`w-full h-full object-cover transition-transform duration-500 ${locked ? '' : 'group-hover:scale-110'}`}
                                    />

                                    {locked && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center">
                                            <Lock size={32} className="mb-2 text-warning" />
                                            <p className="text-xs font-bold uppercase tracking-widest mb-1">Locked</p>
                                            <p className="text-[10px] opacity-80 whitespace-pre-line">Complete {LEVELS[LEVELS.indexOf(course.level) - 1]} level to unlock</p>
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                                            backdropFilter: 'blur(8px)',
                                            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                            color: textColor
                                        }}
                                    >
                                        {course.level === 'Professional' && <Award size={12} className="text-warning" />}
                                        {course.level}
                                    </div>

                                    {!locked && progress === 100 && (
                                        <div className="absolute top-4 left-4 bg-green-500 text-black px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg">
                                            <CheckCircle size={10} /> {t('completed') || 'COMPLETED'}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`text-xl font-bold transition-colors ${locked ? '' : 'group-hover:text-primary'}`}>
                                            {course.title}
                                        </h3>
                                        {!locked && progress > 0 && progress < 100 && (
                                            <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                                                <TrendingUp size={10} /> {progress}%
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm mb-6 line-clamp-2" style={{ color: textSecondary }}>
                                        {course.description}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex items-center justify-between text-sm border-t pt-4"
                                            style={{
                                                color: textSecondary,
                                                borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BarChart size={16} />
                                                <span>{course.lessons?.length || course.totalLessons} {t('lessons')}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant={locked ? "outline" : "primary"}
                                            className="w-full"
                                            onClick={() => !locked && navigate(`/course/${course.id}`)}
                                            disabled={locked}
                                        >
                                            {locked ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Lock size={16} /> Locked
                                                </span>
                                            ) : (progress > 0 ? t('continueCourse') || 'Continue Course' : t('startCourse'))}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};
