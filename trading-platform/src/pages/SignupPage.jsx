import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserPlus, Sun, Moon, Languages } from 'lucide-react';

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            await signup(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-12 transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {/* Theme & Language Toggles */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-lg glass-panel hover:scale-110 transition-transform"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
                </button>
                <button
                    onClick={toggleLanguage}
                    className="p-3 rounded-lg glass-panel hover:scale-110 transition-transform flex items-center gap-1"
                    title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
                >
                    <Languages size={20} className="text-primary" />
                    <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
                </button>
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[150px] animate-pulse-slow"
                    style={{ backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)' }}
                />
                <div className="absolute top-1/2 -right-1/2 w-full h-full rounded-full blur-[150px] animate-pulse-slow delay-1000"
                    style={{ backgroundColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.1)' }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl">
                    <div className="text-center mb-10">
                        {/* KMT Trade Logo */}
                        <div className="mb-6 flex justify-center">
                            <img
                                src={`${import.meta.env.BASE_URL}kmt-logo.png`}
                                alt="KMT Trade"
                                className="h-40 w-auto object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">{t('createAccount')}</h1>
                        <p style={{ color: textSecondary }}>{t('joinKMT')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label={t('fullName')}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />

                        <Input
                            label={t('emailAddress')}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />

                        <Input
                            label={t('password')}
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <Input
                            label={t('confirmPassword')}
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            className="w-full shadow-lg shadow-green-500/20 bg-gradient-to-r from-green-500 to-emerald-600"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    {t('creatingAccount')}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <UserPlus size={18} /> {t('createAccount')}
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm" style={{ color: textSecondary }}>
                            {t('alreadyHaveAccount')}{' '}
                            <Link to="/login" className="text-primary hover:text-blue-400 transition-colors font-medium">
                                {t('signIn')}
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-center text-xs" style={{ color: textSecondary }}>
                        <p className="mb-2">{t('secureTrading')}</p>
                        <p>{t('copyright')}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
