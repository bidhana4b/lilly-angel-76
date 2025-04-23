
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Bell, Send, Edit, Trash2, Check, X, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  target: "course" | "student" | "all";
  targetId?: string;
  createdAt: Date;
  status: "draft" | "sent" | "scheduled";
  scheduledFor?: Date;
}

interface Course {
  id: string;
  title: string;
}

interface Student {
  id: string;
  name: string;
  courseIds: string[];
}

const mockCourses: Course[] = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
  { id: "c4", title: "UI/UX Design Principles" },
];

const mockStudents: Student[] = [
  { id: "s1", name: "Alex Johnson", courseIds: ["c1", "c2"] },
  { id: "s2", name: "Maria Garcia", courseIds: ["c1", "c3"] },
  { id: "s3", name: "James Wilson", courseIds: ["c1", "c4"] },
  { id: "s4", name: "Sara Chen", courseIds: ["c2", "c3"] },
  { id: "s5", name: "Derek Lewis", courseIds: ["c1", "c3"] },
];

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Assignment Deadline Extended",
    message: "The deadline for the responsive website assignment has been extended to next Friday.",
    target: "course",
    targetId: "c1",
    createdAt: new Date(2025, 4, 10),
    status: "sent"
  },
  {
    id: "n2",
    title: "Extra Office Hours",
    message: "I will be holding extra office hours this Thursday from 3-5pm to help with the upcoming project.",
    target: "course",
    targetId: "c2",
    createdAt: new Date(2025, 4, 12),
    status: "sent"
  },
  {
    id: "n3",
    title: "Study Materials Added",
    message: "New study materials for the JavaScript Design Patterns have been uploaded to the course page.",
    target: "course",
    targetId: "c3",
    createdAt: new Date(2025, 4, 15),
    status: "draft"
  },
  {
    id: "n4",
    title: "Assignment Feedback",
    message: "I've provided detailed feedback on your last assignment. Please review and let me know if you have questions.",
    target: "student",
    targetId: "s1",
    createdAt: new Date(2025, 4, 18),
    status: "sent"
  },
  {
    id: "n5",
    title: "Class Canceled",
    message: "Tomorrow's class is canceled due to maintenance in the building. We will make up this session next week.",
    target: "all",
    createdAt: new Date(2025, 4, 20),
    status: "scheduled",
    scheduledFor: new Date(2025, 4, 21, 8, 0)
  }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"create" | "history">("create");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"course" | "student" | "all">("all");
  const [targetId, setTargetId] = useState<string>("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [scheduledTime, setScheduledTime] = useState<string>("12:00");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const { toast } = useToast();
  
  const handleCreateNotification = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and message for your notification.",
        variant: "destructive"
      });
      return;
    }
    
    if ((target === "course" || target === "student") && !targetId) {
      toast({
        title: "Missing Target",
        description: `Please select a ${target === "course" ? "course" : "student"} to send this notification to.`,
        variant: "destructive"
      });
      return;
    }
    
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      title,
      message,
      target,
      targetId: target !== "all" ? targetId : undefined,
      createdAt: new Date(),
      status: isScheduled ? "scheduled" : "sent",
      scheduledFor: isScheduled ? new Date(`${scheduledDate}T${scheduledTime}`) : undefined
    };
    
    setNotifications([newNotification, ...notifications]);
    
    toast({
      title: isScheduled ? "Notification Scheduled" : "Notification Sent",
      description: isScheduled 
        ? "Your notification has been scheduled successfully." 
        : "Your notification has been sent successfully.",
    });
    
    // Reset form
    setTitle("");
    setMessage("");
    setTarget("all");
    setTargetId("");
    setIsScheduled(false);
    setScheduledDate(format(new Date(), "yyyy-MM-dd"));
    setScheduledTime("12:00");
    
    // Switch to history tab to see the new notification
    setActiveTab("history");
  };
  
  const handleDeleteNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = () => {
    if (!selectedNotification) return;
    
    setNotifications(notifications.filter(n => n.id !== selectedNotification.id));
    setShowDeleteDialog(false);
    setSelectedNotification(null);
    
    toast({
      title: "Notification Deleted",
      description: "The notification has been deleted successfully."
    });
  };
  
  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowViewDialog(true);
  };
  
  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get filtered students based on the selected course
  const filteredStudents = target === "student" && targetId.startsWith("c") 
    ? mockStudents.filter(student => student.courseIds.includes(targetId))
    : mockStudents;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">
          Create and manage notifications for your students
        </p>
      </div>
      
      <Tabs defaultValue="create" value={activeTab} onValueChange={(value) => setActiveTab(value as "create" | "history")}>
        <TabsList className="grid grid-cols-2 w-full max-w-xs">
          <TabsTrigger value="create">Create Notification</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Notification</CardTitle>
              <CardDescription>
                Send announcements or information to your students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter notification title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target">Send To</Label>
                <Select value={target} onValueChange={(value) => {
                  setTarget(value as "course" | "student" | "all");
                  setTargetId("");
                }}>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="course">Specific Course</SelectItem>
                    <SelectItem value="student">Specific Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {target === "course" && (
                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select value={targetId} onValueChange={setTargetId}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {target === "student" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filter-course">Filter by Course (Optional)</Label>
                    <Select value={targetId.startsWith("c") ? targetId : ""} onValueChange={value => {
                      if (value.startsWith("c")) {
                        setTargetId(value);
                      } else {
                        setTargetId("");
                      }
                    }}>
                      <SelectTrigger id="filter-course">
                        <SelectValue placeholder="Select a course to filter students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Courses</SelectItem>
                        {mockCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="student">Select Student</Label>
                    <Select 
                      value={targetId.startsWith("s") ? targetId : ""} 
                      onValueChange={value => {
                        if (value.startsWith("s")) {
                          setTargetId(value);
                        }
                      }}
                    >
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredStudents.map(student => (
                          <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" checked={isScheduled} onCheckedChange={(checked) => setIsScheduled(!!checked)} />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>
              
              {isScheduled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleCreateNotification}>
                  {isScheduled ? (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Schedule Notification
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View and manage your sent and scheduled notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => {
                        let recipientText = "All Students";
                        if (notification.target === "course") {
                          const course = mockCourses.find(c => c.id === notification.targetId);
                          recipientText = course ? `Course: ${course.title}` : "Unknown Course";
                        } else if (notification.target === "student") {
                          const student = mockStudents.find(s => s.id === notification.targetId);
                          recipientText = student ? `Student: ${student.name}` : "Unknown Student";
                        }
                        
                        return (
                          <TableRow key={notification.id}>
                            <TableCell className="font-medium">{notification.title}</TableCell>
                            <TableCell>{recipientText}</TableCell>
                            <TableCell>
                              {notification.status === "scheduled" && notification.scheduledFor 
                                ? format(new Date(notification.scheduledFor), "MMM dd, yyyy HH:mm")
                                : format(new Date(notification.createdAt), "MMM dd, yyyy HH:mm")
                              }
                            </TableCell>
                            <TableCell>
                              {notification.status === "sent" ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Sent</Badge>
                              ) : notification.status === "scheduled" ? (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Scheduled</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Draft</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleViewNotification(notification)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteNotification(notification)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No notifications found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Notification Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedNotification.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedNotification.status === "sent" ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800">Sent</Badge>
                  ) : selectedNotification.status === "scheduled" ? (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">Scheduled</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">Draft</Badge>
                  )}
                  
                  {selectedNotification.target === "all" ? (
                    <Badge variant="secondary">All Students</Badge>
                  ) : selectedNotification.target === "course" ? (
                    <Badge variant="secondary">
                      Course: {mockCourses.find(c => c.id === selectedNotification.targetId)?.title}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Student: {mockStudents.find(s => s.id === selectedNotification.targetId)?.name}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-2">
                <p className="whitespace-pre-wrap">{selectedNotification.message}</p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {selectedNotification.status === "scheduled" && selectedNotification.scheduledFor ? (
                  <p>Scheduled for: {format(new Date(selectedNotification.scheduledFor), "PPP 'at' p")}</p>
                ) : (
                  <p>{selectedNotification.status === "sent" ? "Sent" : "Created"}: {format(new Date(selectedNotification.createdAt), "PPP 'at' p")}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="border rounded-md p-3 bg-muted/30">
              <p className="font-medium">{selectedNotification.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {selectedNotification.message.length > 100 
                  ? `${selectedNotification.message.substring(0, 100)}...` 
                  : selectedNotification.message}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
