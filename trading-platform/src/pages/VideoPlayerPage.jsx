import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Lock, Play, CheckCircle, CheckCircle2, Unlock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';
import { COURSES } from '../data/courses';

export const VideoPlayerPage = () => {
    const { courseId } = useParams();
    const { user, markVideoAsCompleted } = useAuth();
    const { courses, loading } = useCourses();
    const { theme } = useTheme();
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Prefer live courses from context; fall back to static seed data
    const allCourses = courses && courses.length > 0 ? courses : COURSES;
    const course = allCourses.find(c => c.id === Number(courseId));
    const [currentLesson, setCurrentLesson] = useState(null);

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';

    useEffect(() => {
        if (course && (!currentLesson || !course.lessons?.some(l => l.id === currentLesson.id))) {
            setCurrentLesson(course.lessons?.[0]);
        }
    }, [course, currentLesson]);

    if (loading && !course) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bgColor, color: textColor }}>
                <p>{t('loading') || 'Loading course...'}</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: bgColor, color: textColor }}>
                <Navbar />
                <main className="pt-24 px-4 md:px-8 max-w-3xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-2">Course not found</h1>
                    <p className="mb-6" style={{ color: textSecondary }}>
                        {t('noCoursesInCategory')}
                    </p>
                    <Button onClick={() => navigate('/courses')}>
                        {t('viewCourses') || 'Back to Courses'}
                    </Button>
                </main>
            </div>
        );
    }

    const isLocked = (lesson) => {
        if (lesson.type === 'free') return false;
        if (user?.role === 'admin') return false;
        if (user?.isPremium) return false;
        return true;
    };

    const handleSubscribe = () => {
        const message = "Hello, I want to subscribe to the premium trading courses.";
        const url = `https://wa.me/201061171019?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-6">

                    {/* Main Video Area */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border group"
                            style={{
                                backgroundColor: theme === 'dark' ? '#000000' : '#1f2937',
                                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            {isLocked(currentLesson) ? (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center"
                                    style={{
                                        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(31, 41, 55, 0.9)',
                                        backdropFilter: 'blur(8px)'
                                    }}
                                >
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                                        style={{
                                            backgroundColor: theme === 'dark' ? '#121212' : '#374151',
                                            boxShadow: '0 0 30px rgba(255, 192, 0, 0.2)'
                                        }}
                                    >
                                        <Lock className="text-warning" size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2 text-white">{t('premiumContent')}</h2>
                                    <p className="mb-6 max-w-md" style={{ color: '#9ca3af' }}>
                                        {t('premiumDescription')}
                                    </p>
                                    <Button onClick={handleSubscribe} variant="primary" size="lg" className="animate-pulse">
                                        {t('subscribeToUnlock')}
                                    </Button>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center"
                                    style={{ backgroundColor: theme === 'dark' ? '#18181b' : '#374151' }}
                                >
                                    <Play size={64} className="text-white/20 group-hover:text-primary transition-colors cursor-pointer" />
                                    <div className="absolute bottom-4 left-4 text-sm" style={{ color: textSecondary }}>
                                        Video Player Placeholder for {currentLesson?.title}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
                                {user && !user.completedVideos?.includes(currentLesson?.id) && !isLocked(currentLesson) && (
                                    <Button
                                        onClick={() => {
                                            const result = markVideoAsCompleted(user.id, currentLesson.id);
                                            if (result?.leveledUp) {
                                                alert(`Congratulations! You've unlocked the ${result.newLevel} level!`);
                                            }
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={16} /> Mark as Completed
                                    </Button>
                                )}
                                {user?.completedVideos?.includes(currentLesson?.id) && (
                                    <div className="flex items-center gap-2 text-green-500 font-medium">
                                        <CheckCircle size={20} /> Completed
                                    </div>
                                )}
                            </div>
                            <p style={{ color: textSecondary }}>{course.description}</p>
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="lg:col-span-1 glass-panel rounded-xl flex flex-col overflow-hidden h-fit lg:h-full">
                        <div className="p-4 border-b"
                            style={{
                                backgroundColor: theme === 'dark' ? 'rgba(18, 18, 18, 0.5)' : 'rgba(249, 250, 251, 0.8)',
                                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <h3 className="font-bold text-lg">{t('courseContent')}</h3>
                            <p className="text-xs" style={{ color: textSecondary }}>
                                {course.lessons.length} {t('lessons')} • {course.level}
                            </p>
                        </div>

                        <div className="overflow-y-auto flex-1 p-2 space-y-1">
                            {course.lessons.map((lesson) => {
                                const active = currentLesson?.id === lesson.id;
                                const locked = isLocked(lesson);

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all border"
                                        style={{
                                            backgroundColor: active
                                                ? (theme === 'dark' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.05)')
                                                : 'transparent',
                                            borderColor: active
                                                ? (theme === 'dark' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.3)')
                                                : 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!active) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                                style={{
                                                    backgroundColor: active
                                                        ? '#00E5FF'
                                                        : (user?.completedVideos?.includes(lesson.id) ? '#22c55e' : (theme === 'dark' ? '#121212' : '#f3f4f6')),
                                                    color: (active || user?.completedVideos?.includes(lesson.id)) ? '#000000' : textSecondary
                                                }}
                                            >
                                                {user?.completedVideos?.includes(lesson.id) ? <CheckCircle size={14} /> : course.lessons.indexOf(lesson) + 1}
                                            </div>
                                            {locked && (
                                                <div className="absolute -top-1 -right-1 rounded-full p-0.5"
                                                    style={{
                                                        backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
                                                        border: `1px solid ${theme === 'dark' ? '#000000' : '#e5e7eb'}`
                                                    }}
                                                >
                                                    <Lock size={10} className="text-warning" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium truncate"
                                                style={{ color: active ? '#00E5FF' : textColor }}
                                            >
                                                {lesson.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-xs" style={{ color: textSecondary }}>{lesson.duration}</p>
                                                <span className="inline-flex items-center gap-1 px-2 py-px rounded-full text-[10px]"
                                                    style={{
                                                        backgroundColor: lesson.type === 'free'
                                                            ? 'rgba(16, 185, 129, 0.12)'
                                                            : 'rgba(245, 158, 11, 0.12)',
                                                        color: lesson.type === 'free' ? '#6ee7b7' : '#fbbf24',
                                                        border: `1px solid ${lesson.type === 'free' ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.4)'}`
                                                    }}
                                                >
                                                    {lesson.type === 'free' ? <Unlock size={10} /> : <Lock size={10} />}
                                                    {lesson.type === 'free' ? t('free') : t('premium')}
                                                </span>
                                            </div>
                                        </div>

                                        {!locked ? (
                                            <Play size={14} style={{ color: active ? '#00E5FF' : textSecondary }} />
                                        ) : (
                                            <Lock size={14} style={{ color: textSecondary }} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
