import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { BarChart, Lock, CheckCircle, Award, TrendingUp } from 'lucide-react';

export function CourseCard({ course, locked, progress, levelProgressHint, onStartOrContinue, theme, t, LEVELS }) {
    const isDark = theme === 'dark';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-xl overflow-hidden group flex flex-col h-full transition-all duration-300 ${locked ? 'opacity-75 grayscale-[0.5]' : ''}`}
            style={{
                backgroundColor: cardBg,
                borderColor: locked ? 'rgba(255,0,0,0.1)' : borderColor,
                position: 'relative',
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
                        <p className="text-[10px] opacity-80 whitespace-pre-line">{levelProgressHint}</p>
                    </div>
                )}
                {course.categoryId !== 'newsCourses' && (
                    <div
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1"
                        style={{
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            color: isDark ? '#fff' : '#1f2937',
                        }}
                    >
                        {course.level === 'Professional' && <Award size={12} className="text-warning" />}
                        {course.level}
                    </div>
                )}
                {!locked && progress === 100 && (
                    <div className="absolute top-4 left-4 bg-green-500 text-black px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-lg">
                        <CheckCircle size={10} /> {t('completed')}
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
                    <div
                        className="flex items-center justify-between text-sm border-t pt-4"
                        style={{
                            color: textSecondary,
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <BarChart size={16} />
                            <span>
                                {course.lessons?.length || course.totalLessons} {t('lessons')}
                            </span>
                        </div>
                    </div>
                    <Button
                        variant={locked ? 'outline' : 'primary'}
                        className="w-full"
                        onClick={() => !locked && onStartOrContinue()}
                        disabled={locked}
                    >
                        {locked ? (
                            <span className="flex items-center justify-center gap-2">
                                <Lock size={16} /> Locked
                            </span>
                        ) : progress > 0 ? (
                            t('continueCourse')
                        ) : (
                            t('startCourse')
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
