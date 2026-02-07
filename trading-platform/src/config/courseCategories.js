/**
 * Centralized course category definitions.
 * IDs are used in course model and localStorage; labelKey for i18n.
 * No hardcoded labels in UI — use t(labelKey).
 */
export const COURSE_CATEGORY_IDS = {
    TRADING_PLATFORM: 'tradingPlatform',
    NEWS_COURSES: 'newsCourses',
};

export const COURSE_CATEGORIES_CONFIG = [
    { id: COURSE_CATEGORY_IDS.TRADING_PLATFORM, labelKey: 'categoryTradingPlatform', icon: 'BarChart2' },
    { id: COURSE_CATEGORY_IDS.NEWS_COURSES, labelKey: 'categoryNewsCourses', icon: 'Newspaper' },
];

export const DEFAULT_COURSE_CATEGORY_ID = COURSE_CATEGORY_IDS.TRADING_PLATFORM;
