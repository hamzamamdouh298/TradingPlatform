import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNews } from '../../context/NewsContext';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {
    Newspaper,
    Plus,
    Trash2,
    Edit,
    X,
    Image as ImageIcon,
    Video as VideoIcon,
    CheckCircle,
    AlertCircle,
    Calendar
} from 'lucide-react';

export const NewsPage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { news, addNews, updateNews, deleteNews } = useNews();

    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        video: null,
    });
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
    const [status, setStatus] = useState({ type: '', message: '' });

    const mediaInputRef = useRef(null);

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMediaSelection = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            setMediaType('image');
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaPreview(reader.result);
                setFormData(prev => ({ ...prev, image: reader.result, video: null }));
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            setMediaType('video');
            const reader = new FileReader();
            reader.onloadend = () => {
                setMediaPreview(reader.result);
                setFormData(prev => ({ ...prev, video: reader.result, image: null }));
            };
            reader.readAsDataURL(file);
        }
    };

    const openAddModal = () => {
        setEditingNews(null);
        setFormData({ title: '', description: '', image: null, video: null });
        setMediaPreview(null);
        setMediaType(null);
        setShowModal(true);
        setStatus({ type: '', message: '' });
    };

    const openEditModal = (newsItem) => {
        setEditingNews(newsItem);
        setFormData({
            title: newsItem.title,
            description: newsItem.description,
            image: newsItem.image,
            video: newsItem.video,
        });
        if (newsItem.image) {
            setMediaPreview(newsItem.image);
            setMediaType('image');
        } else if (newsItem.video) {
            setMediaPreview(newsItem.video);
            setMediaType('video');
        } else {
            setMediaPreview(null);
            setMediaType(null);
        }
        setShowModal(true);
        setStatus({ type: '', message: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            setStatus({ type: 'error', message: t('titleRequired') });
            return;
        }

        if (editingNews) {
            updateNews(editingNews.id, formData);
            setStatus({ type: 'success', message: t('newsUpdated') });
        } else {
            addNews(formData);
            setStatus({ type: 'success', message: t('newsAdded') });
        }

        setTimeout(() => {
            setShowModal(false);
            setFormData({ title: '', description: '', image: null, video: null });
            setMediaPreview(null);
            setMediaType(null);
        }, 1500);
    };

    const handleDelete = (newsId) => {
        if (window.confirm(t('deleteNewsConfirm'))) {
            deleteNews(newsId);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                <Newspaper className="text-primary" />
                                {t('newsManagement')}
                            </h1>
                            <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                {t('newsManagementDesc')}
                            </p>
                        </div>
                        <Button onClick={openAddModal} className="flex items-center gap-2">
                            <Plus size={20} />
                            {t('addNews')}
                        </Button>
                    </motion.div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-2xl border backdrop-blur-md overflow-hidden group"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                {/* Media Preview */}
                                {(item.image || item.video) && (
                                    <div className="aspect-video bg-gray-900/20 relative overflow-hidden">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {item.video && (
                                            <video
                                                src={item.video}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-bold text-lg line-clamp-2 flex-1">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <p className="text-sm mb-4 line-clamp-3" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs mb-4" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                        <Calendar size={14} />
                                        {formatDate(item.createdAt)}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditModal(item)}
                                            className="flex-1 flex items-center justify-center gap-2"
                                        >
                                            <Edit size={16} />
                                            {t('edit')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                            className="flex items-center justify-center gap-2 !text-red-500 !border-red-500/30 hover:!bg-red-500/10"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {news.length === 0 && (
                        <div className="text-center py-20">
                            <Newspaper size={64} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
                                {t('noNewsYet')}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl rounded-2xl border backdrop-blur-md p-8 max-h-[90vh] overflow-y-auto"
                            style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff', borderColor: borderColor }}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Newspaper className="text-primary" />
                                    {editingNews ? t('editNews') : t('addNews')}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <Input
                                    label={t('newsTitle')}
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter news title..."
                                />

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                                        {t('newsDescription')}
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="6"
                                        required
                                        className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300 border-2 resize-none"
                                        style={{
                                            backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
                                            borderColor: isDark ? '#333' : '#e5e7eb',
                                            color: textColor
                                        }}
                                        placeholder="Enter news description..."
                                    />
                                </div>

                                {/* Media Upload */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium block">
                                        {t('newsMedia')}
                                    </label>

                                    {mediaPreview ? (
                                        <div className="relative rounded-xl overflow-hidden border-2" style={{ borderColor: borderColor }}>
                                            {mediaType === 'image' ? (
                                                <img src={mediaPreview} alt="Preview" className="w-full aspect-video object-cover" />
                                            ) : (
                                                <video src={mediaPreview} className="w-full aspect-video object-cover" controls />
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMediaPreview(null);
                                                    setMediaType(null);
                                                    setFormData(prev => ({ ...prev, image: null, video: null }));
                                                }}
                                                className="absolute top-2 right-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => mediaInputRef.current?.click()}
                                            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors"
                                            style={{ borderColor: isDark ? '#333' : '#e5e7eb' }}
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex gap-4">
                                                    <ImageIcon size={32} className="text-gray-500" />
                                                    <VideoIcon size={32} className="text-gray-500" />
                                                </div>
                                                <p className="font-medium">{t('uploadMedia')}</p>
                                                <p className="text-sm text-gray-500">{t('uploadMediaDesc')}</p>
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        ref={mediaInputRef}
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleMediaSelection}
                                        className="hidden"
                                    />
                                </div>

                                {/* Status Message */}
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-xl flex items-center gap-3 text-sm ${status.type === 'error'
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            : 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            }`}
                                    >
                                        {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                                        {status.message}
                                    </motion.div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1"
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button type="submit" className="flex-1">
                                        {editingNews ? t('updateNews') : t('addNews')}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
