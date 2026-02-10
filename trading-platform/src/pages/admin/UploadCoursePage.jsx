import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { UploadCloud, X, Film, Image as ImageIcon, CheckCircle, AlertCircle, FileVideo, Clock, Radio, Lock, Unlock, BookOpen } from 'lucide-react';
import { useCourses } from '../../context/CoursesContext';
import { useCourseCategories } from '../../context/CourseCategoriesContext';

export const UploadCoursePage = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { addCourse } = useCourses();
    const { getAllCategoriesForAdmin, defaultCategoryId } = useCourseCategories();
    const fileInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const categoryOptions = getAllCategoriesForAdmin();
    const [formData, setFormData] = useState({
        courseTitle: '',
        courseDescription: '',
        videoTitle: '',
        videoDescription: '',
        videoDuration: '',
        accessType: 'free',
        courseLevel: 'Beginner',
        courseCategory: defaultCategoryId,
    });

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [dragActive, setDragActive] = useState(false);

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#050505' : '#f5f5f5';
    const textColor = isDark ? '#ffffff' : '#1f2937';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            // If admin selects Paid Courses category, force accessType to premium
            if (name === 'courseCategory') {
                if (value === 'paidCourses') {
                    return { ...prev, courseCategory: value, accessType: 'premium' };
                }
                return { ...prev, courseCategory: value };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleVideoSelection(e.dataTransfer.files[0]);
        }
    };

    const handleVideoSelection = (file) => {
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            setStatus({ type: '', message: '' });
        } else {
            setStatus({ type: 'error', message: 'Please upload a valid video file.' });
        }
    };

    const handleThumbnailSelection = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile || !formData.courseTitle) {
            setStatus({ type: 'error', message: 'Please fill in all required fields and upload a video.' });
            return;
        }
        if (!formData.courseCategory) {
            setStatus({ type: 'error', message: t('courseCategoryRequired') });
            return;
        }

        setUploading(true);
        setStatus({ type: '', message: '' });

        // Simulate upload with progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setUploading(false);
            setUploadProgress(0);

            // Create course object using context
            const isPaidCourse = formData.courseCategory === 'paidCourses';
            const effectiveLessonType = isPaidCourse ? 'premium' : formData.accessType;

            const newCourseData = {
                title: formData.courseTitle,
                description: formData.courseDescription,
                thumbnail: thumbnailPreview || 'https://via.placeholder.com/300',
                level: formData.courseCategory === 'tradingPlatform' ? (formData.courseLevel || 'Beginner') : 'Beginner',
                categoryId: formData.courseCategory,
                totalLessons: 1,
                lessons: [
                    {
                        id: Date.now(),
                        title: formData.videoTitle || 'Lesson 1',
                        type: effectiveLessonType,
                        duration: formData.videoDuration || '10:00',
                        videoUrl: URL.createObjectURL(videoFile) // Mock URL for local preview
                    }
                ]
            };

            addCourse(newCourseData);

            setStatus({ type: 'success', message: t('uploadSuccess') });

            // Reset form
            setFormData({
                courseTitle: '',
                courseDescription: '',
                videoTitle: '',
                videoDescription: '',
                videoDuration: '',
                accessType: 'free',
                courseLevel: 'Beginner',
                courseCategory: defaultCategoryId,
            });
            setVideoFile(null);
            setThumbnailFile(null);
            setThumbnailPreview(null);
        }, 2200);
    };

    return (
        <div className="min-h-screen transition-colors duration-300 pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            <Navbar />

            <main className="pt-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold mb-2">{t('uploadCoursePageTitle')}</h1>
                        <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Create new content for the platform.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN - Form Inputs */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Course Details Section */}
                            <section className="p-6 rounded-2xl border backdrop-blur-md"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <BookOpen size={20} />
                                    <h2 className="text-xl font-bold">{t('courseDetails')}</h2>
                                </div>
                                <div className="space-y-5">
                                    <Input
                                        label={t('courseTitle')}
                                        name="courseTitle"
                                        value={formData.courseTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium ml-1" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                                            {t('courseDescription')}
                                        </label>
                                        <textarea
                                            name="courseDescription"
                                            value={formData.courseDescription}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300 border-2 resize-none"
                                            style={{
                                                backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
                                                borderColor: isDark ? '#333' : '#e5e7eb',
                                                color: textColor
                                            }}
                                            placeholder="Enter course description..."
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Video Details Section */}
                            <section className="p-6 rounded-2xl border backdrop-blur-md"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Film size={20} />
                                    <h2 className="text-xl font-bold">{t('videoDetails')}</h2>
                                </div>

                                {/* Drag & Drop Video Upload */}
                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6 ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-500/30'
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="video/*"
                                        onChange={(e) => handleVideoSelection(e.target.files[0])}
                                    />

                                    {videoFile ? (
                                        <div className="flex flex-col items-center animate-fadeIn">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                                <FileVideo size={32} />
                                            </div>
                                            <p className="font-medium mb-1">{videoFile.name}</p>
                                            <p className="text-sm text-gray-500 mb-4">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setVideoFile(null); }}
                                                className="text-red-500 text-sm hover:underline"
                                            >
                                                {t('removeFile')}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${dragActive ? 'bg-primary/20 text-primary' : (isDark ? 'bg-[#1A1A1A] text-gray-500' : 'bg-gray-100 text-gray-400')
                                                }`}>
                                                <UploadCloud size={32} />
                                            </div>
                                            <p className="font-medium text-lg mb-1">{t('dragDropVideo')}</p>
                                            <p className="text-sm text-gray-500">{t('orBrowse')}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <Input
                                        label={t('videoTitle')}
                                        name="videoTitle"
                                        value={formData.videoTitle}
                                        onChange={handleInputChange}
                                    />
                                    <div className="relative">
                                        <Input
                                            label={t('videoDuration')}
                                            name="videoDuration"
                                            value={formData.videoDuration}
                                            onChange={handleInputChange}
                                            placeholder="10:00"
                                        />
                                        <Clock size={18} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN - Settings & Actions */}
                        <div className="space-y-8">

                            {/* Publishing Settings */}
                            <section className="p-6 rounded-2xl border backdrop-blur-md"
                                style={{ backgroundColor: cardBg, borderColor: borderColor }}
                            >
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <CheckCircle size={20} />
                                    <h2 className="text-xl font-bold">{t('accessSettings')}</h2>
                                </div>

                                {/* Access Type Toggle */}
                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex p-1 rounded-xl bg-gray-500/10 border border-gray-500/20">
                                        {['free', 'premium'].map((type) => {
                                            const isPaidCategory = formData.courseCategory === 'paidCourses';
                                            const isActive = formData.accessType === type || (isPaidCategory && type === 'premium');
                                            const disabled = isPaidCategory;
                                            return (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    disabled={disabled}
                                                    onClick={() => !disabled && setFormData(prev => ({ ...prev, accessType: type }))}
                                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                                                        isActive
                                                            ? 'bg-primary text-black shadow-lg'
                                                            : 'text-gray-500 hover:bg-white/5'
                                                    } ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
                                                >
                                                    {type === 'free' ? <Unlock size={14} /> : <Lock size={14} />}
                                                    {t(type)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {formData.courseCategory === 'paidCourses' && (
                                        <p className="text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                            All videos in <strong>Paid Courses</strong> are automatically premium for users.
                                        </p>
                                    )}
                                </div>

                                {/* Course Category (mandatory) */}
                                <div className="space-y-3 mb-6">
                                    <label className="text-sm font-medium block">{t('courseCategory')} *</label>
                                    <select
                                        name="courseCategory"
                                        value={formData.courseCategory}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300 border-2"
                                        style={{
                                            backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
                                            borderColor: isDark ? '#333' : '#e5e7eb',
                                            color: textColor
                                        }}
                                    >
                                        {categoryOptions.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{t(cat.labelKey)}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Course Level Selection — only for Trading Platform */}
                                {formData.courseCategory === 'tradingPlatform' && (
                                    <div className="space-y-3 mb-8">
                                        <label className="text-sm font-medium block">{t('courseLevel') || 'Course Level'}</label>
                                        <select
                                            name="courseLevel"
                                            value={formData.courseLevel}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl px-4 py-3 outline-none transition-all duration-300 border-2"
                                            style={{
                                                backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
                                                borderColor: isDark ? '#333' : '#e5e7eb',
                                                color: textColor
                                            }}
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Professional">Professional</option>
                                        </select>
                                    </div>
                                )}
                                {formData.courseCategory === 'newsCourses' && (
                                    <p className="text-sm mb-8 opacity-70" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                                        {t('courseLevelNewsOnly')}
                                    </p>
                                )}

                                {/* Thumbnail Upload */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium block">{t('selectThumbnail')}</label>
                                    <div
                                        className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed cursor-pointer group"
                                        style={{ borderColor: isDark ? '#333' : '#e5e7eb' }}
                                        onClick={() => thumbnailInputRef.current.click()}
                                    >
                                        {thumbnailPreview ? (
                                            <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-500/5 group-hover:bg-gray-500/10 transition-colors">
                                                <ImageIcon size={24} className="mb-2" />
                                                <span className="text-xs">{t('thumbnailPreview')}</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-white text-sm font-medium">Change Image</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={thumbnailInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleThumbnailSelection}
                                    />
                                </div>
                            </section>

                            {/* Action Buttons */}
                            <div className="space-y-4">
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

                                {uploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium text-gray-500">
                                            <span>{t('uploading')}</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-500/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.location.reload()}
                                        disabled={uploading}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={uploading}
                                    >
                                        {uploading ? t('uploading') : t('uploadCourse')}
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};
