
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const courseList = [
  { title: "Web Development Fundamentals", progress: 75 },
  { title: "UI/UX Design Principles", progress: 45 },
  { title: "Data Science Basics", progress: 30 },
  { title: "JavaScript Masterclass", progress: 10 },
];

const CoursesCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md student-courses">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>My Courses</span>
        <BookOpen className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {courseList.map((course, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{course.title}</span>
              <span className="text-sm text-muted-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/dashboard/student/courses">
            View All Courses <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default CoursesCard;
