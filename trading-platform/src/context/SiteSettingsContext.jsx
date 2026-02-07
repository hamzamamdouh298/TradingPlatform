import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY_HERO_VIDEO = 'kmt_hero_video_url';
const DEFAULT_HERO_VIDEO_URL = 'https://youtu.be/YPPMM-i5ebU';

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
    const [heroVideoUrl, setHeroVideoUrlState] = useState(DEFAULT_HERO_VIDEO_URL);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY_HERO_VIDEO);
        if (saved && saved.trim()) setHeroVideoUrlState(saved.trim());
    }, []);

    const setHeroVideoUrl = (url) => {
        const value = (url && url.trim()) || DEFAULT_HERO_VIDEO_URL;
        setHeroVideoUrlState(value);
        localStorage.setItem(STORAGE_KEY_HERO_VIDEO, value);
    };

    return (
        <SiteSettingsContext.Provider value={{ heroVideoUrl, setHeroVideoUrl, defaultHeroVideoUrl: DEFAULT_HERO_VIDEO_URL }}>
            {children}
        </SiteSettingsContext.Provider>
    );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
