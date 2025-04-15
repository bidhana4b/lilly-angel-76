
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AdminSidebar } from "./components/sidebars/AdminSidebar";
import { TeacherSidebar } from "./components/sidebars/TeacherSidebar";
import { StudentSidebar } from "./components/sidebars/StudentSidebar";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import About from "./pages/About";
import TeamPage from "./pages/TeamPage";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

// Dashboard pages
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<TeamPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route 
                path="/dashboard/admin/*" 
                element={
                  <DashboardLayout sidebarContent={<AdminSidebar />}>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="*" element={<div className="text-center py-10">Admin page not implemented yet</div>} />
                    </Routes>
                  </DashboardLayout>
                } 
              />
            </Route>
            
            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route 
                path="/dashboard/teacher/*" 
                element={
                  <DashboardLayout sidebarContent={<TeacherSidebar />}>
                    <Routes>
                      <Route path="/" element={<TeacherDashboard />} />
                      <Route path="*" element={<div className="text-center py-10">Teacher page not implemented yet</div>} />
                    </Routes>
                  </DashboardLayout>
                } 
              />
            </Route>
            
            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route 
                path="/dashboard/student/*" 
                element={
                  <DashboardLayout sidebarContent={<StudentSidebar />}>
                    <Routes>
                      <Route path="/" element={<StudentDashboard />} />
                      <Route path="*" element={<div className="text-center py-10">Student page not implemented yet</div>} />
                    </Routes>
                  </DashboardLayout>
                } 
              />
            </Route>
            
            {/* Redirect /dashboard to appropriate dashboard based on role (handled by ProtectedRoute) */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />
            
            {/* Catch All for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
