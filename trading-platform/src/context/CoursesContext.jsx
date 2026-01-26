import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/courses';

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load courses from localStorage or use default
        const storedCourses = localStorage.getItem('kmt_courses');
        if (storedCourses) {
            setCourses(JSON.parse(storedCourses));
        } else {
            // Add stats to default courses
            const coursesWithStats = COURSES.map(course => ({
                ...course,
                views: Math.floor(Math.random() * 1000) + 100,
                premiumViews: Math.floor(Math.random() * 500) + 50,
                isVisible: true,
                createdAt: new Date().toISOString(),
            }));
            setCourses(coursesWithStats);
            localStorage.setItem('kmt_courses', JSON.stringify(coursesWithStats));
        }
        setLoading(false);
    }, []);

    const addCourse = (courseData) => {
        const newCourse = {
            ...courseData,
            id: Date.now(),
            views: 0,
            premiumViews: 0,
            isVisible: true,
            createdAt: new Date().toISOString(),
        };
        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        localStorage.setItem('kmt_courses', JSON.stringify(updatedCourses));
        return newCourse;
    };

    const updateCourse = (courseId, updates) => {
        const updatedCourses = courses.map(course =>
            course.id === courseId ? { ...course, ...updates } : course
        );
        setCourses(updatedCourses);
        localStorage.setItem('kmt_courses', JSON.stringify(updatedCourses));
    };

    const deleteCourse = (courseId) => {
        const updatedCourses = courses.filter(course => course.id !== courseId);
        setCourses(updatedCourses);
        localStorage.setItem('kmt_courses', JSON.stringify(updatedCourses));
    };

    const toggleCourseVisibility = (courseId) => {
        const updatedCourses = courses.map(course =>
            course.id === courseId ? { ...course, isVisible: !course.isVisible } : course
        );
        setCourses(updatedCourses);
        localStorage.setItem('kmt_courses', JSON.stringify(updatedCourses));
    };

    const getVisibleCourses = () => {
        return courses.filter(course => course.isVisible);
    };

    return (
        <CoursesContext.Provider
            value={{
                courses,
                loading,
                addCourse,
                updateCourse,
                deleteCourse,
                toggleCourseVisibility,
                getVisibleCourses,
            }}
        >
            {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = () => useContext(CoursesContext);
