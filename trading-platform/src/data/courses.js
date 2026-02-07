export const COURSES = [
    {
        id: 1,
        categoryId: 'tradingPlatform',
        title: 'Trading Fundamentals',
        description: 'Master the basics of stock and forex trading.',
        thumbnail: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=1000&auto=format&fit=crop',
        level: 'Beginner',
        totalLessons: 5,
        lessons: [
            { id: 101, title: 'Introduction to Markets', type: 'free', duration: '10:00' },
            { id: 102, title: 'Understanding Candlesticks', type: 'free', duration: '15:30' },
            { id: 103, title: 'Risk Management 101', type: 'premium', duration: '20:00' },
            { id: 104, title: 'Support & Resistance', type: 'premium', duration: '25:00' },
            { id: 105, title: 'Your First Trade', type: 'premium', duration: '12:00' },
        ]
    },
    {
        id: 2,
        categoryId: 'tradingPlatform',
        title: 'Advanced Technical Analysis',
        description: 'Deep dive into chart patterns and indicators.',
        thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop',
        level: 'Professional',
        totalLessons: 4,
        lessons: [
            { id: 201, title: 'Fibonacci Retracement', type: 'free', duration: '18:00' },
            { id: 202, title: 'Elliott Wave Theory', type: 'premium', duration: '30:00' },
            { id: 203, title: 'Wyckoff Method', type: 'premium', duration: '45:00' },
            { id: 204, title: 'Order Flow Analysis', type: 'premium', duration: '22:00' },
        ]
    },
    {
        id: 3,
        categoryId: 'newsCourses',
        title: 'Crypto Trading Mystery',
        description: 'Unlocking the secrets of the blockchain markets.',
        thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop',
        level: 'Intermediate',
        totalLessons: 3,
        lessons: [
            { id: 301, title: 'Blockchain Basics', type: 'free', duration: '12:00' },
            { id: 302, title: 'DeFi Trading Strategies', type: 'premium', duration: '28:00' },
            { id: 303, title: 'NFT Flipping', type: 'premium', duration: '15:00' },
        ]
    }
];
