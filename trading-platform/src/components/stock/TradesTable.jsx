import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, FileText, Image as ImageIcon, X, Sliders, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const TradesTable = ({ trades, onDeleteTrade }) => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const isAr = language === 'ar';
    const [selectedTrade, setSelectedTrade] = useState(null);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat(isAr ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val || 0);
    };

    const getConfidenceColor = (val) => {
        if (val >= 8) return 'text-green-500';
        if (val >= 5) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel rounded-3xl border overflow-hidden"
                style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    direction: isAr ? 'rtl' : 'ltr'
                }}
            >
                <div className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${isAr ? 'flex-row-reverse' : ''}`}
                    style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                >
                    <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <div className="w-1.5 h-6 bg-primary rounded-full" />
                        <h3 className="text-xl font-bold tracking-tight">{t('tradeHistory')}</h3>
                        <span className={`text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-bold ${isAr ? 'mr-2' : 'ml-2'}`}>
                            {trades.length} {isAr ? 'صفقة' : 'TRADES'}
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className={`w-full ${isAr ? 'text-right' : 'text-left'}`}>
                        <thead>
                            <tr className="text-xs uppercase tracking-widest opacity-40 font-bold"
                                style={{ backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)' }}
                            >
                                <th className="px-6 py-4">{t('assetLabel')}</th>
                                <th className="px-6 py-4 text-center">{t('typeLabel')}</th>
                                <th className="px-6 py-4 text-center">{t('entryExitLabel')}</th>
                                <th className="px-6 py-4 text-center">{t('qtyLabel')}</th>
                                <th className={`px-6 py-4 ${isAr ? 'text-left' : 'text-right'}`}>{t('profitLossLabel')}</th>
                                <th className="px-6 py-4 text-center">{t('journal')}</th>
                                <th className="px-6 py-4 text-center">{t('actionsLabel')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}>
                            <AnimatePresence>
                                {trades.length === 0 ? (
                                    <tr className="opacity-50">
                                        <td colSpan="7" className="px-6 py-20 text-center italic">
                                            {t('noTradesLogged')}
                                        </td>
                                    </tr>
                                ) : (
                                    trades.slice().reverse().map((trade) => {
                                        const profitVal = trade.profit || 0;
                                        const isWin = profitVal >= 0;

                                        return (
                                            <motion.tr
                                                key={trade.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="hover:bg-primary/5 transition-colors group cursor-pointer"
                                                onClick={() => setSelectedTrade(trade)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="font-bold">{trade.asset}</div>
                                                    <div className="text-[10px] opacity-40">{trade.date}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${trade.type === 'Buy'
                                                            ? 'bg-blue-500/10 text-blue-500'
                                                            : 'bg-orange-500/10 text-orange-500'
                                                        }`}>
                                                        {trade.type === 'Buy' ? t('buyLong') : t('sellShort')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center tabular-nums">
                                                    <div className="text-sm font-medium">{formatCurrency(trade.entryPrice)}</div>
                                                    <div className="text-[10px] opacity-40">{formatCurrency(trade.exitPrice)}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center tabular-nums text-sm opacity-60">
                                                    {trade.quantity}
                                                </td>
                                                <td className={`px-6 py-4 ${isAr ? 'text-left' : 'text-right'} tabular-nums`}>
                                                    <div className={`text-sm font-bold ${isWin ? 'text-green-500' : 'text-red-500'}`}>
                                                        {isWin ? '+' : ''}{formatCurrency(profitVal)}
                                                    </div>
                                                    <div className={`text-[10px] font-medium ${isWin ? 'text-green-500/60' : 'text-red-500/60'}`}>
                                                        {isWin ? '+' : ''}{trade.profitPercent?.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {trade.confidence !== undefined && (
                                                            <div className={`text-[10px] font-black ${getConfidenceColor(trade.confidence)}`}>
                                                                {trade.confidence}/10
                                                            </div>
                                                        )}
                                                        {trade.screenshots?.length > 0 && (
                                                            <ImageIcon size={14} className="opacity-40" />
                                                        )}
                                                        {trade.notes && (
                                                            <FileText size={14} className="opacity-40" />
                                                        )}
                                                        {!trade.notes && !trade.screenshots?.length && trade.confidence === undefined && (
                                                            <span className="opacity-10">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onDeleteTrade(trade.id); }}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Trade Detail Modal */}
            <AnimatePresence>
                {selectedTrade && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTrade(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${isDark ? 'bg-zinc-950 border-white/10' : 'bg-white border-zinc-200'}`}
                            style={{ direction: isAr ? 'rtl' : 'ltr' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedTrade(null)}
                                className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} p-2 rounded-full hover:bg-white/5 transition-colors z-10 opacity-60 hover:opacity-100`}
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <div className={`flex items-start gap-4 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <PlusCircle className="text-primary w-8 h-8" />
                                    </div>
                                    <div className={isAr ? 'text-right' : 'text-left'}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-2xl font-black">{selectedTrade.asset}</h2>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedTrade.type === 'Buy' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                                                }`}>
                                                {selectedTrade.type === 'Buy' ? t('buyLong') : t('sellShort')}
                                            </span>
                                        </div>
                                        <p className="text-sm opacity-50 font-medium">{selectedTrade.date}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                                    <div className={isAr ? 'text-right' : 'text-left'}>
                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">{t('entryPrice')}</p>
                                        <p className="text-lg font-bold">{formatCurrency(selectedTrade.entryPrice)}</p>
                                    </div>
                                    <div className={isAr ? 'text-right' : 'text-left'}>
                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">{t('exitPrice')}</p>
                                        <p className="text-lg font-bold">{formatCurrency(selectedTrade.exitPrice)}</p>
                                    </div>
                                    <div className={isAr ? 'text-right' : 'text-left'}>
                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">{t('quantity')}</p>
                                        <p className="text-lg font-bold">{selectedTrade.quantity}</p>
                                    </div>
                                    <div className={isAr ? 'text-right' : 'text-left'}>
                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">{t('profitLossLabel')}</p>
                                        <p className={`text-lg font-bold ${selectedTrade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {selectedTrade.profit >= 0 ? '+' : ''}{formatCurrency(selectedTrade.profit)}
                                        </p>
                                    </div>
                                </div>

                                {/* Journal Content */}
                                <div className="space-y-8">
                                    {/* Strategy & Confidence */}
                                    <div className={`flex flex-wrap items-center gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                                        {selectedTrade.strategy && (
                                            <div>
                                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">{t('strategyTag')}</p>
                                                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-xs font-bold ring-1 ring-primary/20">
                                                    #{selectedTrade.strategy}
                                                </span>
                                            </div>
                                        )}
                                        {selectedTrade.confidence !== undefined && (
                                            <div>
                                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">{t('confidence')}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${getConfidenceColor(selectedTrade.confidence).replace('text-', 'bg-')}`}
                                                            style={{ width: `${selectedTrade.confidence * 10}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-black ${getConfidenceColor(selectedTrade.confidence)}`}>
                                                        {selectedTrade.confidence}/10
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    {selectedTrade.notes && (
                                        <div>
                                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <FileText size={12} /> {t('tradeNotes')}
                                            </p>
                                            <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-zinc-50'} text-sm leading-relaxed opacity-80 whitespace-pre-wrap`}>
                                                {selectedTrade.notes}
                                            </div>
                                        </div>
                                    )}

                                    {/* Screenshots */}
                                    {selectedTrade.screenshots?.length > 0 && (
                                        <div>
                                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <ImageIcon size={12} /> {t('uploadScreenshots')}
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedTrade.screenshots.map((src, idx) => (
                                                    <a key={idx} href={src} target="_blank" rel="noreferrer" className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video block">
                                                        <img src={src} alt="Trade screenshot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ExternalLink className="text-white" size={24} />
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
