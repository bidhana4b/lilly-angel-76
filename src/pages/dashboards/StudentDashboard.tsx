
import React from "react";
import TodaysClassCard from "./student/StudentDashboard/TodaysClassCard";
import CoursesCard from "./student/StudentDashboard/CoursesCard";
import AssignmentsCard from "./student/StudentDashboard/AssignmentsCard";
import PaymentsCard from "./student/StudentDashboard/PaymentsCard";
import NotificationsCard from "./student/StudentDashboard/NotificationsCard";
import QuickActionsCard from "./student/StudentDashboard/QuickActionsCard";
import RecordingsCard from "./student/StudentDashboard/RecordingsCard";

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="dashboard-welcome">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your learning journey.
        </p>
      </div>

      <TodaysClassCard />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CoursesCard />
        <AssignmentsCard />
        <PaymentsCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NotificationsCard />
        <QuickActionsCard />
      </div>

      <RecordingsCard />
    </div>
  );
};

export default StudentDashboard;
