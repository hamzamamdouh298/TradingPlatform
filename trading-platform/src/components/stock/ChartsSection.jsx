import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell
} from 'recharts';

export const ChartsSection = ({ equityData, monthlyData }) => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const isAr = language === 'ar';

    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#9ca3af' : '#6b7280';

    const customTooltipStyle = {
        backgroundColor: isDark ? 'rgba(20, 20, 22, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '12px',
        direction: isAr ? 'rtl' : 'ltr',
        textAlign: isAr ? 'right' : 'left'
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Equity Curve */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 rounded-3xl border"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    direction: isAr ? 'rtl' : 'ltr'
                }}
            >
                <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={isAr ? 'text-right' : 'text-left'}>
                        <h3 className="text-lg font-bold tracking-tight">{t('equityGrowth')}</h3>
                        <p className="text-xs opacity-50">{t('cumulativePerformance')}</p>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={equityData}>
                            <defs>
                                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke={textColor}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                reversed={isAr}
                            />
                            <YAxis
                                stroke={textColor}
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
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorEquity)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Monthly Performance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 rounded-3xl border"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    direction: isAr ? 'rtl' : 'ltr'
                }}
            >
                <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={isAr ? 'text-right' : 'text-left'}>
                        <h3 className="text-lg font-bold tracking-tight">{t('monthlyPerformance')}</h3>
                        <p className="text-xs opacity-50">{t('profitLossPerMonth')}</p>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke={textColor}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                reversed={isAr}
                            />
                            <YAxis
                                stroke={textColor}
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                orientation={isAr ? 'right' : 'left'}
                                tickFormatter={(val) => `${val}%`}
                            />
                            <Tooltip
                                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                contentStyle={customTooltipStyle}
                                formatter={(val) => [`${val.toFixed(2)}%`, isAr ? 'الربح' : 'Profit']}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {monthlyData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.value >= 0 ? '#10b981' : '#ef4444'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};
