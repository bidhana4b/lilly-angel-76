
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Video, Award, CreditCard, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="dashboard-welcome">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your learning journey.
        </p>
      </div>
      
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-200 hover:shadow-md student-courses">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>My Courses</span>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Web Development Fundamentals", progress: 75 },
                { title: "UI/UX Design Principles", progress: 45 },
                { title: "Data Science Basics", progress: 30 },
                { title: "JavaScript Masterclass", progress: 10 },
              ].map((course, i) => (
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
        
        <Card className="transition-all duration-200 hover:shadow-md student-assignments">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Assignments Due</span>
              <Clock className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "JavaScript Functions", course: "Web Development", due: "Today" },
                { title: "User Personas", course: "UX Design", due: "Tomorrow" },
                { title: "Data Visualization", course: "Data Science", due: "In 2 days" },
                { title: "React Components", course: "JavaScript", due: "In 5 days" },
              ].map((assignment, i) => (
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
        
        <Card className="transition-all duration-200 hover:shadow-md student-payments">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Payment Status</span>
              <CreditCard className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 p-3 rounded-md">
                <h4 className="font-medium text-red-600">Payment Due: $299</h4>
                <p className="text-sm text-red-500">Due by April 30, 2025</p>
                <Button className="mt-2 w-full" variant="destructive" asChild>
                  <Link to="/dashboard/student/payments">Make Payment</Link>
                </Button>
              </div>
              
              <div>
                <p className="font-medium">Payment History</p>
                <div className="mt-2 space-y-3">
                  {[
                    { course: "Web Development", amount: "$199", date: "Mar 15, 2025" },
                    { course: "UX Design", amount: "$249", date: "Feb 10, 2025" },
                  ].map((payment, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{payment.course}</span>
                      <div>
                        <span className="font-medium">{payment.amount}</span>
                        <span className="text-muted-foreground ml-2">{payment.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Latest Notifications</span>
              <Bell className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "New assignment posted", time: "2 hours ago", isNew: true },
                { title: "Your assignment has been graded", time: "Yesterday", isNew: false },
                { title: "Live class schedule updated", time: "2 days ago", isNew: false },
              ].map((notification, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                  <div className="flex items-center">
                    {notification.isNew && (
                      <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                    )}
                    <p className={`${notification.isNew ? "font-medium" : ""}`}>{notification.title}</p>
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    {notification.time}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/dashboard/student/notifications">
                  View All Notifications <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
      
      <Card className="md:col-span-2 lg:col-span-3 transition-all duration-200 hover:shadow-md student-recordings">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Class Recordings</span>
            <Video className="h-5 w-5 text-primary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Introduction to JavaScript", duration: "1h 15m", date: "Apr 10, 2025", watched: true },
              { title: "CSS Grid Systems", duration: "45m", date: "Apr 8, 2025", watched: true },
              { title: "UI Design Principles", duration: "1h 30m", date: "Apr 5, 2025", watched: false },
            ].map((recording, i) => (
              <Card key={i} className="bg-secondary/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{recording.title}</h4>
                    {recording.watched && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Watched</span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{recording.duration}</span>
                    <span>{recording.date}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    {recording.watched ? "Rewatch" : "Watch Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" asChild>
              <Link to="/dashboard/student/live-class">
                View All Recordings <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
