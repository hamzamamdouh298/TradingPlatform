import React, { createContext, useContext, useState, useEffect } from 'react';

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
    },
    {
        id: 'u2',
        name: 'Student User',
        email: USER_CREDENTIALS.email,
        role: 'user',
        isPremium: false, // Default to false
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
                    // Find the FRESH user data from allUsers to get current premium status
                    const targetUser = allUsers.find(u => u.email === email);
                    if (targetUser) {
                        setUser(targetUser);
                        localStorage.setItem('trading_platform_session', JSON.stringify(targetUser));
                        resolve(targetUser);
                        return;
                    }
                }

                reject('Invalid email or password');
            }, 1000); // Fake delay
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('trading_platform_session');
    };

    const signup = (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check if email already exists
                const existingUser = allUsers.find(u => u.email === email);
                if (existingUser) {
                    reject('Email already registered');
                    return;
                }

                // Create new user
                const newUser = {
                    id: `u${Date.now()}`,
                    name,
                    email,
                    password, // In production, this should be hashed
                    role: 'user',
                    isPremium: false,
                };

                const updatedUsers = [...allUsers, newUser];
                setAllUsers(updatedUsers);
                localStorage.setItem('trading_platform_users', JSON.stringify(updatedUsers));

                // Auto login after signup
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

        // If updating current user/admin
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

        // If updating current user
        if (user && user.id === userId) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('trading_platform_session', JSON.stringify(updatedUser));
        }
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
            updateUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
