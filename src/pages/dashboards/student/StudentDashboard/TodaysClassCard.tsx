
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TodaysClassCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md student-class">
    <CardHeader>
      <CardTitle>Today's Class</CardTitle>
      <CardDescription>Your upcoming live session</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="h-12 w-12 rounded-lg bg-primary/10 p-2.5 text-primary">
            <Video className="h-full w-full" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Advanced JavaScript Concepts</h4>
            <p className="text-muted-foreground">Today, 4:00 PM - 5:30 PM</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Materials</Button>
          <Button asChild>
            <Link to="/dashboard/student/live-class">Join Class</Link>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TodaysClassCard;
