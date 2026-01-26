import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Users, UserCircle, UploadCloud } from 'lucide-react';

export const AdminSidebar = () => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const location = useLocation();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: t('overview'), exact: true },
        { path: '/admin/courses', icon: BookOpen, label: t('courseManagement') },
        { path: '/admin/upload-course', icon: UploadCloud, label: t('uploadCourse') }, // New Item
        { path: '/admin/users', icon: Users, label: t('usersManagement') },
        { path: '/admin/profile', icon: UserCircle, label: t('profile') },
    ];

    const isActive = (item) => {
        if (item.exact) {
            return location.pathname === item.path;
        }
        return location.pathname.startsWith(item.path);
    };

    return (
        <div className="w-64 min-h-screen glass-panel border-r transition-colors duration-300"
            style={{
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                top: '80px',
                [language === 'ar' ? 'right' : 'left']: 0,
                bottom: 0,
            }}
        >
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const active = isActive(item);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="block"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, x: language === 'ar' ? -5 : 5 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all border"
                                style={{
                                    backgroundColor: active
                                        ? (theme === 'dark' ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.05)')
                                        : 'transparent',
                                    borderColor: active
                                        ? (theme === 'dark' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.3)')
                                        : 'transparent',
                                    color: active ? '#00E5FF' : (theme === 'dark' ? '#9ca3af' : '#6b7280'),
                                }}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
