
import { Step } from "react-joyride";

export interface TourContextType {
  startTour: () => void;
  endTour: () => void;
  resetTour: () => void;
}

export interface TourProviderProps {
  children: React.ReactNode;
}
