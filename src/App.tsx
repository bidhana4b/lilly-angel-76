
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import Career from "@/pages/Career";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import TeamPage from "@/pages/TeamPage";
import SocialResponsibility from "@/pages/SocialResponsibility";
import TutorsPage from "@/pages/TutorsPage";
import Faq from "@/pages/Faq";

// Admin Dashboard
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import TeacherDashboard from "@/pages/dashboards/TeacherDashboard";
import StudentDashboard from "@/pages/dashboards/StudentDashboard";

// Admin Pages
import NotificationsPage from "@/pages/dashboards/admin/notifications/NotificationsPage";
import CreateNotificationPage from "@/pages/dashboards/admin/notifications/CreateNotificationPage";
import NotificationHistoryPage from "@/pages/dashboards/admin/notifications/NotificationHistoryPage";
import CoursesPage from "@/pages/dashboards/admin/courses/CoursesPage";
import CourseListPage from "@/pages/dashboards/admin/courses/CourseListPage";
import CourseForm from "@/pages/dashboards/admin/courses/CourseForm";
import PaymentsPage from "@/pages/dashboards/admin/payments/PaymentsPage";
import TransactionsPage from "@/pages/dashboards/admin/payments/TransactionsPage";
import DueListPage from "@/pages/dashboards/admin/payments/DueListPage";
import PaymentGatewayPage from "@/pages/dashboards/admin/payments/PaymentGatewayPage";
import ReportsPage from "@/pages/dashboards/admin/reports/ReportsPage";
import StudentProgressReport from "@/pages/dashboards/admin/reports/StudentProgressReport";
import AttendanceReport from "@/pages/dashboards/admin/reports/AttendanceReport";
import AssignmentPerformanceReport from "@/pages/dashboards/admin/reports/AssignmentPerformanceReport";
import SettingsPage from "@/pages/dashboards/admin/settings/SettingsPage";
import GeneralSettingsPage from "@/pages/dashboards/admin/settings/GeneralSettingsPage";
import AdminRolesPage from "@/pages/dashboards/admin/settings/AdminRolesPage";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/career" element={<Career />} />
          <Route path="/login" element={<Login />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/social-responsibility" element={<SocialResponsibility />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="notifications" />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="notifications/create" element={<CreateNotificationPage />} />
            <Route path="notifications/history" element={<NotificationHistoryPage />} />

            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/list" element={<CourseListPage />} />
            <Route path="courses/create" element={<CourseForm />} />
            <Route path="courses/edit/:courseId" element={<CourseForm />} />

            <Route path="payments" element={<PaymentsPage />} />
            <Route path="payments/transactions" element={<TransactionsPage />} />
            <Route path="payments/duelist" element={<DueListPage />} />
            <Route path="payments/gateway" element={<PaymentGatewayPage />} />

            <Route path="reports" element={<ReportsPage />} />
            <Route path="reports/student-progress" element={<StudentProgressReport />} />
            <Route path="reports/attendance" element={<AttendanceReport />} />
            <Route path="reports/assignment-performance" element={<AssignmentPerformanceReport />} />

            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/general" element={<GeneralSettingsPage />} />
            <Route path="settings/admin-roles" element={<AdminRolesPage />} />
          </Route>

          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Route>

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
