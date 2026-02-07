import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    Users,
    Video,
    TrendingUp,
    UploadCloud,
    Settings,
    BookOpen,
    Newspaper,
    ArrowRight,
    DollarSign
} from 'lucide-react';
import { useCourses } from '../context/CoursesContext';
import { useCourseCategories } from '../context/CourseCategoriesContext';

export const AdminDashboard = () => {
    const { allUsers } = useAuth();
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { courses, getCourseCountByCategory } = useCourses();
    const { getAllCategoriesForAdmin } = useCourseCategories();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const courseCountByCategory = getCourseCountByCategory();
    const categoryList = getAllCategoriesForAdmin();

    const stats = [
        { label: t('totalUsers'), value: allUsers.length, icon: Users, color: 'text-primary' },
        { label: t('premiumMembers'), value: allUsers.filter(u => u.isPremium).length, icon: DollarSign, color: 'text-warning' },
        { label: t('totalContent'), value: `${courses.length} ${t('courses')}`, icon: Video, color: 'text-purple-400' },
        { label: t('revenue'), value: '$12,450', icon: TrendingUp, color: 'text-green-400' },
    ];

    const adminModules = [
        {
            title: t('usersManagement'),
            desc: t('usersDesc'),
            icon: Users,
            path: '/admin/users',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            title: t('courses'),
            desc: t('coursesDesc'),
            icon: BookOpen,
            path: '/admin/courses-settings',
            color: 'text-purple-500',
            bg: 'bg-purple-500/10'
        },
        {
            title: t('newsManagement'),
            desc: t('newsDesc'),
            icon: Newspaper,
            path: '/admin/news',
            color: 'text-pink-500',
            bg: 'bg-pink-500/10'
        },
        {
            title: t('uploadCourse'),
            desc: t('uploadDesc'),
            icon: UploadCloud,
            path: '/admin/upload-course',
            color: 'text-cyan-500',
            bg: 'bg-cyan-500/10'
        },
        {
            title: t('settings'),
            desc: t('settingsDesc'),
            icon: Settings,
            path: '/admin/settings',
            color: 'text-gray-500',
            bg: 'bg-gray-500/10'
        }
    ];

    return (
        <div className="min-h-screen pb-20 transition-colors duration-300" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4">{t('adminDashboardTitle')}</h1>
                    <p className="text-lg" style={{ color: textSecondary }}>Welcome back to your command center.</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-2xl flex items-center justify-between hover:scale-105 transition-transform duration-300 border backdrop-blur-md"
                            style={{ backgroundColor: cardBg, borderColor: borderColor }}
                        >
                            <div>
                                <p className="text-sm font-medium mb-1" style={{ color: textSecondary }}>{stat.label}</p>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.color}`}
                                style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                            >
                                <stat.icon size={28} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Courses per category */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-8"
                >
                    <h3 className="text-xl font-bold mb-4">{t('coursesPerCategory')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryList.map((cat, i) => (
                            <div
                                key={cat.id}
                                className="p-4 rounded-xl border flex items-center justify-between"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <span className="font-medium">{t(cat.labelKey)}</span>
                                <span className="text-2xl font-bold text-primary">{courseCountByCategory[cat.id] || 0}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Charts Section - NEW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                    {/* Revenue Area Chart - Main Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 p-6 rounded-2xl border backdrop-blur-md"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold">{t('revenueTrends')}</h3>
                                <p className="text-sm" style={{ color: textSecondary }}>{t('last30Days')}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                                    <TrendingUp size={14} /> +12.5%
                                </span>
                            </div>
                        </div>

                        {/* Revenue SVG Chart */}
                        <div className="h-64 w-full relative">
                            <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Grid Lines */}
                                {[0, 75, 150, 225, 300].map(y => (
                                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="1" />
                                ))}
                                {/* Area Path */}
                                <path
                                    d="M0,250 C100,200 150,280 250,150 S400,200 500,100 S650,150 800,50 L800,300 L0,300 Z"
                                    fill="url(#chartGradient)"
                                />
                                {/* Line Path */}
                                <path
                                    d="M0,250 C100,200 150,280 250,150 S400,200 500,100 S650,150 800,50"
                                    fill="none"
                                    stroke="#00E5FF"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Data Points with Tooltips */}
                                {[
                                    { x: 250, y: 150, val: '$4,200' },
                                    { x: 500, y: 100, val: '$8,500' },
                                    { x: 800, y: 50, val: '$12,450' }
                                ].map((point, i) => (
                                    <g key={i}>
                                        <circle cx={point.x} cy={point.y} r="6" fill={bgColor} stroke="#00E5FF" strokeWidth="3" />
                                        <circle cx={point.x} cy={point.y} r="12" fill="#00E5FF" opacity="0.2" className="animate-pulse" />
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </motion.div>

                    {/* Simple User Distribution Donut Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl border backdrop-blur-md"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <h3 className="text-xl font-bold mb-6">{t('userDistribution')}</h3>

                        <div className="relative w-48 h-48 mx-auto mb-8">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                                {/* Background Circle */}
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="12" />

                                {/* Premium Segment (60%) */}
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#EAB308" // Yellow/Gold
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="100" // 60% filled
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />

                                {/* Active Segment (30% - offset) */}
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="transparent"
                                    stroke="#00E5FF" // Primary Blue
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="175" // 30% filled
                                    strokeLinecap="round"
                                    className="opacity-80"
                                    transform="rotate(216 50 50)" // Start after premium
                                />
                            </svg>

                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">{allUsers.length}</span>
                                <span className="text-xs uppercase tracking-wider opacity-60">Total</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span>{t('premiumUsers')}</span>
                                </div>
                                <span className="font-bold">60%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                                    <span>{t('freeUsers')}</span>
                                </div>
                                <span className="font-bold">30%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                    <span>{t('admins')}</span>
                                </div>
                                <span className="font-bold">10%</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Second Row of Charts */}
                <div className="grid grid-cols-1 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-2xl border backdrop-blur-md"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <h3 className="text-xl font-bold mb-6">{t('contentPerformance')}</h3>

                        <div className="h-64 w-full flex items-end justify-around px-4">
                            {[
                                { label: 'Courses', value: 85, color: '#8B5CF6' }, // Purple
                                { label: 'News', value: 45, color: '#EC4899' },    // Pink
                                { label: 'Videos', value: 65, color: '#06B6D4' },  // Cyan
                                { label: 'Live', value: 30, color: '#EAB308' },    // Yellow
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 group w-full max-w-[120px]">
                                    <div className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        {item.value}k
                                    </div>
                                    <div className="w-full bg-gray-500/10 rounded-t-xl relative overflow-hidden h-48 flex items-end">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${item.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className="w-full opacity-80 group-hover:opacity-100 transition-opacity"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium" style={{ color: textSecondary }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Access Roadmap */}
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <TrendingUp size={24} className="text-primary" />
                    {t('quickAccess')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {adminModules.map((module, i) => (
                        <Link to={module.path} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="h-full p-8 rounded-2xl border backdrop-blur-md group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <div className={`absolute top-0 right-0 p-32 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${module.bg}`} />

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${module.bg} ${module.color}`}>
                                    <module.icon size={32} />
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                                <p className="mb-8 leading-relaxed" style={{ color: textSecondary }}>
                                    {module.desc}
                                </p>

                                <div className="flex items-center gap-2 font-medium text-sm text-primary group-hover:translate-x-1 transition-transform">
                                    {t('goToPage')} <ArrowRight size={16} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};
