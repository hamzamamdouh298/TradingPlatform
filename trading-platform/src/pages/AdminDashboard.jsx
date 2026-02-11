import { useState, useMemo } from 'react';
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
    DollarSign,
    BarChart2,
    PieChart,
    Activity
} from 'lucide-react';
import { useCourses } from '../context/CoursesContext';
import { useCourseCategories } from '../context/CourseCategoriesContext';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart as RechartsPie,
    Pie,
    Cell,
    BarChart as RechartsBar,
    Bar
} from 'recharts';

export const AdminDashboard = () => {
    const { allUsers } = useAuth();
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const { courses, getCourseCountByCategory } = useCourses();
    const { getAllCategoriesForAdmin } = useCourseCategories();

    const isDark = theme === 'dark';
    const isAr = language === 'ar';
    const bgColor = isDark ? '#050505' : '#f8f9fa';
    const textColor = isDark ? '#ffffff' : '#111827';
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';

    const courseCountByCategory = getCourseCountByCategory();
    const categoryList = getAllCategoriesForAdmin();

    const stats = [
        { label: t('totalUsers'), value: allUsers.length, icon: Users, color: 'text-primary' },
        { label: t('premiumMembers'), value: allUsers.filter(u => u.isPremium).length, icon: DollarSign, color: 'text-yellow-500' },
        { label: t('totalContent'), value: `${courses.length}`, icon: Video, color: 'text-purple-500' },
        { label: t('revenue'), value: '$12,450', icon: TrendingUp, color: 'text-green-500' },
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
            title: t('stock'),
            desc: t('stockJournalDesc'),
            icon: BarChart2,
            path: '/stock',
            color: 'text-cyan-500',
            bg: 'bg-cyan-500/10'
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
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
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

    // Chart Data
    const revenueData = [
        { name: 'Week 1', value: 4200 },
        { name: 'Week 2', value: 8500 },
        { name: 'Week 3', value: 6800 },
        { name: 'Week 4', value: 12450 },
    ];

    const userDistribution = [
        { name: t('premiumUsers'), value: 60, color: '#EAB308' },
        { name: t('freeUsers'), value: 30, color: '#00E5FF' },
        { name: t('admins'), value: 10, color: '#6B7280' },
    ];

    const performanceData = [
        { name: 'Courses', value: 85, color: '#8B5CF6' },
        { name: 'News', value: 45, color: '#EC4899' },
        { name: 'Videos', value: 65, color: '#06B6D4' },
        { name: 'Live', value: 30, color: '#EAB308' },
    ];

    const chartConfig = {
        gridColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        textColor: isDark ? '#9ca3af' : '#6b7280',
    };

    const customTooltipStyle = {
        backgroundColor: isDark ? 'rgba(20, 20, 22, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '12px',
        fontSize: '12px',
        direction: isAr ? 'rtl' : 'ltr',
        textAlign: isAr ? 'right' : 'left'
    };

    return (
        <div className="min-h-screen pb-20 transition-colors duration-500" style={{ backgroundColor: bgColor, color: textColor, direction: isAr ? 'rtl' : 'ltr' }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-[1600px] mx-auto">
                <header className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 ${isAr ? 'md:flex-row-reverse' : ''}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={isAr ? 'text-right' : 'text-left'}
                    >
                        <div className={`flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-[0.2em] text-xs ${isAr ? 'flex-row-reverse' : ''}`}>
                            <Activity size={14} /> System Command Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-3">
                            {t('adminDashboardTitle')}.
                        </h1>
                        <p className="text-sm opacity-50 font-medium tracking-wide">Welcome back. Everything is performing within operational parameters.</p>
                    </motion.div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl group"
                            style={{ backgroundColor: cardBg, borderColor: borderColor }}
                        >
                            <div className={`flex items-center justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                                <span className="text-xs font-bold opacity-40 uppercase tracking-widest">{stat.label}</span>
                                <div className={`p-2 rounded-xl bg-primary/5 ${stat.color} transition-colors group-hover:bg-primary/10`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <div className={`text-3xl font-black ${isAr ? 'text-right' : 'text-left'}`}>{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Revenue Area Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 glass-panel p-8 rounded-[2rem] border"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <div className={`flex items-center justify-between mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <h3 className="text-xl font-black tracking-tight">{t('revenueTrends')}</h3>
                                <p className="text-xs opacity-40 font-bold uppercase tracking-widest mt-1">{t('last30Days')}</p>
                            </div>
                            <div className={`flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-xl text-xs font-bold ${isAr ? 'flex-row-reverse' : ''}`}>
                                <TrendingUp size={14} /> +12.5%
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="adminRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke={chartConfig.textColor}
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        reversed={isAr}
                                    />
                                    <YAxis
                                        stroke={chartConfig.textColor}
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        orientation={isAr ? 'right' : 'left'}
                                        tickFormatter={(val) => `$${val}`}
                                    />
                                    <Tooltip contentStyle={customTooltipStyle} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#00E5FF"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#adminRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* User Distribution Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-8 rounded-[2rem] border"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <h3 className={`text-xl font-black tracking-tight mb-8 ${isAr ? 'text-right' : 'text-left'}`}>{t('userDistribution')}</h3>

                        <div className="h-[220px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPie>
                                    <Pie
                                        data={userDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {userDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={customTooltipStyle} />
                                </RechartsPie>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black">{allUsers.length}</span>
                                <span className="text-[10px] font-bold opacity-40 uppercase">Total</span>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            {userDistribution.map((item, i) => (
                                <div key={i} className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs font-bold opacity-60">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-black">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Secondary Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Performance Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 glass-panel p-8 rounded-[2rem] border"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <h3 className={`text-xl font-black tracking-tight mb-8 ${isAr ? 'text-right' : 'text-left'}`}>{t('contentPerformance')}</h3>

                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBar data={performanceData} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke={chartConfig.textColor}
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        reversed={isAr}
                                    />
                                    <YAxis
                                        stroke={chartConfig.textColor}
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                        orientation={isAr ? 'right' : 'left'}
                                    />
                                    <Tooltip
                                        cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                        contentStyle={customTooltipStyle}
                                    />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                        {performanceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </RechartsBar>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Courses per Category List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-4 glass-panel p-8 rounded-[2rem] border overflow-hidden"
                        style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                        <h3 className={`text-xl font-black tracking-tight mb-6 ${isAr ? 'text-right' : 'text-left'}`}>{t('coursesPerCategory')}</h3>
                        <div className="space-y-3">
                            {categoryList.map((cat, i) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`p-4 rounded-2xl border flex items-center justify-between group hover:bg-primary/5 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}
                                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderColor: borderColor }}
                                >
                                    <span className="text-sm font-bold opacity-60 group-hover:opacity-100 transition-opacity">{t(cat.labelKey)}</span>
                                    <span className="text-xl font-black text-primary">{courseCountByCategory[cat.id] || 0}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Access Roadmap */}
                <h2 className={`text-3xl font-black mb-10 flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Activity size={28} className="text-primary" />
                    {t('quickAccess')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminModules.map((module, i) => (
                        <Link to={module.path} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group h-full p-8 rounded-[2rem] border backdrop-blur-md hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} p-32 rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2 transition-colors duration-500 ${module.bg}`} />

                                <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${module.bg} ${module.color}`}>
                                    <module.icon size={32} />
                                </div>

                                <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                                <p className="text-sm leading-relaxed opacity-50 font-medium mb-10">
                                    {module.desc}
                                </p>

                                <div className={`flex items-center gap-2 font-bold text-xs text-primary uppercase tracking-widest transition-transform group-hover:translate-x-2 ${isAr ? 'flex-row-reverse group-hover:-translate-x-2' : ''}`}>
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
