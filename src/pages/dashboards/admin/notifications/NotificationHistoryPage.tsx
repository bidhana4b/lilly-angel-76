import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { Bell, Calendar, Edit, MoreHorizontal, Search, Send, Trash } from "lucide-react";
import { Notification, NotificationStatus, NotificationTarget } from "./types";
import { mockNotifications } from "./mockData";

const NotificationHistoryPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [targetFilter, setTargetFilter] = useState<string>("all");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [viewDetails, setViewDetails] = useState(false);
  
  const { toast } = useToast();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const filteredNotifications = notifications.filter(notification => {
    // Search filter
    const searchMatch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === "all" || notification.status === statusFilter;
    
    // Target filter
    const targetMatch = targetFilter === "all" || notification.target === targetFilter;
    
    return searchMatch && statusMatch && targetMatch;
  });
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy - h:mm a");
    } catch (e) {
      return dateString;
    }
  };
  
  const getStatusBadge = (status: NotificationStatus) => {
    switch (status) {
      case "sent":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">Sent</span>;
      case "scheduled":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">Scheduled</span>;
      case "draft":
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">Draft</span>;
      case "failed":
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">Failed</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">{status}</span>;
    }
  };
  
  const getTargetDisplay = (target: NotificationTarget, targetName?: string) => {
    switch (target) {
      case "all": return "All Users";
      case "students": return "All Students";
      case "teachers": return "All Teachers";
      case "student": return `Student: ${targetName || ''}`;
      case "teacher": return `Teacher: ${targetName || ''}`;
      case "course": return `Course: ${targetName || ''}`;
      default: return target;
    }
  };
  
  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The notification has been deleted successfully",
      duration: 3000,
    });
  };
  
  const handleResend = (notification: Notification) => {
    toast({
      title: "Notification Resent",
      description: `The notification "${notification.title}" has been resent successfully`,
      duration: 3000,
    });
  };
  
  const handleEdit = (notification: Notification) => {
    // In a real app, this would navigate to the edit page or open an edit modal
    toast({
      title: "Edit Notification",
      description: `Editing "${notification.title}"`,
      duration: 3000,
    });
  };
  
  const viewNotificationDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setViewDetails(true);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>
            View and manage all system notifications
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={targetFilter} onValueChange={setTargetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recipients</SelectItem>
                  <SelectItem value="all-users">All Users</SelectItem>
                  <SelectItem value="students">All Students</SelectItem>
                  <SelectItem value="teachers">All Teachers</SelectItem>
                  <SelectItem value="student">Specific Student</SelectItem>
                  <SelectItem value="teacher">Specific Teacher</SelectItem>
                  <SelectItem value="course">Specific Course</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div 
                          className="cursor-pointer hover:text-primary"
                          onClick={() => viewNotificationDetails(notification)}
                        >
                          {notification.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTargetDisplay(notification.target, notification.targetName)}
                      </TableCell>
                      <TableCell>{formatDate(notification.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => viewNotificationDetails(notification)}
                              className="flex items-center gap-2"
                            >
                              <Bell className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            
                            {notification.status === "draft" && (
                              <DropdownMenuItem 
                                onClick={() => handleEdit(notification)}
                                className="flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                            )}
                            
                            {(notification.status === "sent" || notification.status === "failed") && (
                              <DropdownMenuItem 
                                onClick={() => handleResend(notification)}
                                className="flex items-center gap-2"
                              >
                                <Send className="h-4 w-4" /> Resend
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => handleDelete(notification.id)}
                              className="flex items-center gap-2 text-red-600"
                            >
                              <Trash className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No notifications found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedNotification && (
        <Dialog open={viewDetails} onOpenChange={setViewDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedNotification.title}</DialogTitle>
              <DialogDescription>
                Sent by: {selectedNotification.sender}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Status:</span>
                <span>{getStatusBadge(selectedNotification.status)}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium">Recipients:</span>
                <span>{getTargetDisplay(selectedNotification.target, selectedNotification.targetName)}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium">Created:</span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedNotification.createdAt)}</span>
                </div>
              </div>
              
              {selectedNotification.scheduledFor && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Scheduled For:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedNotification.scheduledFor)}</span>
                  </div>
                </div>
              )}
              
              {selectedNotification.sentAt && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sent At:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedNotification.sentAt)}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="text-sm font-medium">Message:</span>
                <div className="bg-muted/50 p-3 rounded-md mt-1 text-sm whitespace-pre-wrap">
                  {selectedNotification.message}
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => {
                  handleDelete(selectedNotification.id);
                  setViewDetails(false);
                }}
                className="flex items-center gap-1"
              >
                <Trash className="h-4 w-4" /> Delete
              </Button>
              
              {(selectedNotification.status === "sent" || selectedNotification.status === "failed") && (
                <Button 
                  size="sm" 
                  onClick={() => {
                    handleResend(selectedNotification);
                    setViewDetails(false);
                  }}
                  className="flex items-center gap-1"
                >
                  <Send className="h-4 w-4" /> Resend
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NotificationHistoryPage;
