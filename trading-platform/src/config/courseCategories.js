/**
 * Centralized course category definitions.
 * IDs are used in course model and localStorage; labelKey for i18n.
 * No hardcoded labels in UI — use t(labelKey).
 */
export const COURSE_CATEGORY_IDS = {
    TRADING_PLATFORM: 'tradingPlatform',
    NEWS_COURSES: 'newsCourses',
    PAID_COURSES: 'paidCourses',
    PRAXIS: 'praxis',
};

export const COURSE_CATEGORIES_CONFIG = [
    { id: COURSE_CATEGORY_IDS.TRADING_PLATFORM, labelKey: 'categoryTradingPlatform', icon: 'BarChart2' },
    { id: COURSE_CATEGORY_IDS.NEWS_COURSES, labelKey: 'categoryNewsCourses', icon: 'Newspaper' },
    { id: COURSE_CATEGORY_IDS.PAID_COURSES, labelKey: 'categoryPaidCourses', icon: 'CreditCard' },
    { id: COURSE_CATEGORY_IDS.PRAXIS, labelKey: 'categoryPraxis', icon: 'Target' },
];

export const DEFAULT_COURSE_CATEGORY_ID = COURSE_CATEGORY_IDS.TRADING_PLATFORM;
