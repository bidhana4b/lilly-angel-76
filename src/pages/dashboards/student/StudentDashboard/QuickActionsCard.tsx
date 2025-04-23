
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Video, Clock, BookOpen, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuickActionsCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Quick Actions</span>
        <Award className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button className="w-full justify-start" asChild>
          <Link to="/dashboard/student/live-class">
            <Video className="mr-2 h-4 w-4" />
            Join Live Class
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link to="/dashboard/student/assignments">
            <Clock className="mr-2 h-4 w-4" />
            Submit Assignment
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link to="/dashboard/student/courses">
            <BookOpen className="mr-2 h-4 w-4" />
            View Materials
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild>
          <Link to="/dashboard/student/payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default QuickActionsCard;
