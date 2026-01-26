import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut,
    User,
    BarChart2,
    Shield,
    PlayCircle,
    Sun,
    Moon,
    Languages,
    UploadCloud,
    Users,
    Settings,
    BookOpen,
    Newspaper,
    Send
} from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';

const AdminNavItem = ({ to, icon: Icon, label, active, theme }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isDark = theme === 'dark';

    return (
        <Link
            to={to}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center h-12 px-3 rounded-xl transition-all duration-300"
            style={{
                backgroundColor: active
                    ? (isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.1)')
                    : (isHovered ? (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'),
                color: active ? '#00E5FF' : (isDark ? '#9ca3af' : '#6b7280'),
                border: active ? `1px solid ${isDark ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 229, 255, 0.4)'}` : '1px solid transparent'
            }}
        >
            <div className="flex items-center gap-2">
                <Icon size={20} className={active ? 'text-primary' : ''} />

                <AnimatePresence mode="wait">
                    {isHovered && (
                        <motion.span
                            initial={{ width: 0, opacity: 0, x: -10 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="whitespace-nowrap overflow-hidden font-medium text-sm"
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Persistent active indicator if not hovered */}
                {!isHovered && active && (
                    <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                )}
            </div>
        </Link>
    );
};

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    if (isLoginPage) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
            style={{
                backgroundColor: theme === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/kmt-logo.png"
                        alt="KMT Trade"
                        className="h-10 w-auto object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-xl tracking-tight">
                        KMT <span className="text-primary">TRADE</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Telegram Popup */}
                    <div className="relative group">
                        <button
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-blue-400"
                            title={t('joinTelegram')}
                        >
                            <Send size={20} />
                        </button>

                        <div className="absolute top-full right-0 mt-2 w-64 p-4 rounded-xl shadow-xl border backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50"
                            style={{
                                backgroundColor: theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="flex flex-col items-center gap-3 text-center">
                                <h3 className="font-bold text-primary">{t('joinTelegram')}</h3>
                                <div className="bg-white p-2 rounded-lg">
                                    <img src="/telegram-qr.png" alt="Telegram QR" className="w-40 h-40 object-contain" />
                                </div>
                                <p className="text-xs opacity-70">{t('scanQrCode')}</p>
                                <a
                                    href="https://t.me/kmtsignalss"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    <Button size="sm" className="w-full flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] border-none text-white">
                                        <Send size={14} /> {t('goToChannel')}
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
                        title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
                    >
                        <Languages size={20} className="text-primary" />
                        <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
                    </button>

                    {user && (
                        <>
                            <div className="hidden md:flex items-center gap-3 text-sm font-medium">
                                {user.role === 'admin' ? (
                                    <div className="flex items-center gap-2">
                                        <AdminNavItem
                                            to="/admin"
                                            icon={BarChart2}
                                            label={t('adminDashboard')}
                                            active={isActive('/admin')}
                                            theme={theme}
                                        />
                                        <AdminNavItem
                                            to="/admin/users"
                                            icon={Users}
                                            label={t('usersManagement')}
                                            active={isActive('/admin/users')}
                                            theme={theme}
                                        />
                                        <AdminNavItem
                                            to="/admin/courses-settings"
                                            icon={BookOpen}
                                            label={t('courses')}
                                            active={isActive('/admin/courses-settings')}
                                            theme={theme}
                                        />
                                        <AdminNavItem
                                            to="/admin/news"
                                            icon={Newspaper}
                                            label={t('news')}
                                            active={isActive('/admin/news')}
                                            theme={theme}
                                        />
                                        <AdminNavItem
                                            to="/admin/upload-course"
                                            icon={UploadCloud}
                                            label={t('uploadCourse')}
                                            active={isActive('/admin/upload-course')}
                                            theme={theme}
                                        />
                                        <AdminNavItem
                                            to="/admin/settings"
                                            icon={Settings}
                                            label={t('settings')}
                                            active={isActive('/admin/settings')}
                                            theme={theme}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/courses" className={`hover:text-primary transition-colors flex items-center gap-2 h-12 px-4 rounded-xl ${isActive('/courses') ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}>
                                            <PlayCircle size={18} /> {t('courses')}
                                        </Link>
                                        <Link to="/news" className={`hover:text-primary transition-colors flex items-center gap-2 h-12 px-4 rounded-xl ${isActive('/news') ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}>
                                            <Newspaper size={18} /> {t('news')}
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="h-6 w-px mx-2" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }} />

                            <div className="flex items-center gap-3">
                                <div className={`text-right hidden sm:block ${language === 'ar' ? 'text-left' : ''}`}>
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <div className="text-xs text-primary flex items-center gap-1" style={{ justifyContent: language === 'ar' ? 'flex-start' : 'flex-end' }}>
                                        {user.role === 'admin' ? <Shield size={10} /> : null}
                                        {user.isPremium ? t('premium').toUpperCase() : user.role === 'admin' ? t('admin').toUpperCase() : t('normal').toUpperCase()}
                                    </div>
                                </div>
                                <Link to={user.role === 'admin' ? '/admin/profile' : '/profile'}
                                    className="w-10 h-10 rounded-full border flex items-center justify-center text-primary relative hover:opacity-80 transition-opacity bg-cover bg-center overflow-hidden"
                                    style={{
                                        backgroundColor: theme === 'dark' ? '#121212' : '#f9fafb',
                                        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                    {user.isPremium && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50"
                                            style={{ border: `2px solid ${theme === 'dark' ? '#050505' : '#ffffff'}` }}
                                        />
                                    )}
                                </Link>

                                <Button variant="ghost" size="sm" onClick={logout} className={`${language === 'ar' ? 'mr-2' : 'ml-2'} !px-2 rounded-xl`}>
                                    <LogOut size={20} />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};
