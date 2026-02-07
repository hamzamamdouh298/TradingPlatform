import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/courses';
import { DEFAULT_COURSE_CATEGORY_ID } from '../config/courseCategories';

const CoursesContext = createContext();

const ensureCategoryId = (course) => ({
    ...course,
    categoryId: course.categoryId || DEFAULT_COURSE_CATEGORY_ID,
});

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCourses = localStorage.getItem('kmt_courses');
        if (storedCourses) {
            const parsed = JSON.parse(storedCourses);
            const migrated = parsed.map(ensureCategoryId);
            setCourses(migrated);
            if (migrated.some((c, i) => !parsed[i].categoryId)) {
                localStorage.setItem('kmt_courses', JSON.stringify(migrated));
            }
        } else {
            const coursesWithStats = COURSES.map((course) => ({
                ...course,
                categoryId: course.categoryId || DEFAULT_COURSE_CATEGORY_ID,
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
            categoryId: courseData.categoryId || DEFAULT_COURSE_CATEGORY_ID,
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
        return courses.filter((course) => course.isVisible);
    };

    const getVisibleCoursesByCategory = (categoryId) => {
        return courses.filter((c) => c.isVisible && c.categoryId === categoryId);
    };

    const getCourseCountByCategory = () => {
        const counts = {};
        courses.forEach((c) => {
            const id = c.categoryId || DEFAULT_COURSE_CATEGORY_ID;
            counts[id] = (counts[id] || 0) + 1;
        });
        return counts;
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
                getVisibleCoursesByCategory,
                getCourseCountByCategory,
            }}
        >
            {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = () => useContext(CoursesContext);
