import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navbar
        adminDashboard: 'Admin Dashboard',
        courses: 'Courses',
        logout: 'Logout',

        // Login Page
        welcomeBack: 'Welcome Back',
        signInToAccount: 'Sign in to your KMT Trade account',
        emailAddress: 'Email Address',
        password: 'Password',
        secureLogin: 'Secure Login',
        authenticating: 'Authenticating...',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign Up',
        secureTrading: 'Secure Trading Platform',
        copyright: '© 2026 KMT Trade. All rights reserved.',

        // Signup Page
        createAccount: 'Create Account',
        joinKMT: 'Join KMT Trade and start your trading journey',
        fullName: 'Full Name',
        confirmPassword: 'Confirm Password',
        creatingAccount: 'Creating Account...',
        alreadyHaveAccount: 'Already have an account?',
        signIn: 'Sign In',

        // Landing Page
        professionalTrading: 'Professional Trading Education - KMT Trade',
        masterMarkets: 'Master the Markets',
        withConfidence: 'With Confidence',
        tradingDescription: 'Professional trading education designed for serious investors. Unlock premium strategies, live analysis, and expert mentorship.',
        startLearning: 'Start Learning Now',
        viewCourses: 'View Course Catalog',
        students: 'Students',
        certifiedMentors: 'Certified Mentors',

        // Courses Page
        tradingCourses: 'Trading Courses',
        courseDescription: 'Explore our comprehensive curriculum designed for all skill levels.',
        lessons: 'Lessons',
        waitlist: 'Waitlist',
        startCourse: 'Start Course',

        // Video Player
        premiumContent: 'Premium Content',
        premiumDescription: 'This masterclass lesson is reserved for our premium members. Unlock full access to elevate your trading game.',
        subscribeToUnlock: 'Subscribe to Unlock',
        courseContent: 'Course Content',

        // Admin Dashboard
        adminDashboardTitle: 'Admin Dashboard',
        totalUsers: 'Total Users',
        premiumMembers: 'Premium Members',
        totalContent: 'Total Content',
        revenue: 'Revenue (Est)',
        userManagement: 'User Management',
        manageAccess: 'Manage access rights',
        user: 'User',
        email: 'Email',
        role: 'Role',
        status: 'Status',
        actions: 'Actions',
        admin: 'Admin',
        normal: 'Normal',
        premium: 'Premium',
        activatePremium: 'Activate Premium',
        deactivatePremium: 'Deactivate Premium',
        courses: 'Courses',
        quickAccess: 'Quick Access',
        usersDesc: 'Manage users, roles, and subscriptions',
        coursesDesc: 'Manage course content and visibility',
        uploadDesc: 'Upload new video lessons',
        newsDesc: 'Publish news and announcements',
        settingsDesc: 'Configure platform settings',
        settingsDesc: 'Configure platform settings',
        goToPage: 'Go to Page',

        // Dashboard Stats & Charts
        overview: 'System Overview',
        userDistribution: 'User Distribution',
        revenueTrends: 'Revenue Trends',
        contentPerformance: 'Content Performance',
        premiumUsers: 'Premium Users',
        freeUsers: 'Free Users',
        admins: 'Admins',
        monthlyGrowth: 'Monthly Growth',
        last30Days: 'Last 30 Days',
        totalViews: 'Total Views',
        engagement: 'Engagement',

        // Admin Sidebar
        overview: 'Overview',
        courseManagement: 'Course Management',
        usersManagement: 'Users',
        profile: 'Profile',

        // Course Management
        addNewCourse: 'Add New Course',
        courseTitle: 'Course Title',
        adminCourseDescription: 'Course Description',
        courseThumbnail: 'Thumbnail URL',
        courseLevel: 'Course Level',
        courseType: 'Course Type',
        public: 'Public',
        premiumOnly: 'Premium Only',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        uploadCourse: 'Upload Course',
        editCourse: 'Edit Course',
        deleteCourse: 'Delete Course',
        hideCourse: 'Hide Course',
        showCourse: 'Show Course',
        courseStats: 'Course Statistics',
        totalViews: 'Total Views',
        premiumViews: 'Premium Views',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        confirm: 'Confirm',
        edit: 'Edit',

        // User Management
        searchUsers: 'Search users...',
        filterByStatus: 'Filter by status',
        allUsers: 'All Users',
        activeUsers: 'Active Users',
        inactiveUsers: 'Inactive Users',
        userId: 'User ID',
        accountStatus: 'Account Status',
        subscriptionStatus: 'Subscription',
        active: 'Active',
        inactive: 'Inactive',
        activateAccount: 'Activate Account',
        deactivateAccount: 'Deactivate Account',
        deleteAccount: 'Delete Account',
        deleteUserConfirm: 'Are you sure you want to delete this user?',
        deleteUserWarning: 'This action cannot be undone.',

        // Admin Profile
        adminProfile: 'Admin Profile',
        profileImage: 'Profile Image',
        changeImage: 'Change Image',
        adminName: 'Name',
        adminEmail: 'Email',
        editProfile: 'Edit Profile',
        saveChanges: 'Save Changes',
        profileUpdated: 'Profile updated successfully',

        // Messages
        courseAdded: 'Course added successfully',
        courseUpdated: 'Course updated successfully',
        courseDeleted: 'Course deleted successfully',
        userDeleted: 'User deleted successfully',
        userActivated: 'User activated successfully',
        userDeactivated: 'User deactivated successfully',
        settings: 'Settings',

        // Upload Course Page
        uploadCoursePageTitle: 'Upload Course Video',
        courseDetails: 'Course Details',
        videoDetails: 'Video Details',
        accessSettings: 'Access Settings',
        videoTitle: 'Video Title',
        videoDescription: 'Video Description',
        dragDropVideo: 'Drag & Drop video here',
        orBrowse: 'or browse to upload',
        videoDuration: 'Duration (mm:ss)',
        videoType: 'Video Type',
        free: 'Free',
        premium: 'Premium',
        uploading: 'Uploading...',
        uploadSuccess: 'Video uploaded successfully!',
        uploadError: 'Error uploading video',
        selectThumbnail: 'Select Thumbnail',
        thumbnailPreview: 'Thumbnail Preview',
        fileSelected: 'File selected:',
        removeFile: 'Remove',

        // Users Page Translates
        manageUsersDesc: 'Manage platform users and subscriptions',
        role: 'Role',
        joined: 'Joined',
        noUsersFound: 'No users found matching',
        removePremium: 'Remove Premium',
        makePremium: 'Make Premium',
        freePlan: 'Free Plan',
        premiumPlan: 'Premium',

        // Courses Settings Page Translates
        coursesSettingsTitle: 'Courses Settings',
        manageCoursesDesc: 'Manage and organize your course content',
        noImage: 'No Image',
        startUploading: 'No courses available. Start by uploading one.',
        published: 'Published',
        hidden: 'Hidden',
        hideCourse: 'Hide Course',
        showCourse: 'Show Course',
        deleteCourseConfirm: 'Are you sure you want to delete this course?',

        // Settings Page Translates
        platformSettings: 'Platform Settings',
        settingsDesc: 'Configure general system preferences',
        general: 'General',
        platformName: 'Platform Name',
        platformNameDesc: 'This name will appear in the page title and emails.',
        themePreference: 'Theme Preference',
        current: 'Current',
        switchTheme: 'Switch Theme',
        systemLanguage: 'System Language',
        switchLanguage: 'Switch Language',
        accessControl: 'Access Control',
        adminOnly: 'Admin Only',
        maintenanceMode: 'Maintenance Mode',
        maintenanceModeDesc: 'Disable access for all non-admin users',
        allowSignups: 'Allow New Signups',
        allowSignupsDesc: 'Enable or disable new user registration',
        saveChanges: 'Save Changes',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        english: 'English',
        arabic: 'Arabic',

        // News Page Translates
        news: 'News',
        newsManagement: 'News Management',
        newsManagementDesc: 'Create, edit, and manage platform news',
        addNews: 'Add News',
        editNews: 'Edit News',
        deleteNews: 'Delete News',
        newsTitle: 'Title',
        newsDescription: 'Description',
        newsMedia: 'Media (Optional)',
        newsImage: 'Image',
        newsVideo: 'Video',
        uploadMedia: 'Click to upload image or video',
        uploadMediaDesc: 'PNG, JPG, MP4 (Max 50MB)',
        updateNews: 'Update News',
        newsAdded: 'News added successfully!',
        newsUpdated: 'News updated successfully!',
        newsDeleted: 'News deleted successfully',
        deleteNewsConfirm: 'Are you sure you want to delete this news?',
        noNewsYet: 'No news yet. Click "Add News" to create your first news item.',
        latestNews: 'Latest News',
        newsSubtitle: 'Stay updated with the latest announcements and platform updates',
        noNewsAvailable: 'No News Yet',
        checkBackLater: 'Check back later for platform updates and announcements',
        lastUpdated: 'Last updated',
        titleRequired: 'Title and description are required!',

        // Telegram
        joinTelegram: 'Join our Telegram Channel',
        scanQrCode: 'Scan QR Code or click the button below',
        goToChannel: 'Go to Channel',
    },
    ar: {
        // Navbar
        adminDashboard: 'لوحة الإدارة',
        courses: 'الدورات',
        logout: 'تسجيل الخروج',
        uploadCourse: 'رفع دورة',
        usersManagement: 'المستخدمين',
        profile: 'الملف الشخصي',

        // Login Page
        welcomeBack: 'مرحباً بعودتك',
        signInToAccount: 'سجل الدخول إلى حساب KMT Trade',
        emailAddress: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        secureLogin: 'تسجيل دخول آمن',
        authenticating: 'جارٍ المصادقة...',
        dontHaveAccount: 'ليس لديك حساب؟',
        signUp: 'إنشاء حساب',
        secureTrading: 'منصة تداول آمنة',
        copyright: '© 2026 KMT Trade. جميع الحقوق محفوظة.',

        // Signup Page
        createAccount: 'إنشاء حساب',
        joinKMT: 'انضم إلى KMT Trade وابدأ رحلة التداول',
        fullName: 'الاسم الكامل',
        confirmPassword: 'تأكيد كلمة المرور',
        creatingAccount: 'جارٍ إنشاء الحساب...',
        alreadyHaveAccount: 'لديك حساب بالفعل؟',
        signIn: 'تسجيل الدخول',

        // Landing Page
        professionalTrading: 'تعليم التداول الاحترافي - KMT Trade',
        masterMarkets: 'إتقان الأسواق',
        withConfidence: 'بثقة',
        tradingDescription: 'تعليم تداول احترافي مصمم للمستثمرين الجادين. افتح استراتيجيات متميزة وتحليلات مباشرة وإرشاد من الخبراء.',
        startLearning: 'ابدأ التعلم الآن',
        viewCourses: 'عرض الدورات',
        students: 'طالب',
        certifiedMentors: 'مرشدون معتمدون',

        // Courses Page
        tradingCourses: 'دورات التداول',
        courseDescription: 'استكشف منهجنا الشامل المصمم لجميع المستويات.',
        lessons: 'دروس',
        waitlist: 'قائمة الانتظار',
        startCourse: 'ابدأ الدورة',

        // Video Player
        premiumContent: 'محتوى مميز',
        premiumDescription: 'هذا الدرس مخصص لأعضائنا المميزين. افتح الوصول الكامل لترفع مستوى التداول الخاص بك.',
        subscribeToUnlock: 'اشترك للفتح',
        courseContent: 'محتوى الدورة',

        // Admin Dashboard
        adminDashboardTitle: 'لوحة الإدارة',
        totalUsers: 'إجمالي المستخدمين',
        premiumMembers: 'الأعضاء المميزون',
        totalContent: 'إجمالي المحتوى',
        revenue: 'الإيرادات (تقديري)',
        userManagement: 'إدارة المستخدمين',
        manageAccess: 'إدارة حقوق الوصول',
        user: 'المستخدم',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        status: 'الحالة',
        actions: 'الإجراءات',
        admin: 'مدير',
        normal: 'عادي',
        premium: 'مميز',
        activatePremium: 'تفعيل المميز',
        deactivatePremium: 'إلغاء المميز',
        quickAccess: 'الوصول السريع',
        usersDesc: 'إدارة المستخدمين والأدوار والاشتراكات',
        coursesDesc: 'إدارة محتوى الدورة والظهور',
        uploadDesc: 'تحميل دروس فيديو جديدة',
        newsDesc: 'نشر الأخبار والإعلانات',
        settingsDesc: 'تكوي إعدادات المنصة',
        goToPage: 'الذهاب للصفحة',

        // Dashboard Stats & Charts
        overview: 'نظرة عامة على النظام',
        userDistribution: 'توزيع المستخدمين',
        revenueTrends: 'اتجاهات الإيرادات',
        contentPerformance: 'أداء المحتوى',
        premiumUsers: 'مستخدمين مميزين',
        freeUsers: 'مستخدمين مجانيين',
        admins: 'مستخدمين إداريين',
        monthlyGrowth: 'النمو الشهري',
        last30Days: 'آخر 30 يوم',
        totalViews: 'إجمالي المشاهدات',
        engagement: 'المشاركة',
        // courses: 'دورات', -> Removed duplicate

        // Upload Course Page (Arabic)
        uploadCoursePageTitle: 'رفع فيديو الدورة',
        courseDetails: 'تفاصل الدورة',
        videoDetails: 'تفاصيل الفيديو',
        accessSettings: 'إعدادات الوصول',
        videoTitle: 'عنوان الفيديو',
        videoDescription: 'وصف الفيديو',
        dragDropVideo: 'اسحب وأفلت الفيديو هنا',
        orBrowse: 'أو تصفح للرفع',
        videoDuration: 'المدة (دقيقة:ثانية)',
        videoType: 'نوع الفيديو',
        free: 'مجاني',
        // premium: 'مميز (مدفوع)', -> duplicate key
        uploading: 'جارٍ الرفع...',
        uploadSuccess: 'تم رفع الفيديو بنجاح!',
        uploadError: 'خطأ في رفع الفيديو',
        selectThumbnail: 'اختر صورة مصغرة',
        thumbnailPreview: 'معاينة الصورة المصغرة',
        fileSelected: 'تم اختيار الملف:',
        removeFile: 'إزالة',
        settings: 'الإعدادات',

        // Users Page Translates
        manageUsersDesc: 'إدارة مستخدمي المنصة والاشتراكات',
        joined: 'تاريخ الانضمام',
        noUsersFound: 'لم يتم العثور على مستخدمين يطابقون',
        removePremium: 'إلغاء المميز',
        makePremium: 'ترقية لمميز',
        freePlan: 'خطة مجانية',
        premiumPlan: 'خطة مميزة',

        // Courses Settings Page Translates
        coursesSettingsTitle: 'إعدادات الدورات',
        manageCoursesDesc: 'إدارة وتنظيم محتوى الدورات التدريبية',
        addNewCourse: 'إضافة دورة جديدة',
        edit: 'تعديل',
        noImage: 'لا توجد صورة',
        startUploading: 'لا توجد دورات متاحة. ابدأ برفع واحدة.',
        published: 'منشور',
        hidden: 'مخفي',
        hideCourse: 'إخفاء الدورة',
        showCourse: 'إظهار الدورة',
        deleteCourseConfirm: 'هل أنت متأكد أنك تريد حذف هذه الدورة؟',

        // Settings Page Translates
        platformSettings: 'إعدادات المنصة',
        settingsDesc: 'تكوين تفضيلات النظام العامة',
        general: 'عام',
        platformName: 'اسم المنصة',
        platformNameDesc: 'سيظهر هذا الاسم في عنوان الصفحة والرسائل.',
        themePreference: 'تفضيلات المظهر',
        current: 'الحالي',
        switchTheme: 'تبديل المظهر',
        systemLanguage: 'لغة النظام',
        switchLanguage: 'تبديل اللغة',
        accessControl: 'التحكم في الوصول',
        adminOnly: 'للمسؤولين فقط',
        maintenanceMode: 'وضع الصيانة',
        maintenanceModeDesc: 'تعطيل الوصول لجميع المستخدمين غير المسؤولين',
        allowSignups: 'السماح بالتسجيلات الجديدة',
        allowSignupsDesc: 'تمكين أو تعطيل تسجيل المستخدمين الجدد',
        saveChanges: 'حفظ التغييرات',
        lightMode: 'وضع فاتح',
        darkMode: 'وضع داكن',
        english: 'إنجليزي',
        arabic: 'عربي',

        // News Page Translates
        news: 'الأخبار',
        newsManagement: 'إدارة الأخبار',
        newsManagementDesc: 'إنشاء وتحرير وإدارة أخبار المنصة',
        addNews: 'إضافة خبر',
        editNews: 'تعديل الخبر',
        deleteNews: 'حذف الخبر',
        newsTitle: 'العنوان',
        newsDescription: 'الوصف',
        newsMedia: 'وسائط (اختياري)',
        newsImage: 'صورة',
        newsVideo: 'فيديو',
        uploadMedia: 'انقر لتحميل صورة أو فيديو',
        uploadMediaDesc: 'PNG، JPG، MP4 (الحد الأقصى 50 ميجابايت)',
        updateNews: 'تحديث الخبر',
        newsAdded: 'تمت إضافة الخبر بنجاح!',
        newsUpdated: 'تم تحديث الخبر بنجاح!',
        newsDeleted: 'تم حذف الخبر بنجاح',
        deleteNewsConfirm: 'هل أنت متأكد أنك تريد حذف هذا الخبر؟',
        noNewsYet: 'لا توجد أخبار حتى الآن. انقر على "إضافة خبر" لإنشاء أول خبر.',
        latestNews: 'آخر الأخبار',
        newsSubtitle: 'ابق على اطلاع بآخر الإعلانات وتحديثات المنصة',
        noNewsAvailable: 'لا توجد أخبار حتى الآن',
        checkBackLater: 'تحقق مرة أخرى لاحقًا للحصول على تحديثات وإعلانات المنصة',
        lastUpdated: 'آخر تحديث',
        titleRequired: 'العنوان والوصف مطلوبان!',

        // Telegram
        joinTelegram: 'انضم إلى قناة التليجرام',
        scanQrCode: 'امسح الرمز أو انقر على الزر أدناه',
        goToChannel: 'الذهاب للقناة',
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('kmt_language') || 'en';
        setLanguage(savedLang);
        applyDirection(savedLang);
    }, []);

    const applyDirection = (lang) => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        localStorage.setItem('kmt_language', newLang);
        applyDirection(newLang);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
