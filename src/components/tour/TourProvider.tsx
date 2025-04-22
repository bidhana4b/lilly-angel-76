
import React, { createContext, useContext, useState, useEffect } from "react";
import Joyride, { CallBackProps, Status, Step } from "react-joyride";
import { useAuth } from "@/contexts/AuthContext";

// Define the Tour context type
interface TourContextType {
  startTour: () => void;
  endTour: () => void;
  resetTour: () => void;
}

// Create the Tour context
const TourContext = createContext<TourContextType | undefined>(undefined);

// Define props for the TourProvider
interface TourProviderProps {
  children: React.ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  
  // Set different tour steps based on user role
  useEffect(() => {
    if (!user) return;
    
    const roleBasedSteps = getTourStepsForRole(user.role);
    setSteps(roleBasedSteps);
    
    // Check if the user has already seen the tour
    const tourCompleted = localStorage.getItem(`tour-completed-${user.role}`);
    
    // Show tour automatically on first login if not completed
    if (!tourCompleted) {
      setRun(true);
    }
  }, [user]);
  
  // Handle tour callbacks
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    // When tour is finished or skipped
    if ([Status.FINISHED, Status.SKIPPED].includes(status)) {
      setRun(false);
      // Mark the tour as completed for this role
      if (user) {
        localStorage.setItem(`tour-completed-${user.role}`, "true");
      }
    }
  };
  
  // Methods to control the tour
  const startTour = () => setRun(true);
  const endTour = () => setRun(false);
  const resetTour = () => {
    if (user) {
      localStorage.removeItem(`tour-completed-${user.role}`);
      setRun(true);
    }
  };
  
  return (
    <TourContext.Provider value={{ startTour, endTour, resetTour }}>
      {user && steps.length > 0 && (
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: "#7c3aed", // Using purple primary color
              zIndex: 10000,
            },
            tooltipContainer: {
              textAlign: "left",
            },
            buttonNext: {
              backgroundColor: "#7c3aed",
            },
            buttonBack: {
              marginRight: 10,
            },
          }}
          locale={{
            last: "Finish",
            skip: "Skip tour",
          }}
        />
      )}
      {children}
    </TourContext.Provider>
  );
};

// Custom hook to use the Tour context
export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};

// Define tour steps based on user role
const getTourStepsForRole = (role: string): Step[] => {
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
