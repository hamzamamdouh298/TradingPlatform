import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Clock, BarChart } from 'lucide-react';
import { COURSES } from '../data/courses';

export const CoursesPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useLanguage();

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t('tradingCourses')}</h1>
                    <p style={{ color: textSecondary }}>{t('courseDescription')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COURSES.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-xl overflow-hidden group flex flex-col h-full"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border"
                                    style={{
                                        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(8px)',
                                        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        color: textColor
                                    }}
                                >
                                    {course.level}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm mb-6 line-clamp-2" style={{ color: textSecondary }}>
                                    {course.description}
                                </p>

                                <div className="mt-auto space-y-4">
                                    <div className="flex items-center justify-between text-sm border-t pt-4"
                                        style={{
                                            color: textSecondary,
                                            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <BarChart size={16} />
                                            <span>{course.totalLessons} {t('lessons')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span>{t('waitlist')}</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={() => navigate(`/course/${course.id}`)}
                                    >
                                        {t('startCourse')}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};
