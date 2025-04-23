
import React from "react";
import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, FileText } from "lucide-react";

// Import submodules
import StudentProgressReport from "./StudentProgressReport";
import AttendanceReport from "./AttendanceReport";
import AssignmentPerformanceReport from "./AssignmentPerformanceReport";

const ReportsPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            View and download detailed analytics reports
          </p>
        </div>
      </div>

      <Card>
        <Tabs 
          defaultValue="student-progress" 
          value={currentTab === "reports" ? "student-progress" : currentTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full bg-muted/50 p-1">
            <TabsTrigger value="student-progress" asChild>
              <NavLink to="/dashboard/admin/reports/student-progress" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Student Progress</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="attendance" asChild>
              <NavLink to="/dashboard/admin/reports/attendance" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Attendance Report</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="assignment-performance" asChild>
              <NavLink to="/dashboard/admin/reports/assignment-performance" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Assignment Performance</span>
              </NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <Routes>
        <Route index element={<Navigate to="student-progress" replace />} />
        <Route path="student-progress" element={<StudentProgressReport />} />
        <Route path="attendance" element={<AttendanceReport />} />
        <Route path="assignment-performance" element={<AssignmentPerformanceReport />} />
      </Routes>
    </div>
  );
};

export default ReportsPage;
