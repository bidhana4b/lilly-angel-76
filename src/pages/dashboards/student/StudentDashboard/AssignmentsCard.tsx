
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const assignments = [
  { title: "JavaScript Functions", course: "Web Development", due: "Today" },
  { title: "User Personas", course: "UX Design", due: "Tomorrow" },
  { title: "Data Visualization", course: "Data Science", due: "In 2 days" },
  { title: "React Components", course: "JavaScript", due: "In 5 days" },
];

const AssignmentsCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md student-assignments">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Assignments Due</span>
        <Clock className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {assignments.map((assignment, i) => (
          <div key={i} className="flex justify-between pb-3 border-b last:border-0 last:pb-0">
            <div>
              <p className="font-medium">{assignment.title}</p>
              <p className="text-sm text-muted-foreground">{assignment.course}</p>
            </div>
            <div className="text-right">
              <p className={`font-medium ${assignment.due === "Today" ? "text-destructive" : ""}`}>
                {assignment.due}
              </p>
            </div>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/dashboard/student/assignments">
            View All Assignments <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default AssignmentsCard;
