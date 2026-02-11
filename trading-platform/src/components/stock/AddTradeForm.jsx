import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Calendar, Briefcase, ChevronDown, Hash, Tag, FileText, ChevronUp, Image as ImageIcon, X, Sliders } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../Button';

export const AddTradeForm = ({ onAddTrade }) => {
    const { theme } = useTheme();
    const { t, language } = useLanguage();
    const isDark = theme === 'dark';
    const isAr = language === 'ar';
    const fileInputRef = useRef(null);

    const [isJournalOpen, setIsJournalOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        asset: '',
        type: 'Buy',
        entryPrice: '',
        exitPrice: '',
        quantity: '',
        strategy: '',
        notes: '',
        confidence: 5,
        screenshots: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const trade = {
            ...formData,
            id: Date.now(),
            entryPrice: Number(formData.entryPrice),
            exitPrice: Number(formData.exitPrice),
            quantity: Number(formData.quantity),
            confidence: Number(formData.confidence)
        };

        onAddTrade(trade);

        setFormData({
            ...formData,
            asset: '',
            entryPrice: '',
            exitPrice: '',
            quantity: '',
            strategy: '',
            notes: '',
            confidence: 5,
            screenshots: []
        });
        setIsJournalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.size > 2 * 1024 * 1024) return; // 2MB limit
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    screenshots: [...prev.screenshots, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeScreenshot = (index) => {
        setFormData(prev => ({
            ...prev,
            screenshots: prev.screenshots.filter((_, i) => i !== index)
        }));
    };

    const inputClasses = `w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary/20 outline-none ${isDark
            ? 'bg-zinc-900/50 border-white/10 text-white focus:border-primary/50'
            : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-primary'
        } ${isAr ? 'text-right' : 'text-left'}`;

    const labelClasses = `text-xs font-semibold mb-1.5 flex items-center gap-1.5 opacity-60 uppercase tracking-wider ${isAr ? 'flex-row-reverse ml-0 mr-1' : 'ml-1'}`;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border h-full"
            style={{
                backgroundColor: isDark ? 'rgba(20, 20, 22, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                direction: isAr ? 'rtl' : 'ltr'
            }}
        >
            <div className={`flex items-center gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <PlusCircle className="text-primary w-6 h-6" />
                </div>
                <div className={isAr ? 'text-right' : 'text-left'}>
                    <h2 className="text-xl font-bold">{t('logNewTrade')}</h2>
                    <p className="text-sm opacity-50">{t('enterTradeDetails')}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Date */}
                    <div>
                        <label className={labelClasses}><Calendar size={14} /> {t('date')}</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>

                    {/* Asset Name */}
                    <div>
                        <label className={labelClasses}><Briefcase size={14} /> {t('assetName')}</label>
                        <input
                            type="text"
                            name="asset"
                            placeholder={isAr ? "مثال: BTC/USDT" : "e.g. BTC/USDT"}
                            value={formData.asset}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>

                    {/* Trade Type */}
                    <div>
                        <label className={labelClasses}><ChevronDown size={14} /> {t('tradeType')}</label>
                        <div className="relative">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={`${inputClasses} appearance-none`}
                            >
                                <option value="Buy">{t('buyLong')}</option>
                                <option value="Sell">{t('sellShort')}</option>
                            </select>
                            <ChevronDown className={`absolute ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 opacity-40 pointer-events-none`} size={18} />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className={labelClasses}><Hash size={14} /> {t('quantity')}</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder={isAr ? "الكمية" : "Amount"}
                            step="any"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>

                    {/* Entry Price */}
                    <div>
                        <label className={labelClasses}>{t('entryPrice')}</label>
                        <input
                            type="number"
                            name="entryPrice"
                            placeholder="0.00"
                            step="any"
                            value={formData.entryPrice}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>

                    {/* Exit Price */}
                    <div>
                        <label className={labelClasses}>{t('exitPrice')}</label>
                        <input
                            type="number"
                            name="exitPrice"
                            placeholder="0.00"
                            step="any"
                            value={formData.exitPrice}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Collapsible Journal Section */}
                <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isJournalOpen ? (isDark ? 'border-primary/30 bg-primary/5' : 'border-primary/20 bg-primary/5') : (isDark ? 'border-white/5' : 'border-zinc-100')}`}>
                    <button
                        type="button"
                        onClick={() => setIsJournalOpen(!isJournalOpen)}
                        className={`w-full p-4 flex items-center justify-between text-sm font-bold opacity-80 hover:opacity-100 transition-opacity ${isAr ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <FileText size={18} className="text-primary" />
                            <span>{t('journal')}</span>
                        </div>
                        {isJournalOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                        {isJournalOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-6 space-y-5"
                            >
                                {/* Strategy Tag */}
                                <div>
                                    <label className={labelClasses}><Tag size={14} /> {t('strategyTag')}</label>
                                    <input
                                        type="text"
                                        name="strategy"
                                        placeholder={isAr ? "مثال: RSI, الدعم والمقاومة" : "e.g. Support & Resistance, RSI"}
                                        value={formData.strategy}
                                        onChange={handleChange}
                                        className={inputClasses}
                                    />
                                </div>

                                {/* Confidence Slider */}
                                <div>
                                    <div className={`flex items-center justify-between mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                                        <label className={labelClasses}><Sliders size={14} /> {t('confidence')}</label>
                                        <span className="text-sm font-bold text-primary">{formData.confidence}/10</span>
                                    </div>
                                    <input
                                        type="range"
                                        name="confidence"
                                        min="0"
                                        max="10"
                                        step="1"
                                        value={formData.confidence}
                                        onChange={handleChange}
                                        className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className={`flex justify-between mt-1 text-[10px] opacity-40 font-bold ${isAr ? 'flex-row-reverse' : ''}`}>
                                        <span>0</span>
                                        <span>5</span>
                                        <span>10</span>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className={labelClasses}><FileText size={14} /> {t('tradeNotes')}</label>
                                    <textarea
                                        name="notes"
                                        rows="3"
                                        placeholder={isAr ? "ما هو سبب دخولك لهذه الصفقة؟" : "What was your reasoning for this trade?"}
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>

                                {/* Upload Screenshots */}
                                <div>
                                    <label className={labelClasses}><ImageIcon size={14} /> {t('uploadScreenshots')}</label>
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5 ${isDark ? 'border-white/10' : 'border-zinc-200'}`}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <ImageIcon className="mx-auto mb-2 opacity-40" />
                                        <p className="text-xs font-medium opacity-60 leading-relaxed">
                                            {t('clickToUpload')}
                                        </p>
                                        <p className="text-[10px] opacity-40 mt-1">{t('imageNote')}</p>
                                    </div>

                                    {/* Preview Thumbnails */}
                                    {formData.screenshots.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mt-4">
                                            {formData.screenshots.map((src, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                                                    <img src={src} alt="Trade capture" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); removeScreenshot(idx); }}
                                                        className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
                                                    >
                                                        <X size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold tracking-wide shadow-lg shadow-primary/20">
                    {t('addTradeEntry')}
                </Button>
            </form>
        </motion.div>
    );
};
