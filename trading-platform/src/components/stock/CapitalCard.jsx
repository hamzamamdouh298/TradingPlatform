import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Edit3, Check, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const CapitalCard = ({ startingCapital, onCapitalUpdate, currentCapital, totalProfit, totalProfitPercent }) => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const [isEditing, setIsEditing] = useState(false);
    const [tempCapital, setTempCapital] = useState(startingCapital);

    const handleSave = () => {
        onCapitalUpdate(Number(tempCapital));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempCapital(startingCapital);
        setIsEditing(false);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val || 0);
    };

    const isPositive = totalProfit >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {/* Starting Capital */}
            <div className="glass-panel p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl relative group"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-60">{t('startingCapital')}</span>
                    <Wallet className="text-primary w-5 h-5" />
                </div>

                {isEditing ? (
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="number"
                            value={tempCapital}
                            onChange={(e) => setTempCapital(e.target.value)}
                            className="bg-transparent border-b border-primary text-xl font-bold w-full focus:outline-none"
                            autoFocus
                        />
                        <button onClick={handleSave} className="p-1 text-green-500 hover:bg-green-500/10 rounded-full transition-colors">
                            <Check size={18} />
                        </button>
                        <button onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-500/10 rounded-full transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between group">
                        <h3 className="text-2xl font-bold">{formatCurrency(startingCapital)}</h3>
                        <button
                            onClick={() => setIsEditing(true)}
                            className={`opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all ${language === 'ar' ? 'mr-auto' : 'ml-auto'}`}
                        >
                            <Edit3 size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Current Capital */}
            <div className="glass-panel p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-60">{t('currentCapital')}</span>
                    <DollarSign className="text-primary w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{formatCurrency(currentCapital)}</h3>
            </div>

            {/* Total P/L ($) */}
            <div className="glass-panel p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-60">{t('totalProfitLoss')} ($)</span>
                    {isPositive ? <TrendingUp className="text-green-500 w-5 h-5" /> : <TrendingDown className="text-red-500 w-5 h-5" />}
                </div>
                <h3 className={`text-2xl font-bold tracking-tight ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(totalProfit)}
                </h3>
            </div>

            {/* Total P/L (%) */}
            <div className="glass-panel p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.95)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
                }}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-60">{t('totalProfitLoss')} (%)</span>
                    <div className={`p-1 rounded-md ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {isPositive ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-red-500" />}
                    </div>
                </div>
                <h3 className={`text-2xl font-bold tracking-tight ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{totalProfitPercent.toFixed(2)}%
                </h3>
            </div>
        </motion.div>
    );
};
