import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';

export const UsersPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { allUsers, updateUserStatus } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

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
                                    <th className="p-4">{t('status')}</th>
                                    <th className="p-4">{t('joined')}</th>
                                    <th className="p-4 text-right pr-6">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ divideColor: borderColor }}>
                                {filteredUsers.map((user) => (
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
                                            <span className={`px-2 py-1 rounded text-xs font-medium border ${user.role === 'admin' ? 'text-purple-400 border-purple-400/20 bg-purple-400/10' : 'text-blue-400 border-blue-400/20 bg-blue-400/10'
                                                }`}>
                                                {user.role === 'admin' ? t('admin') : t('user')}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {user.isPremium ? (
                                                <span className="flex items-center gap-1.5 text-green-500 text-sm font-medium">
                                                    <CheckCircle size={14} /> {t('premiumPlan')}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                    {t('freePlan')}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm opacity-60">
                                            {new Date().toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            {user.role !== 'admin' && (
                                                <Button
                                                    size="sm"
                                                    variant={user.isPremium ? "danger" : "primary"}
                                                    onClick={() => updateUserStatus(user.id, !user.isPremium)}
                                                    className="h-8 text-xs"
                                                >
                                                    {user.isPremium ? t('removePremium') : t('makePremium')}
                                                </Button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
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
