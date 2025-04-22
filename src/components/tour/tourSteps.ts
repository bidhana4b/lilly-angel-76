
import { Step } from "react-joyride";

export const getTourStepsForRole = (role: string): Step[] => {
  switch (role) {
    case "admin":
      return [
        {
          target: ".dashboard-welcome",
          content: "Welcome to the Admin Dashboard! This is your control center for managing the entire learning platform.",
          placement: "center",
          disableBeacon: true,
          title: "Admin Dashboard",
        },
        {
          target: ".admin-stats",
          content: "These cards show you key metrics about your platform - students, teachers, courses and revenue.",
          title: "Platform Statistics",
        },
        {
          target: ".admin-sidebar",
          content: "Use this sidebar to navigate through different sections of the admin dashboard.",
          title: "Navigation Menu",
        },
        {
          target: "[href='/dashboard/admin/teachers']",
          content: "Manage your teaching staff, add new teachers, and update their information.",
          title: "Teacher Management",
        },
        {
          target: "[href='/dashboard/admin/students']",
          content: "View and manage student enrollments, progress, and account details.",
          title: "Student Management",
        },
        {
          target: "[href='/dashboard/admin/courses']",
          content: "Create, update or remove courses from your platform's offerings.",
          title: "Course Management",
        },
      ];
    
    case "teacher":
      return [
        {
          target: ".dashboard-welcome",
          content: "Welcome to your Teacher Dashboard! Here you can manage your classes and students.",
          placement: "center",
          disableBeacon: true,
          title: "Teacher Dashboard",
        },
        {
          target: ".teacher-stats",
          content: "These cards show important information about your courses, students, and teaching activities.",
          title: "Your Statistics",
        },
        {
          target: ".teacher-classes",
          content: "View your upcoming classes and prepare for your sessions.",
          title: "Upcoming Classes",
        },
        {
          target: ".teacher-submissions",
          content: "Check assignments that need your review and grading.",
          title: "Pending Submissions",
        },
        {
          target: ".teacher-sidebar",
          content: "Navigate through different sections using this sidebar menu.",
          title: "Navigation Menu",
        },
      ];
    
    case "student":
      return [
        {
          target: ".dashboard-welcome",
          content: "Welcome to your Student Dashboard! This is where you can track your learning journey.",
          placement: "center",
          disableBeacon: true,
          title: "Student Dashboard",
        },
        {
          target: ".student-class",
          content: "This shows your next scheduled class. Make sure to join on time!",
          title: "Today's Class",
        },
        {
          target: ".student-courses",
          content: "Track your progress in all enrolled courses here.",
          title: "My Courses",
        },
        {
          target: ".student-assignments",
          content: "Keep track of your assignments and due dates.",
          title: "Assignment Tracker",
        },
        {
          target: ".student-payments",
          content: "View your payment status and history.",
          title: "Payment Information",
        },
        {
          target: ".student-recordings",
          content: "Access recordings of previous classes you've attended.",
          title: "Class Recordings",
        },
        {
          target: ".student-sidebar",
          content: "Navigate your dashboard using this sidebar menu.",
          title: "Navigation Menu",
        },
      ];
    
    default:
      return [];
  }
};
