import { motion } from 'framer-motion';
import { Target, Award, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const StatsCards = ({ stats }) => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const isAr = language === 'ar';

    const formatCurrency = (val) => {
        return new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val || 0);
    };

    const cards = [
        {
            label: t('totalTrades'),
            value: stats.totalTrades,
            icon: Target,
            color: 'primary'
        },
        {
            label: t('winRate'),
            value: `${stats.winRate.toFixed(1)}%`,
            icon: Award,
            color: stats.winRate >= 50 ? 'green-500' : 'orange-500'
        },
        {
            label: t('bestTrade'),
            value: formatCurrency(stats.bestTrade),
            icon: TrendingUp,
            color: 'green-500'
        },
        {
            label: t('worstTrade'),
            value: formatCurrency(stats.worstTrade),
            icon: TrendingDown,
            color: 'red-500'
        },
        {
            label: t('avgMonthlyReturn'),
            value: `${stats.avgMonthlyReturn.toFixed(2)}%`,
            icon: BarChart3,
            color: stats.avgMonthlyReturn >= 0 ? 'primary' : 'red-500'
        }
    ];

    return (
        <div className={`grid grid-cols-2 lg:grid-cols-5 gap-4 ${isAr ? 'direction-rtl' : ''}`} style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            {cards.map((card, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-panel p-5 rounded-2xl border transition-all duration-300 hover:translate-y-[-2px]"
                    style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.8)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <div className={`flex items-center gap-3 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-lg bg-${card.color === 'primary' ? 'primary/10' : card.color.split('-')[0] + '-500/10'}`}>
                            <card.icon size={18} className={`text-${card.color === 'primary' ? 'primary' : card.color}`} />
                        </div>
                        <span className="text-xs font-bold opacity-40 uppercase tracking-tighter">{card.label}</span>
                    </div>
                    <h4 className={`text-xl font-bold ${isAr ? 'text-right' : 'text-left'}`}>{card.value}</h4>
                </motion.div>
            ))}
        </div>
    );
};
