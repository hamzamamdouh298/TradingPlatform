import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Settings, Shield, Save, Video } from 'lucide-react';
import { useState, useEffect } from 'react';

export const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    const { t, language, toggleLanguage } = useLanguage();
    const { heroVideoUrl, setHeroVideoUrl } = useSiteSettings();

    const [platformName, setPlatformName] = useState('KMT Trade');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [allowSignups, setAllowSignups] = useState(true);
    const [homepageVideoUrl, setHomepageVideoUrl] = useState(heroVideoUrl);

    useEffect(() => {
        setHomepageVideoUrl(heroVideoUrl);
    }, [heroVideoUrl]);

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

                    {/* Homepage Video */}
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
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setHeroVideoUrl(homepageVideoUrl);
                                }}
                            >
                                {t('save')} {t('homepageVideoUrl')}
                            </Button>
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
                        <Button className="flex items-center gap-2 px-8" onClick={() => setHeroVideoUrl(homepageVideoUrl)}>
                            <Save size={18} /> {t('saveChanges')}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
