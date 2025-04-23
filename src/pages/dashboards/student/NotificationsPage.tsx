
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const notifications = [
  {
    id: "1",
    title: "New assignment posted",
    message: "A new assignment 'JavaScript Functions' has been posted in Web Development Fundamentals. Due date: April 25, 2025.",
    sender: "Jane Smith",
    senderRole: "Teacher",
    date: "Today, 10:30 AM",
    read: false,
  },
  {
    id: "2",
    title: "Live class rescheduled",
    message: "The UI/UX Design Principles class scheduled for tomorrow has been moved to 3:00 PM instead of 2:30 PM.",
    sender: "Michael Johnson",
    senderRole: "Teacher",
    date: "Today, 9:15 AM",
    read: false,
  },
  {
    id: "3",
    title: "Your assignment has been graded",
    message: "Your submission for 'HTML & CSS Basics' has been graded. You received an A. Check the feedback in the Assignments section.",
    sender: "Jane Smith",
    senderRole: "Teacher",
    date: "Yesterday",
    read: true,
  },
  {
    id: "4",
    title: "Payment reminder",
    message: "This is a friendly reminder that your tuition payment is due on April 30, 2025. Please make your payment before the deadline to avoid late fees.",
    sender: "Finance Office",
    senderRole: "Admin",
    date: "Apr 15, 2025",
    read: true,
  },
  {
    id: "5",
    title: "New resource available",
    message: "New learning resources have been added to the Data Science Basics course. Check the course materials section to access them.",
    sender: "Sarah Williams",
    senderRole: "Teacher",
    date: "Apr 12, 2025",
    read: true,
  }
];

const NotificationsPage: React.FC = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  
  const toggleRead = (id: string) => {
    setNotificationList(prevList => 
      prevList.map(notif => 
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotificationList(prevList => prevList.filter(notif => notif.id !== id));
    if (expandedNotification === id) {
      setExpandedNotification(null);
    }
  };
  
  const markAllAsRead = () => {
    setNotificationList(prevList => 
      prevList.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const toggleExpand = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };
  
  const unreadCount = notificationList.filter(n => !n.read).length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Stay updated with your course announcements and updates.
          </p>
        </div>
        
        <Button 
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-4">
        {notificationList.length > 0 ? (
          notificationList.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all duration-200 ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className={notification.read ? "opacity-70" : ""}>
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(notification.sender)}&background=random`} />
                      <AvatarFallback>{notification.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="inline-block w-2 h-2 bg-primary rounded-full ml-2"></span>
                        )}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{notification.sender} ({notification.senderRole})</span>
                        <span className="mx-1">•</span>
                        <span>{notification.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleRead(notification.id)}
                      title={notification.read ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedNotification === notification.id ? 'max-h-[500px]' : 'max-h-[48px]'
                  }`}
                >
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
                
                {notification.message.length > 100 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => toggleExpand(notification.id)}
                    className="w-full text-xs mt-2 h-8"
                  >
                    {expandedNotification === notification.id ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! When you receive new notifications, they will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
