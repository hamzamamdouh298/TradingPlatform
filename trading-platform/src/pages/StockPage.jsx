import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { LayoutDashboard, Filter, Download } from 'lucide-react';
import { Button } from '../components/Button';

// Components
import { CapitalCard } from '../components/stock/CapitalCard';
import { AddTradeForm } from '../components/stock/AddTradeForm';
import { StatsCards } from '../components/stock/StatsCards';
import { ChartsSection } from '../components/stock/ChartsSection';
import { TradesTable } from '../components/stock/TradesTable';

export const StockPage = () => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const isAr = language === 'ar';

    // State
    const [trades, setTrades] = useState(() => {
        const saved = localStorage.getItem('kmt_trading_trades');
        return saved ? JSON.parse(saved) : [];
    });

    const [startingCapital, setStartingCapital] = useState(() => {
        const saved = localStorage.getItem('kmt_starting_capital');
        return saved ? Number(saved) : 1000;
    });

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('kmt_trading_trades', JSON.stringify(trades));
    }, [trades]);

    useEffect(() => {
        localStorage.setItem('kmt_starting_capital', startingCapital.toString());
    }, [startingCapital]);

    // Internal stats calculation
    const currentCapital = useMemo(() => {
        const totalPnL = trades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
        return startingCapital + totalPnL;
    }, [trades, startingCapital]);

    const stats = useMemo(() => {
        const totalTrades = trades.length;
        const winningTrades = trades.filter(t => t.profit > 0).length;
        const totalProfit = trades.reduce((sum, t) => sum + (t.profit || 0), 0);
        const totalProfitPercent = (totalProfit / startingCapital) * 100;

        const bestTrade = totalTrades > 0 ? Math.max(...trades.map(t => t.profit || 0)) : 0;
        const worstTrade = totalTrades > 0 ? Math.min(...trades.map(t => t.profit || 0)) : 0;

        // Win Rate
        const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

        // Group by month for Average Monthly Return
        const monthlyProfits = {};
        trades.forEach(t => {
            const month = t.date.substring(0, 7); // YYYY-MM
            monthlyProfits[month] = (monthlyProfits[month] || 0) + (t.profit || 0);
        });

        const monthlyReturns = Object.values(monthlyProfits).map(p => (p / startingCapital) * 100);
        const avgMonthlyReturn = monthlyReturns.length > 0
            ? monthlyReturns.reduce((sum, r) => sum + r, 0) / monthlyReturns.length
            : 0;

        return {
            totalTrades,
            winRate,
            totalProfit,
            totalProfitPercent,
            bestTrade,
            worstTrade,
            avgMonthlyReturn,
            monthlyProfits
        };
    }, [trades, startingCapital]);

    // Chart Data Transformation
    const equityData = useMemo(() => {
        let current = startingCapital;
        const data = [{ name: isAr ? 'البداية' : 'Start', value: current }];

        trades.forEach((t, i) => {
            current += (t.profit || 0);
            data.push({ name: `T-${i + 1}`, value: Number(current.toFixed(2)) });
        });

        return data;
    }, [trades, startingCapital, isAr]);

    const monthlyData = useMemo(() => {
        return Object.entries(stats.monthlyProfits).map(([month, profit]) => ({
            name: month,
            value: Number(((profit / startingCapital) * 100).toFixed(2))
        })).sort((a, b) => a.name.localeCompare(b.name));
    }, [stats.monthlyProfits, startingCapital]);

    // Handlers
    const addTrade = (trade) => {
        // Calculate Profit/Loss
        let profit = 0;
        if (trade.type === 'Buy') {
            profit = (trade.exitPrice - trade.entryPrice) * trade.quantity;
        } else {
            profit = (trade.entryPrice - trade.exitPrice) * trade.quantity;
        }

        const profitPercent = (profit / startingCapital) * 100;

        const updatedTrade = {
            ...trade,
            profit: Number(profit.toFixed(2)),
            profitPercent: Number(profitPercent.toFixed(2))
        };

        setTrades([...trades, updatedTrade]);
    };

    const deleteTrade = (id) => {
        setTrades(trades.filter(t => t.id !== id));
    };

    const bgColor = isDark ? '#050505' : '#f8f9fa';
    const textColor = isDark ? '#ffffff' : '#111827';

    return (
        <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: bgColor, color: textColor, direction: isAr ? 'rtl' : 'ltr' }}>
            <Navbar />

            <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
                <header className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${isAr ? 'md:flex-row-reverse' : ''}`}>
                    <div className={isAr ? 'text-right' : 'text-left'}>
                        <motion.div
                            initial={{ opacity: 0, x: isAr ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-[0.2em] text-xs ${isAr ? 'flex-row-reverse' : ''}`}
                        >
                            <LayoutDashboard size={14} /> {t('tradingDashboard')}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight"
                        >
                            {t('stockJournal')}.
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}
                    >
                        <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-xl border-current/10">
                            <Filter size={16} /> {t('filters')}
                        </Button>
                        <Button variant="primary" size="sm" className="flex items-center gap-2 rounded-xl group">
                            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> {t('exportData')}
                        </Button>
                    </motion.div>
                </header>

                {/* Top Section: Capital & Stats */}
                <section className="space-y-6 mb-10">
                    <CapitalCard
                        startingCapital={startingCapital}
                        currentCapital={currentCapital}
                        totalProfit={stats.totalProfit}
                        totalProfitPercent={stats.totalProfitPercent}
                        onCapitalUpdate={setStartingCapital}
                    />
                    <StatsCards stats={stats} />
                </section>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${isAr ? 'direction-rtl' : ''}`}>
                    {/* Form Column */}
                    <div className={`lg:col-span-4 lg:sticky lg:top-28 ${isAr ? 'lg:order-2' : ''}`}>
                        <AddTradeForm onAddTrade={addTrade} />
                    </div>

                    {/* Charts & Table Column */}
                    <div className={`lg:col-span-8 flex flex-col gap-8 ${isAr ? 'lg:order-1' : ''}`}>
                        <ChartsSection equityData={equityData} monthlyData={monthlyData} />
                        <TradesTable trades={trades} onDeleteTrade={deleteTrade} />
                    </div>
                </div>
            </main>
        </div>
    );
};
