
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const notifications = [
  { title: "New assignment posted", time: "2 hours ago", isNew: true },
  { title: "Your assignment has been graded", time: "Yesterday", isNew: false },
  { title: "Live class schedule updated", time: "2 days ago", isNew: false },
];

const NotificationsCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Latest Notifications</span>
        <Bell className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {notifications.map((notification, i) => (
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
);

export default NotificationsCard;
