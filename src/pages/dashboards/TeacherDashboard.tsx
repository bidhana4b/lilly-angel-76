
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, VideoIcon, Clock, CheckCircle } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your teaching activities.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="transition-all duration-200 hover:shadow-md">
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
                    <VideoIcon className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.time} • {session.students} students
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:underline">Start</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-md">
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
                { title: "React Components", course: "React Fundamentals", submissions: 21, due: "In 3 days" },
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
                    <p className="font-medium">{assignment.submissions} submissions</p>
                    <p className="text-sm text-muted-foreground">Due {assignment.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Class Engagement</CardTitle>
            <CardDescription>Student participation across your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center text-muted-foreground border rounded-md">
              Engagement chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
