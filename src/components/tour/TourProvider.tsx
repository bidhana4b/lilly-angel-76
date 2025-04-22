
import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps } from "react-joyride";
import { useAuth } from "@/contexts/AuthContext";
import { getTourStepsForRole } from "./tourSteps";
import TourContext from "./TourContext";
import { TourProviderProps } from "./types";
import { Step } from "react-joyride";

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  
  useEffect(() => {
    if (!user) return;
    
    const roleBasedSteps = getTourStepsForRole(user.role);
    setSteps(roleBasedSteps);
    
    const tourCompleted = localStorage.getItem(`tour-completed-${user.role}`);
    
    if (!tourCompleted) {
      setRun(true);
    }
  }, [user]);
  
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (["finished", "skipped"].includes(status)) {
      setRun(false);
      if (user) {
        localStorage.setItem(`tour-completed-${user.role}`, "true");
      }
    }
  };
  
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
              primaryColor: "#7c3aed",
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

export { useTour } from './TourContext';
