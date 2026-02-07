import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSE_CATEGORIES_CONFIG, DEFAULT_COURSE_CATEGORY_ID } from '../config/courseCategories';

const STORAGE_KEY = 'kmt_category_settings';

const CourseCategoriesContext = createContext();

const getDefaultSettings = () =>
    COURSE_CATEGORIES_CONFIG.map((c, i) => ({ id: c.id, enabled: true, order: i }));

const loadSettings = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return getDefaultSettings();
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) {}
    return getDefaultSettings();
};

const saveSettings = (settings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

export const CourseCategoriesProvider = ({ children }) => {
    const [settings, setSettings] = useState(getDefaultSettings);

    useEffect(() => {
        setSettings(loadSettings());
    }, []);

    const getCategories = () => {
        const byId = Object.fromEntries(COURSE_CATEGORIES_CONFIG.map((c) => [c.id, c]));
        return settings
            .filter((s) => s.enabled)
            .sort((a, b) => a.order - b.order)
            .map((s) => ({ ...byId[s.id], ...s }))
            .filter(Boolean);
    };

    const getAllCategoriesForAdmin = () => {
        const byId = Object.fromEntries(COURSE_CATEGORIES_CONFIG.map((c) => [c.id, c]));
        return settings
            .sort((a, b) => a.order - b.order)
            .map((s) => ({ ...byId[s.id], ...s }))
            .filter(Boolean);
    };

    const setCategoryEnabled = (categoryId, enabled) => {
        setSettings((prev) => {
            const next = prev.map((s) => (s.id === categoryId ? { ...s, enabled } : s));
            saveSettings(next);
            return next;
        });
    };

    const setCategoryOrder = (orderedIds) => {
        setSettings((prev) => {
            const byId = Object.fromEntries(prev.map((s) => [s.id, s]));
            const next = orderedIds.map((id, order) => (byId[id] ? { ...byId[id], order } : null)).filter(Boolean);
            const rest = prev.filter((s) => !orderedIds.includes(s.id)).map((s, i) => ({ ...s, order: orderedIds.length + i }));
            const merged = [...next, ...rest].map((s, i) => ({ ...s, order: i }));
            saveSettings(merged);
            return merged;
        });
    };

    const moveCategory = (categoryId, direction) => {
        setSettings((prev) => {
            const idx = prev.findIndex((s) => s.id === categoryId);
            if (idx < 0 || (direction === -1 && idx === 0) || (direction === 1 && idx === prev.length - 1)) return prev;
            const next = [...prev];
            const otherIdx = idx + direction;
            [next[idx], next[otherIdx]] = [next[otherIdx], next[idx]];
            const reordered = next.map((s, i) => ({ ...s, order: i }));
            saveSettings(reordered);
            return reordered;
        });
    };

    return (
        <CourseCategoriesContext.Provider
            value={{
                getCategories,
                getAllCategoriesForAdmin,
                setCategoryEnabled,
                setCategoryOrder,
                moveCategory,
                defaultCategoryId: DEFAULT_COURSE_CATEGORY_ID,
                config: COURSE_CATEGORIES_CONFIG,
            }}
        >
            {children}
        </CourseCategoriesContext.Provider>
    );
};

export const useCourseCategories = () => useContext(CourseCategoriesContext);
