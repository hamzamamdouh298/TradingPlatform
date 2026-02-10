import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY_HERO_VIDEO = 'kmt_hero_video_url';
const STORAGE_KEY_HERO_TITLE = 'kmt_hero_title';
const STORAGE_KEY_HERO_DESC = 'kmt_hero_desc';

const DEFAULT_HERO_VIDEO_URL = 'https://youtu.be/YPPMM-i5ebU';
const DEFAULT_HERO_TITLE = 'Master the Markets With Confidence';
const DEFAULT_HERO_DESC =
    'Professional trading education designed for serious investors. Unlock premium strategies, live analysis, and expert mentorship.';

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
    const [heroVideoUrl, setHeroVideoUrlState] = useState(DEFAULT_HERO_VIDEO_URL);
    const [heroTitle, setHeroTitleState] = useState(DEFAULT_HERO_TITLE);
    const [heroDescription, setHeroDescriptionState] = useState(DEFAULT_HERO_DESC);

    useEffect(() => {
        const savedVideo = localStorage.getItem(STORAGE_KEY_HERO_VIDEO);
        if (savedVideo && savedVideo.trim()) setHeroVideoUrlState(savedVideo.trim());

        const savedTitle = localStorage.getItem(STORAGE_KEY_HERO_TITLE);
        if (savedTitle && savedTitle.trim()) setHeroTitleState(savedTitle.trim());

        const savedDesc = localStorage.getItem(STORAGE_KEY_HERO_DESC);
        if (savedDesc && savedDesc.trim()) setHeroDescriptionState(savedDesc.trim());
    }, []);

    const setHeroVideoUrl = (url) => {
        const value = (url && url.trim()) || DEFAULT_HERO_VIDEO_URL;
        setHeroVideoUrlState(value);
        localStorage.setItem(STORAGE_KEY_HERO_VIDEO, value);
    };

    const setHeroTitle = (title) => {
        const value = (title && title.trim()) || DEFAULT_HERO_TITLE;
        setHeroTitleState(value);
        localStorage.setItem(STORAGE_KEY_HERO_TITLE, value);
    };

    const setHeroDescription = (desc) => {
        const value = (desc && desc.trim()) || DEFAULT_HERO_DESC;
        setHeroDescriptionState(value);
        localStorage.setItem(STORAGE_KEY_HERO_DESC, value);
    };

    return (
        <SiteSettingsContext.Provider
            value={{
                heroVideoUrl,
                setHeroVideoUrl,
                defaultHeroVideoUrl: DEFAULT_HERO_VIDEO_URL,
                heroTitle,
                heroDescription,
                setHeroTitle,
                setHeroDescription,
                defaultHeroTitle: DEFAULT_HERO_TITLE,
                defaultHeroDescription: DEFAULT_HERO_DESC,
            }}
        >
            {children}
        </SiteSettingsContext.Provider>
    );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
