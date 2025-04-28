
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Video, Clock, BookOpen, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QuickActionsCard: React.FC = () => {
  const actions = [
    { 
      icon: Video, 
      label: "Join Live Class", 
      path: "/dashboard/student/live-class",
      tooltip: "Connect to your scheduled live class"
    },
    { 
      icon: Clock, 
      label: "Submit Assignment", 
      path: "/dashboard/student/assignments",
      tooltip: "Upload your completed assignments" 
    },
    { 
      icon: BookOpen, 
      label: "View Materials", 
      path: "/dashboard/student/courses",
      tooltip: "Access course learning materials" 
    },
    { 
      icon: CreditCard, 
      label: "Make Payment", 
      path: "/dashboard/student/payments",
      tooltip: "Process fee payments" 
    }
  ];

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Quick Actions</span>
          <Award className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TooltipProvider delayDuration={300}>
            {actions.map((action, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button className="w-full justify-start" asChild>
                    <Link to={action.path}>
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                  {action.tooltip}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
