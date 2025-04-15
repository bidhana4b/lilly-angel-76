
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CreditCard, Clock } from "lucide-react";

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

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the admin dashboard. Here's an overview of your e-learning platform.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="2,483"
          description="126 new this month"
          icon={Users}
        />
        <StatCard
          title="Total Teachers"
          value="48"
          description="12 new this month"
          icon={Users}
        />
        <StatCard
          title="Total Courses"
          value="172"
          description="18 added this month"
          icon={BookOpen}
        />
        <StatCard
          title="Revenue"
          value="$48,294"
          description="23% from last month"
          icon={CreditCard}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Revenue breakdown for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border rounded-md">
              Payment chart will be displayed here
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Active Assignments</CardTitle>
            <CardDescription>Currently ongoing assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "JavaScript Basics", due: "Today", course: "Web Development" },
                { title: "Data Structures", due: "Tomorrow", course: "Computer Science" },
                { title: "UI/UX Principles", due: "In 3 days", course: "Design Fundamentals" },
                { title: "Python Classes", due: "In 4 days", course: "Python Programming" },
              ].map((assignment, i) => (
                <div key={i} className="flex items-center gap-2 pb-3 border-b last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 text-primary">
                    <Clock className="h-full w-full" />
                  </div>
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Due {assignment.due} • {assignment.course}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 lg:col-span-3 transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Live Classes</CardTitle>
            <CardDescription>Live sessions scheduled for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Advanced JavaScript", instructor: "Sarah Johnson", time: "Today, 4:00 PM", students: 28 },
                { title: "UX Research Methods", instructor: "Michael Chen", time: "Tomorrow, 2:30 PM", students: 34 },
                { title: "Python Data Analysis", instructor: "Alex Morgan", time: "Wed, 5:00 PM", students: 42 },
                { title: "Responsive Design", instructor: "Lisa Taylor", time: "Thu, 3:15 PM", students: 19 },
                { title: "Database Design", instructor: "Robert Smith", time: "Fri, 1:00 PM", students: 25 },
                { title: "Machine Learning Basics", instructor: "Priya Sharma", time: "Sat, 10:00 AM", students: 31 },
              ].map((session, i) => (
                <Card key={i} className="bg-secondary/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold">{session.title}</h4>
                    <p className="text-sm">{session.instructor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">{session.time}</span>
                      <span className="text-sm">{session.students} students</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
