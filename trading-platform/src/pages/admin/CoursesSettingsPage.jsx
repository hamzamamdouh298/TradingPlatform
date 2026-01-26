import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { useCourses } from '../../context/CoursesContext';
import { Edit, Trash2, Eye, EyeOff, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const CoursesSettingsPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { courses, toggleCourseVisibility, deleteCourse } = useCourses();

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{t('coursesSettingsTitle')}</h1>
                        <p style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>{t('manageCoursesDesc')}</p>
                    </div>
                    <Link to="/admin/upload-course">
                        <Button className="flex items-center gap-2">
                            <Plus size={18} /> {t('addNewCourse')}
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {courses.map((course) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl border backdrop-blur-md flex flex-col md:flex-row md:items-center gap-4 transition-all hover:border-primary/30"
                            style={{ backgroundColor: cardBg, borderColor: borderColor }}
                        >
                            <div className="relative w-full md:w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">{t('noImage')}</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                                <p className="text-sm line-clamp-1 opacity-60">{course.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs font-medium opacity-70">
                                    <span>{course.lessons?.length || 0} {t('lessons')}</span>
                                    <span>•</span>
                                    <span className={course.isVisible ? 'text-green-500' : 'text-yellow-500'}>
                                        {course.isVisible ? t('published') : t('hidden')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0" style={{ borderColor: borderColor }}>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => toggleCourseVisibility(course.id)}
                                    title={course.isVisible ? t('hideCourse') : t('showCourse')}
                                >
                                    {course.isVisible ? <Eye size={18} /> : <EyeOff size={18} className="text-gray-500" />}
                                </Button>
                                <Button size="sm" variant="ghost" title={t('editCourse')}>
                                    <Edit size={18} />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    onClick={() => {
                                        if (window.confirm(t('deleteCourseConfirm'))) {
                                            deleteCourse(course.id);
                                        }
                                    }}
                                    title={t('deleteCourse')}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    {courses.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed rounded-xl" style={{ borderColor: borderColor }}>
                            <p className="opacity-50">{t('startUploading')}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
