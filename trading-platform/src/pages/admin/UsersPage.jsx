import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CoursesContext';
import { Users, Search, CheckCircle, Shield, Award, GraduationCap } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const UsersPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { allUsers, updateUserStatus, LEVELS } = useAuth();
    const { courses } = useCourses();
    const [searchTerm, setSearchTerm] = useState('');

    const allVideos = useMemo(() => {
        let videos = [];
        courses.forEach(c => {
            c.lessons?.forEach(l => videos.push({ ...l, level: c.level }));
        });
        return videos;
    }, [courses]);

    const getUserProgress = (user) => {
        if (allVideos.length === 0) return 0;
        const completedCount = user.completedVideos?.length || 0;
        return Math.round((completedCount / allVideos.length) * 100);
    };

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{t('userManagement')}</h1>
                        <p style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>{t('manageUsersDesc')}</p>
                    </div>
                    <div className="w-full md:w-96 relative">
                        <Input
                            placeholder={t('searchUsers')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-4 text-gray-500" size={18} />
                    </div>
                </div>

                <div className="rounded-2xl border overflow-hidden backdrop-blur-md"
                    style={{ backgroundColor: cardBg, borderColor: borderColor }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-sm font-medium border-b"
                                style={{
                                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                                    borderColor: borderColor,
                                    color: theme === 'dark' ? '#9ca3af' : '#6b7280'
                                }}
                            >
                                <tr>
                                    <th className="p-4 pl-6">{t('user')}</th>
                                    <th className="p-4">{t('role')}</th>
                                    <th className="p-4">{t('learningLevel') || 'Learning Level'}</th>
                                    <th className="p-4">{t('progress') || 'Progress'}</th>
                                    <th className="p-4">{t('status')}</th>
                                    <th className="p-4 text-right pr-6">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ divideColor: borderColor }}>
                                {filteredUsers.map((user) => {
                                    const progress = getUserProgress(user);
                                    return (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="group transition-colors"
                                            style={{ backgroundColor: 'transparent' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold bg-primary/10">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm opacity-60">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-medium border ${user.role === 'admin' ? 'text-purple-400 border-purple-400/20 bg-purple-400/10' : 'text-blue-400 border-blue-400/20 bg-blue-400/10'
                                                    }`}>
                                                    {user.role === 'admin' ? t('admin') : t('user')}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${user.currentLevel === 'Professional' ? 'text-warning border-warning/20 bg-warning/5' :
                                                            user.currentLevel === 'Intermediate' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                                                                'text-gray-400 border-gray-400/20 bg-gray-400/5'
                                                        }`}>
                                                        {user.currentLevel === 'Professional' && <Award size={10} />}
                                                        {user.currentLevel === 'Intermediate' && <GraduationCap size={10} />}
                                                        {user.currentLevel || 'Beginner'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 w-24 rounded-full bg-gray-500/10 overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-medium">{progress}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {user.isPremium ? (
                                                    <span className="flex items-center gap-1.5 text-warning text-xs font-bold">
                                                        <CheckCircle size={14} /> {t('premiumPlan')}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                                        {t('freePlan')}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right pr-6">
                                                {user.role !== 'admin' && (
                                                    <Button
                                                        size="sm"
                                                        variant={user.isPremium ? "danger" : "primary"}
                                                        onClick={() => updateUserStatus(user.id, !user.isPremium)}
                                                        className="h-8 text-[10px]"
                                                    >
                                                        {user.isPremium ? t('removePremium') : t('makePremium')}
                                                    </Button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center opacity-60">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p>{t('noUsersFound')} "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
