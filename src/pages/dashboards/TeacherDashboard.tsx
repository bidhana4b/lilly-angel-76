
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Video, Clock, CheckCircle, FileText, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card className="transition-all duration-200 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 text-primary">
        <Icon className="h-full w-full" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const quickActions = [
    { label: "Create Assignment", icon: FileText, path: "/dashboard/teacher/assignments/create" },
    { label: "Schedule Class", icon: Video, path: "/dashboard/teacher/live-class" },
    { label: "Add Syllabus", icon: Upload, path: "/dashboard/teacher/syllabus" }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="dashboard-welcome">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your teaching activities.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 teacher-stats">
        <StatCard
          title="My Courses"
          value="8"
          description="2 active this week"
          icon={BookOpen}
        />
        <StatCard
          title="Total Students"
          value="342"
          description="18 new this month"
          icon={Users}
        />
        <StatCard
          title="Completion Rate"
          value="87%"
          description="5% increase from last month"
          icon={CheckCircle}
        />
        <StatCard
          title="Assignments Pending"
          value="24"
          description="12 due this week"
          icon={Clock}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="transition-all duration-200 hover:shadow-md md:col-span-2 teacher-classes">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your scheduled sessions for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Web Development Fundamentals", time: "Today, 4:00 PM", students: 28 },
                { title: "Advanced JavaScript", time: "Tomorrow, 2:30 PM", students: 34 },
                { title: "Responsive Web Design", time: "Wed, 5:00 PM", students: 42 },
                { title: "React Basics", time: "Thu, 3:15 PM", students: 19 },
              ].map((session, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 text-primary">
                    <Video className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.time} • {session.students} students
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-md teacher-actions">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, i) => (
              <Button 
                key={i}
                variant="outline" 
                className="w-full justify-start gap-2 text-left"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-md teacher-submissions">
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>Assignments awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "JavaScript Functions", course: "Web Development", submissions: 18, due: "Today" },
                { title: "CSS Layouts", course: "Web Design", submissions: 24, due: "Tomorrow" },
                { title: "API Integration", course: "Advanced Web Dev", submissions: 15, due: "In 2 days" },
              ].map((assignment, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 text-primary">
                      <Clock className="h-full w-full" />
                    </div>
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{assignment.submissions}</p>
                    <p className="text-sm text-muted-foreground">Due {assignment.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-md md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Latest updates and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "New Student Enrolled", message: "John Doe has enrolled in Web Development course", time: "2 hours ago", type: "info" },
                { title: "Assignment Deadline", message: "The deadline for JavaScript Basics has been extended", time: "1 day ago", type: "warning" },
                { title: "Live Class Reminder", message: "You have a scheduled class tomorrow at 3:00 PM", time: "1 day ago", type: "reminder" },
              ].map((notification, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className={`h-8 w-8 rounded-lg p-1.5 ${
                    notification.type === 'info' ? 'bg-blue-100 text-blue-500' : 
                    notification.type === 'warning' ? 'bg-amber-100 text-amber-500' : 
                    'bg-green-100 text-green-500'
                  }`}>
                    <Bell className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{notification.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
