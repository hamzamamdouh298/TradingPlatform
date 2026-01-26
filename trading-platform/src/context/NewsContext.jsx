import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load news from localStorage
        const storedNews = localStorage.getItem('kmt_news');
        if (storedNews) {
            setNews(JSON.parse(storedNews));
        } else {
            // Initialize with sample news
            const sampleNews = [
                {
                    id: 1,
                    title: 'Welcome to KMT Trade Platform',
                    description: 'We are excited to announce the launch of our new trading platform. Start learning and trading with confidence!',
                    image: null,
                    video: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ];
            setNews(sampleNews);
            localStorage.setItem('kmt_news', JSON.stringify(sampleNews));
        }
        setLoading(false);
    }, []);

    const addNews = (newsData) => {
        const newNewsItem = {
            ...newsData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const updatedNews = [newNewsItem, ...news]; // Add to beginning
        setNews(updatedNews);
        localStorage.setItem('kmt_news', JSON.stringify(updatedNews));
        return newNewsItem;
    };

    const updateNews = (newsId, updates) => {
        const updatedNews = news.map(item =>
            item.id === newsId
                ? { ...item, ...updates, updatedAt: new Date().toISOString() }
                : item
        );
        setNews(updatedNews);
        localStorage.setItem('kmt_news', JSON.stringify(updatedNews));
    };

    const deleteNews = (newsId) => {
        const updatedNews = news.filter(item => item.id !== newsId);
        setNews(updatedNews);
        localStorage.setItem('kmt_news', JSON.stringify(updatedNews));
    };

    return (
        <NewsContext.Provider
            value={{
                news,
                loading,
                addNews,
                updateNews,
                deleteNews,
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => useContext(NewsContext);
