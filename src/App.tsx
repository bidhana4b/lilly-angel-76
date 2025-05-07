
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { TourProvider } from "./components/tour/TourProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AdminSidebar } from "./components/sidebars/AdminSidebar";
import { TeacherSidebar } from "./components/sidebars/TeacherSidebar";
import { StudentSidebar } from "./components/sidebars/StudentSidebar";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import TeamPage from "./pages/TeamPage";
import Contact from "./pages/Contact";
import Career from "./pages/Career";
import SocialResponsibility from "./pages/SocialResponsibility";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

// Dashboard pages
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TeachersPage from "./pages/dashboards/admin/TeachersPage";
import StudentsPage from "./pages/dashboards/admin/StudentsPage";
import SyllabusPage from "./pages/dashboards/admin/SyllabusPage";
import CoursesPage from "./pages/dashboards/admin/courses/CoursesPage";
import SchedulePage from "./pages/dashboards/admin/SchedulePage";
import AssignmentPage from "./pages/dashboards/admin/AssignmentPage";

// Admin pages
import PaymentsPage from "./pages/dashboards/admin/payments/PaymentsPage";
import ReportsPage from "./pages/dashboards/admin/reports/ReportsPage";
import NotificationsPage from "./pages/dashboards/admin/notifications/NotificationsPage";
import SettingsPage from "./pages/dashboards/admin/settings/SettingsPage";

// Teacher pages
import TeacherCoursesPage from "./pages/dashboards/teacher/CoursesPage";
import TeacherSyllabusPage from "./pages/dashboards/teacher/SyllabusPage";
import TeacherLiveClassPage from "./pages/dashboards/teacher/LiveClassPage";
import TeacherAssignmentsPage from "./pages/dashboards/teacher/AssignmentsPage";
import TeacherSubmissionsPage from "./pages/dashboards/teacher/SubmissionsPage";
import TeacherStudentsPage from "./pages/dashboards/teacher/StudentsPage";
import TeacherNotificationsPage from "./pages/dashboards/teacher/NotificationsPage";
import TeacherSettingsPage from "./pages/dashboards/teacher/SettingsPage";

// Student pages
import StudentCoursesPage from "./pages/dashboards/student/StudentCoursesPage";
import StudentLiveClassPage from "./pages/dashboards/student/LiveClassPage";
import StudentSyllabusPage from "./pages/dashboards/student/SyllabusPage";
import StudentAssignmentsPage from "./pages/dashboards/student/AssignmentsPage";
import StudentPaymentsPage from "./pages/dashboards/student/PaymentsPage";
import StudentNotificationsPage from "./pages/dashboards/student/NotificationsPage";
import StudentSettingsPage from "./pages/dashboards/student/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TourProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/team" element={<TeamPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/career" element={<Career />} />
              <Route path="/social-responsibility" element={<SocialResponsibility />} />
              <Route path="/faq" element={<Faq />} />
              
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route 
                  path="/dashboard/admin" 
                  element={<DashboardLayout sidebarContent={<AdminSidebar />} />}
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="teachers" element={<TeachersPage />} />
                  <Route path="students" element={<StudentsPage />} />
                  <Route path="courses/*" element={<CoursesPage />} />
                  <Route path="syllabus" element={<SyllabusPage />} />
                  <Route path="schedule" element={<SchedulePage />} />
                  <Route path="assignments" element={<AssignmentPage />} />
                  
                  {/* New Routes */}
                  <Route path="payments/*" element={<PaymentsPage />} />
                  <Route path="reports/*" element={<ReportsPage />} />
                  <Route path="notifications/*" element={<NotificationsPage />} />
                  <Route path="settings/*" element={<SettingsPage />} />
                  
                  <Route path="*" element={<div className="text-center py-10">Admin page not implemented yet</div>} />
                </Route>
              </Route>
              
              {/* Teacher Routes */}
              <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
                <Route 
                  path="/dashboard/teacher" 
                  element={<DashboardLayout sidebarContent={<TeacherSidebar />} />}
                >
                  <Route index element={<TeacherDashboard />} />
                  <Route path="courses" element={<TeacherCoursesPage />} />
                  <Route path="syllabus" element={<TeacherSyllabusPage />} />
                  <Route path="live-class" element={<TeacherLiveClassPage />} />
                  <Route path="assignments/*" element={<TeacherAssignmentsPage />} />
                  <Route path="submissions" element={<TeacherSubmissionsPage />} />
                  <Route path="students" element={<TeacherStudentsPage />} />
                  <Route path="notifications" element={<TeacherNotificationsPage />} />
                  <Route path="settings" element={<TeacherSettingsPage />} />
                  
                  <Route path="*" element={<div className="text-center py-10">Teacher page not implemented yet</div>} />
                </Route>
              </Route>
              
              {/* Student Routes */}
              <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route 
                  path="/dashboard/student" 
                  element={<DashboardLayout sidebarContent={<StudentSidebar />} />}
                >
                  <Route index element={<StudentDashboard />} />
                  <Route path="courses" element={<StudentCoursesPage />} />
                  <Route path="live-class" element={<StudentLiveClassPage />} />
                  <Route path="syllabus" element={<StudentSyllabusPage />} />
                  <Route path="assignments" element={<StudentAssignmentsPage />} />
                  <Route path="payments" element={<StudentPaymentsPage />} />
                  <Route path="notifications" element={<StudentNotificationsPage />} />
                  <Route path="settings" element={<StudentSettingsPage />} />
                  
                  <Route path="*" element={<div className="text-center py-10">Student page not implemented yet</div>} />
                </Route>
              </Route>
              
              {/* Redirect /dashboard to appropriate dashboard based on role (handled by ProtectedRoute) */}
              <Route path="/dashboard" element={<Navigate to="/login" replace />} />
              
              {/* Catch All for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TourProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
