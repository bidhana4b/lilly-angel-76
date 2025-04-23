
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Bell, CalendarIcon, Check, Clock, Send } from "lucide-react";
import { NotificationTarget } from "./types";
import { mockStudents, mockTeachers, mockCourses } from "./mockData";

interface NotificationForm {
  title: string;
  message: string;
  target: NotificationTarget;
  targetId?: string;
  scheduledFor?: Date;
}

const CreateNotificationPage: React.FC = () => {
  const [form, setForm] = useState<NotificationForm>({
    title: "",
    message: "",
    target: "all",
  });
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (field: keyof NotificationForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (schedule: boolean = false) => {
    // Validate form
    if (!form.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a notification title",
        variant: "destructive",
      });
      return;
    }
    
    if (!form.message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a notification message",
        variant: "destructive",
      });
      return;
    }
    
    if ((form.target === "student" || form.target === "teacher" || form.target === "course") && !form.targetId) {
      toast({
        title: "Target Required",
        description: `Please select a specific ${form.target} to send the notification to`,
        variant: "destructive",
      });
      return;
    }
    
    if (schedule && !form.scheduledFor) {
      toast({
        title: "Schedule Time Required",
        description: "Please select a date and time to schedule this notification",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the notification or save it to be sent later
    toast({
      title: schedule ? "Notification Scheduled" : "Notification Sent",
      description: schedule 
        ? `Your notification will be sent on ${format(form.scheduledFor!, "PPP 'at' p")}` 
        : "Your notification has been sent successfully",
      duration: 3000,
    });
    
    // Reset form
    setForm({
      title: "",
      message: "",
      target: "all",
      targetId: undefined,
      scheduledFor: undefined,
    });
  };
  
  const getTargetOptions = () => {
    switch (form.target) {
      case "student":
        return mockStudents.map(student => (
          <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
        ));
      case "teacher":
        return mockTeachers.map(teacher => (
          <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
        ));
      case "course":
        return mockCourses.map(course => (
          <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
        ));
      default:
        return null;
    }
  };
  
  const getTargetLabel = () => {
    switch (form.target) {
      case "student": return "Select Student";
      case "teacher": return "Select Teacher";
      case "course": return "Select Course";
      default: return "";
    }
  };
  
  const getTargetName = () => {
    if (!form.targetId) return "";
    
    switch (form.target) {
      case "student":
        return mockStudents.find(s => s.id === form.targetId)?.name || "";
      case "teacher":
        return mockTeachers.find(t => t.id === form.targetId)?.name || "";
      case "course":
        return mockCourses.find(c => c.id === form.targetId)?.name || "";
      default:
        return "";
    }
  };
  
  const getRecipientText = () => {
    switch (form.target) {
      case "all": return "All Users";
      case "students": return "All Students";
      case "teachers": return "All Teachers";
      case "student": return `Student: ${getTargetName()}`;
      case "teacher": return `Teacher: ${getTargetName()}`;
      case "course": return `Course: ${getTargetName()}`;
      default: return "";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Create New Notification</CardTitle>
          <CardDescription>
            Send announcements, reminders, and updates to users
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="Enter notification title"
                value={form.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
              <Textarea
                id="message"
                placeholder="Enter your notification message"
                className="min-h-[120px]"
                value={form.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <Label>Target Recipients <span className="text-red-500">*</span></Label>
              
              <RadioGroup 
                value={form.target} 
                onValueChange={(value) => handleInputChange("target", value as NotificationTarget)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="cursor-pointer">Everyone</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="students" id="students" />
                  <Label htmlFor="students" className="cursor-pointer">All Students</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teachers" id="teachers" />
                  <Label htmlFor="teachers" className="cursor-pointer">All Teachers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="specific-student" />
                  <Label htmlFor="specific-student" className="cursor-pointer">Specific Student</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="specific-teacher" />
                  <Label htmlFor="specific-teacher" className="cursor-pointer">Specific Teacher</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="course" id="specific-course" />
                  <Label htmlFor="specific-course" className="cursor-pointer">Specific Course</Label>
                </div>
              </RadioGroup>
            </div>
            
            {(form.target === "student" || form.target === "teacher" || form.target === "course") && (
              <div className="space-y-2">
                <Label htmlFor="target-id">{getTargetLabel()} <span className="text-red-500">*</span></Label>
                <Select 
                  value={form.targetId || "select"} 
                  onValueChange={(value) => handleInputChange("targetId", value === "select" ? undefined : value)}
                >
                  <SelectTrigger id="target-id">
                    <SelectValue placeholder={`Select ${form.target}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {getTargetOptions()}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule (Optional)</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.scheduledFor ? (
                        format(form.scheduledFor, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.scheduledFor}
                      onSelect={(date) => handleInputChange("scheduledFor", date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                
                {form.scheduledFor && (
                  <Select
                    value={form.scheduledFor ? format(form.scheduledFor, 'HH:mm') : undefined}
                    onValueChange={(time) => {
                      const [hours, minutes] = time.split(':').map(Number);
                      const newDate = new Date(form.scheduledFor!);
                      newDate.setHours(hours, minutes);
                      handleInputChange("scheduledFor", newDate);
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, hour) => {
                        const times = ['00', '30'].map(minute => ({
                          value: `${hour.toString().padStart(2, '0')}:${minute}`,
                          display: `${hour.toString().padStart(2, '0')}:${minute}`
                        }));
                        return times.map((time, i) => (
                          <SelectItem key={`${hour}-${i}`} value={time.value}>
                            {time.display}
                          </SelectItem>
                        ));
                      }).flat()}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-1 w-full sm:w-auto order-last sm:order-first"
            onClick={() => setShowPreview(true)}
          >
            <Bell className="h-4 w-4" /> Preview
          </Button>
          <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto sm:ml-auto">
            {form.scheduledFor && (
              <Button 
                onClick={() => handleSubmit(true)}
                variant="secondary"
                className="flex items-center gap-1 w-full sm:w-auto"
              >
                <Clock className="h-4 w-4" /> Schedule for Later
              </Button>
            )}
            <Button 
              onClick={() => handleSubmit(false)} 
              className="flex items-center gap-1 w-full sm:w-auto"
            >
              <Send className="h-4 w-4" /> Send Now
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notification Preview
            </DialogTitle>
            <DialogDescription>
              This is how your notification will appear to recipients
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="text-sm text-muted-foreground mb-1">To:</div>
              <div className="font-medium">{getRecipientText()}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Title:</div>
              <div className="font-bold text-lg">{form.title || "Notification Title"}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground mb-1">Message:</div>
              <div className="bg-muted/50 p-3 rounded-md">
                {form.message || "Notification message content will appear here..."}
              </div>
            </div>
            
            {form.scheduledFor && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Scheduled For:</div>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{format(form.scheduledFor, "PPP 'at' p")}</span>
                </div>
              </div>
            )}
            
            <div className="text-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPreview(false)}
                className="flex mx-auto items-center gap-1"
              >
                <Check className="h-4 w-4" /> Close Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNotificationPage;
