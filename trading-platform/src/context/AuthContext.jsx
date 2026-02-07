import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/courses';

const LEVELS = ['Beginner', 'Intermediate', 'Professional'];

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
    email: '1@mMahmoud22@gmail.com',
    password: '1@mhamza',
};

const USER_CREDENTIALS = {
    email: 'user22@gmail.com',
    password: 'user22',
};

// Initial mock database
const INITIAL_USERS = [
    {
        id: 'u1',
        name: 'Mahmoud Hamza (Admin)',
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        isPremium: true,
        currentLevel: 'Professional',
        completedVideos: [],
    },
    {
        id: 'u2',
        name: 'Student User',
        email: USER_CREDENTIALS.email,
        role: 'user',
        isPremium: false,
        currentLevel: 'Beginner',
        completedVideos: [],
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load users from local storage or init
        const storedUsers = localStorage.getItem('trading_platform_users');
        if (storedUsers) {
            setAllUsers(JSON.parse(storedUsers));
        } else {
            setAllUsers(INITIAL_USERS);
            localStorage.setItem('trading_platform_users', JSON.stringify(INITIAL_USERS));
        }

        // Check active session
        const session = localStorage.getItem('trading_platform_session');
        if (session) {
            setUser(JSON.parse(session));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check Admin
                if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                    const adminUser = allUsers.find(u => u.role === 'admin') || INITIAL_USERS[0];
                    setUser(adminUser);
                    localStorage.setItem('trading_platform_session', JSON.stringify(adminUser));
                    resolve(adminUser);
                    return;
                }

                // Check User
                if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
                    const targetUser = allUsers.find(u => u.email === email);
                    if (targetUser) {
                        setUser(targetUser);
                        localStorage.setItem('trading_platform_session', JSON.stringify(targetUser));
                        resolve(targetUser);
                        return;
                    }
                }

                reject('Invalid email or password');
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('trading_platform_session');
    };

    const signup = (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = allUsers.find(u => u.email === email);
                if (existingUser) {
                    reject('Email already registered');
                    return;
                }

                const newUser = {
                    id: `u${Date.now()}`,
                    name,
                    email,
                    password,
                    role: 'user',
                    isPremium: false,
                    currentLevel: 'Beginner',
                    completedVideos: [],
                };

                const updatedUsers = [...allUsers, newUser];
                setAllUsers(updatedUsers);
                localStorage.setItem('trading_platform_users', JSON.stringify(updatedUsers));

                setUser(newUser);
                localStorage.setItem('trading_platform_session', JSON.stringify(newUser));
                resolve(newUser);
            }, 1000);
        });
    };

    const updateUserStatus = (userId, isPremium) => {
        const updatedUsers = allUsers.map(u =>
            u.id === userId ? { ...u, isPremium } : u
        );
        setAllUsers(updatedUsers);
        localStorage.setItem('trading_platform_users', JSON.stringify(updatedUsers));

        if (user && user.id === userId) {
            const updatedUser = { ...user, isPremium };
            setUser(updatedUser);
            localStorage.setItem('trading_platform_session', JSON.stringify(updatedUser));
        }
    };

    const updateUserProfile = (userId, updates) => {
        const updatedUsers = allUsers.map(u =>
            u.id === userId ? { ...u, ...updates } : u
        );
        setAllUsers(updatedUsers);
        localStorage.setItem('trading_platform_users', JSON.stringify(updatedUsers));

        if (user && user.id === userId) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('trading_platform_session', JSON.stringify(updatedUser));
        }
    };

    const markVideoAsCompleted = (userId, videoId) => {
        const targetUser = allUsers.find(u => u.id === userId);
        if (!targetUser) return;

        if (targetUser.completedVideos?.includes(videoId)) return;

        const newCompletedVideos = [...(targetUser.completedVideos || []), videoId];

        let newLevel = targetUser.currentLevel || 'Beginner';
        const currentLevelIndex = LEVELS.indexOf(newLevel);

        if (currentLevelIndex < LEVELS.length - 1) {
            // Get live courses from localStorage or default
            const storedCourses = localStorage.getItem('kmt_courses');
            const liveCourses = storedCourses ? JSON.parse(storedCourses) : COURSES;

            const currentLevelCourses = liveCourses.filter(c => c.level === newLevel);
            let allLevelVideos = [];
            currentLevelCourses.forEach(c => {
                c.lessons?.forEach(l => allLevelVideos.push(l.id));
            });

            const allWatched = allLevelVideos.length > 0 && allLevelVideos.every(id => newCompletedVideos.includes(id));

            if (allWatched) {
                newLevel = LEVELS[currentLevelIndex + 1];
            }
        }

        const updatedUser = {
            ...targetUser,
            completedVideos: newCompletedVideos,
            currentLevel: newLevel
        };

        const updatedUsers = allUsers.map(u => u.id === userId ? updatedUser : u);
        setAllUsers(updatedUsers);
        localStorage.setItem('trading_platform_users', JSON.stringify(updatedUsers));

        if (user && user.id === userId) {
            setUser(updatedUser);
            localStorage.setItem('trading_platform_session', JSON.stringify(updatedUser));
        }

        return { leveledUp: newLevel !== targetUser.currentLevel, newLevel };
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            signup,
            allUsers,
            updateUserStatus,
            updateUserProfile,
            markVideoAsCompleted,
            LEVELS
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
