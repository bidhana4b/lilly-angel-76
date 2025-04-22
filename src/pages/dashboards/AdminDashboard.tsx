
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Users, BookOpen, CreditCard, Clock, LayoutDashboard, Bell, Calendar } from "lucide-react";

const paymentData = [
  { month: "Jan", amount: 4800 },
  { month: "Feb", amount: 5200 },
  { month: "Mar", amount: 4900 },
  { month: "Apr", amount: 6100 },
  { month: "May", amount: 5600 },
  { month: "Jun", amount: 7200 },
];

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType;
  trend?: "up" | "down"; 
}) => (
  <Card className="transition-all duration-200 hover:shadow-md bg-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`h-8 w-8 rounded-lg p-1.5 ${trend === "up" ? "bg-green-100 text-green-600" : trend === "down" ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-full w-full" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"}`}>
        {description}
      </p>
    </CardContent>
  </Card>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="dashboard-welcome">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="text-muted-foreground">
          Here's an overview of your learning platform's performance
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 admin-stats">
        <StatCard
          title="Total Students"
          value="2,483"
          description="↑ 126 new this month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Total Teachers"
          value="48"
          description="↑ 12 new this month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Active Courses"
          value="172"
          description="↓ 3 less this month"
          icon={BookOpen}
          trend="down"
        />
        <StatCard
          title="Monthly Revenue"
          value="$48,294"
          description="↑ 23% from last month"
          icon={CreditCard}
          trend="up"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="col-span-2 transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    theme: {
                      light: "#9b87f5",
                      dark: "#9b87f5",
                    },
                  },
                }}
              >
                <BarChart data={paymentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" name="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Classes */}
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Advanced JavaScript", time: "10:00 AM", attendees: 28 },
                { title: "UI/UX Design", time: "1:30 PM", attendees: 24 },
                { title: "React Fundamentals", time: "3:00 PM", attendees: 32 },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{session.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{session.time}</span>
                      <span className="mx-1">•</span>
                      <Users className="mr-1 h-3 w-3" />
                      <span>{session.attendees} students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Notifications */}
        <Card className="col-span-2 lg:col-span-3 transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "New Course Published", description: "React Native Mobile Development course is now live", time: "5 minutes ago", icon: LayoutDashboard },
                { title: "Assignment Due", description: "15 pending submissions for JavaScript Basics", time: "1 hour ago", icon: Clock },
                { title: "Payment Received", description: "New payment received from John Doe", time: "2 hours ago", icon: CreditCard },
              ].map((notification, i) => (
                <Card key={i} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 bg-primary/10 p-1.5 rounded-lg">
                        <notification.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
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
