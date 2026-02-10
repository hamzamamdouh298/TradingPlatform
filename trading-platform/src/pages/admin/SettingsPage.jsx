import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Settings, Shield, Save, Video, BookOpen, ChevronUp, ChevronDown, LineChart, Eye, EyeOff, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCourseCategories } from '../../context/CourseCategoriesContext';
import { useMarket } from '../../context/MarketContext';

export const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, language, toggleLanguage } = useLanguage();
    const { heroVideoUrl, setHeroVideoUrl, heroTitle, heroDescription, setHeroTitle, setHeroDescription } = useSiteSettings();
    const { getAllCategoriesForAdmin, setCategoryEnabled, moveCategory } = useCourseCategories();

    const [platformName, setPlatformName] = useState('KMT Trade');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [allowSignups, setAllowSignups] = useState(true);
    const [homepageVideoUrl, setHomepageVideoUrl] = useState(heroVideoUrl);
    const [heroTitleInput, setHeroTitleInput] = useState(heroTitle);
    const [heroDescInput, setHeroDescInput] = useState(heroDescription);

    const { assets, enabled, setSectionEnabled, updateAsset, addAsset, removeAsset } = useMarket();

    useEffect(() => {
        setHomepageVideoUrl(heroVideoUrl);
    }, [heroVideoUrl]);

    useEffect(() => {
        setHeroTitleInput(heroTitle);
        setHeroDescInput(heroDescription);
    }, [heroTitle, heroDescription]);

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{t('platformSettings')}</h1>
                    <p style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>{t('settingsDesc')}</p>
                </div>

                <div className="space-y-6">
                    {/* General Settings */}
                    <section className="p-6 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Settings size={20} />
                            </div>
                            <h2 className="text-xl font-bold">{t('general')}</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Input
                                    label={t('platformName')}
                                    value={platformName}
                                    onChange={(e) => setPlatformName(e.target.value)}
                                />
                                <p className="text-xs mt-2 opacity-50">{t('platformNameDesc')}</p>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: borderColor }}>
                                <div>
                                    <div className="font-medium">{t('themePreference')}</div>
                                    <div className="text-sm opacity-60">{t('current')}: {theme === 'dark' ? t('darkMode') : t('lightMode')}</div>
                                </div>
                                <Button size="sm" variant="outline" onClick={toggleTheme}>
                                    {t('switchTheme')}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: borderColor }}>
                                <div>
                                    <div className="font-medium">{t('systemLanguage')}</div>
                                    <div className="text-sm opacity-60">{t('current')}: {language === 'en' ? t('english') : t('arabic')}</div>
                                </div>
                                <Button size="sm" variant="outline" onClick={toggleLanguage}>
                                    {t('switchLanguage')}
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Homepage Video + Hero Text */}
                    <section className="p-6 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Video size={20} />
                            </div>
                            <h2 className="text-xl font-bold">{t('homepageVideoUrl')}</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label={t('homepageVideoUrl')}
                                    value={homepageVideoUrl}
                                    onChange={(e) => setHomepageVideoUrl(e.target.value)}
                                />
                                <p className="text-xs mt-2 opacity-50">{t('homepageVideoDesc')}</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Hero Title"
                                    value={heroTitleInput}
                                    onChange={(e) => setHeroTitleInput(e.target.value)}
                                />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1" style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563' }}>
                                        Hero Description
                                    </label>
                                    <textarea
                                        value={heroDescInput}
                                        onChange={(e) => setHeroDescInput(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300 border-2 resize-none"
                                        style={{
                                            backgroundColor: theme === 'dark' ? '#1A1A1A' : '#ffffff',
                                            borderColor: theme === 'dark' ? '#333' : '#e5e7eb',
                                            color: textColor,
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setHeroVideoUrl(homepageVideoUrl);
                                    setHeroTitle(heroTitleInput);
                                    setHeroDescription(heroDescInput);
                                }}
                            >
                                {t('saveChanges')}
                            </Button>
                        </div>
                    </section>

                    {/* Market Prices Section */}
                    <section className="p-6 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <LineChart size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Homepage Market Prices</h2>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                Control which currencies/assets appear on the homepage market strip.
                            </p>
                            <div
                                onClick={() => setSectionEnabled(!enabled)}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${enabled ? 'bg-primary' : 'bg-gray-600'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {assets.map((asset) => (
                                <div
                                    key={asset.id}
                                    className="grid grid-cols-[1.5fr,1fr,1fr,auto] gap-3 items-center p-3 rounded-xl border"
                                    style={{ borderColor: borderColor, opacity: asset.visible ? 1 : 0.7 }}
                                >
                                    <Input
                                        label="Name"
                                        value={asset.name}
                                        onChange={(e) => updateAsset(asset.id, { name: e.target.value })}
                                    />
                                    <Input
                                        label="Symbol"
                                        value={asset.symbol}
                                        onChange={(e) => updateAsset(asset.id, { symbol: e.target.value })}
                                    />
                                    <Input
                                        label="Price"
                                        type="number"
                                        value={asset.price}
                                        onChange={(e) => updateAsset(asset.id, { price: parseFloat(e.target.value) || 0 })}
                                    />
                                    <div className="flex items-center gap-2 justify-end">
                                        <Input
                                            label="%"
                                            type="number"
                                            value={asset.change}
                                            onChange={(e) => updateAsset(asset.id, { change: parseFloat(e.target.value) || 0 })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => updateAsset(asset.id, { visible: !asset.visible })}
                                            className="p-2 rounded-lg border"
                                            style={{ borderColor: borderColor }}
                                            title={asset.visible ? 'Hide' : 'Show'}
                                        >
                                            {asset.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeAsset(asset.id)}
                                            className="p-2 rounded-lg border text-red-500"
                                            style={{ borderColor: borderColor }}
                                            title="Remove asset"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="sm"
                            variant="outline"
                            className="mt-4 flex items-center gap-2"
                            onClick={addAsset}
                        >
                            <Plus size={16} /> Add Asset
                        </Button>
                    </section>

                    {/* Course category display control */}
                    <section className="p-6 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-xl font-bold">{t('categoryDisplayControl')}</h2>
                        </div>
                        <p className="text-sm mb-6 opacity-70" style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                            {t('categoryDisplayControlDesc')}
                        </p>
                        <div className="space-y-3">
                            {getAllCategoriesForAdmin().map((cat, index) => (
                                <div
                                    key={cat.id}
                                    className="flex items-center justify-between p-4 rounded-xl border"
                                    style={{ borderColor: borderColor }}
                                >
                                    <span className="font-medium">{t(cat.labelKey)}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => moveCategory(cat.id, -1)}
                                            disabled={index === 0}
                                            className="p-2 rounded-lg border opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                            style={{ borderColor: borderColor }}
                                            title={t('moveUp')}
                                        >
                                            <ChevronUp size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => moveCategory(cat.id, 1)}
                                            disabled={index === getAllCategoriesForAdmin().length - 1}
                                            className="p-2 rounded-lg border opacity-80 hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                            style={{ borderColor: borderColor }}
                                            title={t('moveDown')}
                                        >
                                            <ChevronDown size={18} />
                                        </button>
                                        <div
                                            onClick={() => setCategoryEnabled(cat.id, !cat.enabled)}
                                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${cat.enabled ? 'bg-primary' : 'bg-gray-600'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${cat.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Access Control */}
                    <section className="p-6 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: cardBg, borderColor: borderColor }}>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: borderColor }}>
                            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                <Shield size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-red-500">{t('accessControl')}</h2>
                            <span className="ml-auto text-xs px-2 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/20">{t('adminOnly')}</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{t('maintenanceMode')}</div>
                                    <div className="text-sm opacity-60">{t('maintenanceModeDesc')}</div>
                                </div>
                                <div
                                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${maintenanceMode ? 'bg-primary' : 'bg-gray-700'}`}
                                >
                                    <div className={`w-4 h-full rounded-full bg-white shadow-sm transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{t('allowSignups')}</div>
                                    <div className="text-sm opacity-60">{t('allowSignupsDesc')}</div>
                                </div>
                                <div
                                    onClick={() => setAllowSignups(!allowSignups)}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${allowSignups ? 'bg-primary' : 'bg-gray-700'}`}
                                >
                                    <div className={`w-4 h-full rounded-full bg-white shadow-sm transition-transform ${allowSignups ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end pt-4">
                        <Button className="flex items-center gap-2 px-8" onClick={() => {
                            setHeroVideoUrl(homepageVideoUrl);
                            setHeroTitle(heroTitleInput);
                            setHeroDescription(heroDescInput);
                        }}>
                            <Save size={18} /> {t('saveChanges')}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
