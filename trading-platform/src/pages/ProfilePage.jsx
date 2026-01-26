import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserCircle, Mail, Shield, CheckCircle, Camera } from 'lucide-react';

export const ProfilePage = () => {
    const { user, updateUserStatus, updateUserProfile } = useAuth();
    const { theme } = useTheme();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const bgColor = theme === 'dark' ? '#050505' : '#f5f5f5';
    const textColor = theme === 'dark' ? '#ffffff' : '#1f2937';
    const textSecondary = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const cardBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File is too large. Max 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                // Update user profile immediately with the new image
                updateUserProfile(user.id, { photoURL: base64String });
                setSuccessMsg(t('profileUpdated') || 'Profile picture updated');
                setTimeout(() => setSuccessMsg(''), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call to update profile
        setTimeout(() => {
            updateUserProfile(user.id, { name: formData.name });
            setSuccessMsg(t('profileUpdated') || 'Profile updated successfully');
            setIsEditing(false);
            setLoading(false);
            setTimeout(() => setSuccessMsg(''), 3000);
        }, 1000);
    };

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-8"
                >
                    {/* Profile Sidebar / Card */}
                    <div className="w-full md:w-1/3">
                        <div className="rounded-2xl p-6 border text-center relative overflow-hidden"
                            style={{ backgroundColor: cardBg, borderColor: borderColor, backdropFilter: 'blur(10px)' }}
                        >
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-blue-600/20" />

                            <div className="relative z-10 mt-8 mb-4 inline-block">
                                <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-primary bg-surfaceLight mx-auto overflow-hidden relative"
                                    style={{ borderColor: bgColor, backgroundColor: theme === 'dark' ? '#121212' : '#f3f4f6' }}
                                >
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserCircle size={80} strokeWidth={1} />
                                    )}
                                </div>
                                <button
                                    className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-black shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                    title={t('changeImage')}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <Camera size={16} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>

                            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                            <p className="text-sm mb-4" style={{ color: textSecondary }}>{user?.email}</p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                {user?.role === 'admin' ? <Shield size={12} /> : null}
                                {user?.role === 'admin' ? t('admin') : (user?.isPremium ? t('premium') : t('normal'))}
                            </div>

                            <div className="mt-8 pt-6 border-t w-full text-left space-y-3" style={{ borderColor: borderColor }}>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: textSecondary }}>{t('userId') || 'User ID'}</span>
                                    <span className="font-mono text-xs opacity-70">{user?.id}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: textSecondary }}>{t('status')}</span>
                                    <span className="text-green-500 flex items-center gap-1"><CheckCircle size={12} /> {t('active')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: textSecondary }}>{t('subscriptionStatus') || 'Subscription'}</span>
                                    <span className={user?.isPremium ? 'text-primary' : 'text-gray-500'}>
                                        {user?.isPremium ? 'Premium Plan' : 'Free Plan'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Settings Form */}
                    <div className="w-full md:w-2/3">
                        <div className="rounded-2xl p-8 border"
                            style={{ backgroundColor: cardBg, borderColor: borderColor, backdropFilter: 'blur(10px)' }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">{t('adminProfile') || 'Profile Settings'}</h2>
                                {!isEditing && (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                        {t('editProfile') || 'Edit Profile'}
                                    </Button>
                                )}
                            </div>

                            {successMsg && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-2"
                                >
                                    <CheckCircle size={16} /> {successMsg}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium" style={{ color: textSecondary }}>{t('fullName')}</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium" style={{ color: textSecondary }}>{t('emailAddress')}</label>
                                        <div className="relative">
                                            <Input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={true} // Email usually not editable directly
                                                className="opacity-70 cursor-not-allowed pl-10"
                                            />
                                            <Mail size={16} className="absolute left-3 top-3.5 text-gray-500" />
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-6 border-t" style={{ borderColor: borderColor }}>
                                        <h3 className="text-lg font-medium mb-4">{t('password') || 'Change Password'}</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium" style={{ color: textSecondary }}>Current Password</label>
                                                <Input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium" style={{ color: textSecondary }}>New Password</label>
                                                <Input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isEditing && (
                                    <div className="flex items-center justify-end gap-4 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                                            {t('cancel')}
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? 'Saving...' : t('saveChanges') || 'Save Changes'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
