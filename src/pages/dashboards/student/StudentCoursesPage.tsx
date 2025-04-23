
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    instructor: "Jane Smith",
    progress: 75,
    duration: "12 weeks",
    nextClass: "Today, 4:00 PM"
  },
  {
    id: "2",
    title: "UI/UX Design Principles",
    instructor: "Michael Johnson",
    progress: 45,
    duration: "8 weeks",
    nextClass: "Tomorrow, 2:30 PM"
  },
  {
    id: "3",
    title: "Data Science Basics",
    instructor: "Sarah Williams",
    progress: 30,
    duration: "10 weeks",
    nextClass: "Wednesday, 5:00 PM"
  },
  {
    id: "4",
    title: "JavaScript Masterclass",
    instructor: "David Chen",
    progress: 10,
    duration: "8 weeks",
    nextClass: "Friday, 3:00 PM"
  }
];

const StudentCoursesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        <p className="text-muted-foreground">
          Manage and track your enrolled courses.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {course.progress}% Complete
                </Badge>
              </div>
              <CardDescription>Instructor: {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{course.duration}</p>
                </div>
                <div>
                  <p className="font-medium">Next Class</p>
                  <p className="text-muted-foreground">{course.nextClass}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-2 rounded-md text-sm font-medium">
                  Materials
                </button>
                <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md text-sm font-medium">
                  Join Class
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
