# KMT Trade - Admin Dashboard Extension Implementation Plan

## Status: IN PROGRESS

This document tracks the implementation of the comprehensive Admin Dashboard features.

## ✅ COMPLETED

1. **CoursesContext** (`src/context/CoursesContext.jsx`)
   - CRUD operations for courses
   - Course visibility toggle
   - Statistics tracking
   - localStorage persistence

2. **Language Translations** (`src/context/LanguageContext.jsx`)
   - Added 60+ new admin-related translations (English)
   - Categories: Sidebar, Course Management, User Management, Profile, Messages

3. **AdminSidebar Component** (`src/components/AdminSidebar.jsx`)
   - Navigation menu with icons
   - Active state indicators
   - Theme and RTL support

## 🚧 IN PROGRESS

4. **Admin Pages** (Need to create all 4 pages):
   - [ ] `src/pages/admin/AdminOverview.jsx` (rename current AdminDashboard)
   - [ ] `src/pages/admin/AdminCourses.jsx` (Course Management)
   - [ ] `src/pages/admin/AdminUsers.jsx` (User Management)
   - [ ] `src/pages/admin/AdminProfile.jsx` (Profile Page)

5. **Components** (Reusable modals and components):
   - [ ] `src/components/CourseUploadModal.jsx`
   - [ ] `src/components/CourseEditModal.jsx`
   - [ ] `src/components/DeleteConfirmationModal.jsx`

6. **Arabic Translations** (Need to add):
   - [ ] All 60+ admin translations in Arabic

7. **Routing** (Need to update):
   - [ ] Update `src/App.jsx` with new admin sub-routes
   - [ ] Wrap admin pages with AdminSidebar layout

## 📋 FEATURES TO IMPLEMENT

### Admin Courses Page
- [ ] Course cards grid with stats
- [ ] Add New Course button + modal
- [ ] Edit course functionality
- [ ] Delete course with confirmation
- [ ] Hide/Show course toggle
- [ ] Course statistics display
- [ ] Animated cards and modals

### Admin Users Page  
- [ ] Enhanced users table
- [ ] Search functionality
- [ ] Filter by status dropdown
- [ ] Activate/Deactivate accounts
- [ ] Delete user with confirmation modal
- [ ] User statistics

### Admin Profile Page
- [ ] Profile image upload/display
- [ ] Editable name and email
- [ ] Save changes with animation
- [ ] Success feedback

## 🎨 DESIGN REQUIREMENTS
- Maintain premium dashboard aesthetic
- Smooth animations with Framer Motion
- Glassmorphism cards
- Skeleton loaders
- Micro-interactions
- Theme-aware (dark/light)
- RTL support for Arabic

## 📁 FOLDER STRUCTURE
```
src/
├── pages/
│   └── admin/
│       ├── AdminOverview.jsx
│       ├── AdminCourses.jsx
│       ├── AdminUsers.jsx
│       └── AdminProfile.jsx
├── components/
│   ├── AdminSidebar.jsx ✅
│   ├── CourseUploadModal.jsx
│   ├── CourseEditModal.jsx
│   └── DeleteConfirmationModal.jsx
└── context/
    ├── CoursesContext.jsx ✅
    └── LanguageContext.jsx ✅ (partial)
```

## NEXT STEPS
1. Create admin pages folder structure
2. Build AdminCourses page with full CRUD
3. Build AdminUsers page with enhanced table
4. Build AdminProfile page
5. Create reusable modal components
6. Add Arabic translations
7. Update App.jsx routing
8. Test all features
