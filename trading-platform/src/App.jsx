import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import { LandingPage } from './pages/LandingPage';
import { CoursesPage } from './pages/CoursesPage';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { UploadCoursePage } from './pages/admin/UploadCoursePage';
import { UsersPage } from './pages/admin/UsersPage';
import { CoursesSettingsPage } from './pages/admin/CoursesSettingsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { NewsPage } from './pages/admin/NewsPage';
import { UserNewsPage } from './pages/UserNewsPage';

import { CoursesProvider } from './context/CoursesContext';
import { NewsProvider } from './context/NewsContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CoursesProvider>
          <NewsProvider>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />

                  <Route path="/" element={
                    <ProtectedRoute>
                      <LandingPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/courses" element={
                    <ProtectedRoute>
                      <CoursesPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/course/:courseId" element={
                    <ProtectedRoute>
                      <VideoPlayerPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/news" element={
                    <ProtectedRoute>
                      <UserNewsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/upload-course" element={
                    <ProtectedRoute requiredRole="admin">
                      <UploadCoursePage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="admin">
                      <UsersPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/courses-settings" element={
                    <ProtectedRoute requiredRole="admin">
                      <CoursesSettingsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/news" element={
                    <ProtectedRoute requiredRole="admin">
                      <NewsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/settings" element={
                    <ProtectedRoute requiredRole="admin">
                      <SettingsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin/profile" element={
                    <ProtectedRoute requiredRole="admin">
                      <ProfilePage />
                    </ProtectedRoute>
                  } />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AuthProvider>
            </Router>
          </NewsProvider>
        </CoursesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
