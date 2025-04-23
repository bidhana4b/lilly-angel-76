import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClipboardList, Calendar as CalendarIcon, Video, Edit, Trash2, ExternalLink, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const mockCourses = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
  { id: "c4", title: "UI/UX Design Principles" }
];

interface LiveClass {
  id: string;
  courseId: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  link: string;
  platform: "zoom" | "google-meet" | "microsoft-teams";
}

const mockLiveClasses: LiveClass[] = [
  {
    id: "lc1",
    courseId: "c1",
    title: "Introduction to HTML & CSS",
    description: "Basics of web structure and styling",
    date: new Date(2025, 4, 28), // May 28, 2025
    time: "14:00",
    link: "https://zoom.us/j/123456789",
    platform: "zoom"
  },
  {
    id: "lc2",
    courseId: "c2",
    title: "React Hooks Deep Dive",
    description: "Advanced usage of useState, useEffect, and custom hooks",
    date: new Date(2025, 4, 25), // May 25, 2025
    time: "16:30",
    link: "https://meet.google.com/abc-defg-hij",
    platform: "google-meet"
  },
  {
    id: "lc3",
    courseId: "c3",
    title: "Async Programming Patterns",
    description: "Promise, async/await and handling complex asynchronous flows",
    date: new Date(2025, 4, 30), // May 30, 2025
    time: "11:00",
    link: "https://teams.microsoft.com/l/meetup-join/12345",
    platform: "microsoft-teams"
  }
];

const LiveClassPage: React.FC = () => {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classes, setClasses] = useState<LiveClass[]>(mockLiveClasses);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingClass, setEditingClass] = useState<LiveClass | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [courseId, setCourseId] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classDate, setClassDate] = useState<Date | undefined>(new Date());
  const [classTime, setClassTime] = useState("");
  const [classLink, setClassLink] = useState("");
  const [classPlatform, setClassPlatform] = useState<"zoom" | "google-meet" | "microsoft-teams" | "">("");
  
  // Add debug logging
  useEffect(() => {
    console.log('Current View:', view);
  }, [view]);
  
  const openScheduleDialog = () => {
    setEditMode(false);
    setEditingClass(null);
    resetForm();
    setIsScheduleDialogOpen(true);
  };
  
  const openEditDialog = (liveClass: LiveClass) => {
    setEditMode(true);
    setEditingClass(liveClass);
    // Populate form with class data
    setCourseId(liveClass.courseId);
    setClassTitle(liveClass.title);
    setClassDescription(liveClass.description);
    setClassDate(new Date(liveClass.date));
    setClassTime(liveClass.time);
    setClassLink(liveClass.link);
    setClassPlatform(liveClass.platform);
    setIsScheduleDialogOpen(true);
  };
  
  const resetForm = () => {
    setCourseId("");
    setClassTitle("");
    setClassDescription("");
    setClassDate(new Date());
    setClassTime("");
    setClassLink("");
    setClassPlatform("");
  };
  
  const confirmDeleteClass = (id: string) => {
    setClassToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const deleteClass = () => {
    if (!classToDelete) return;
    
    setClasses(classes.filter(c => c.id !== classToDelete));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Class Deleted",
      description: "The live class has been deleted successfully.",
    });
  };
  
  const handleSubmitClass = () => {
    if (!courseId || !classTitle || !classDate || !classTime || !classLink || !classPlatform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (editMode && editingClass) {
      // Update existing class
      const updatedClasses = classes.map(c => 
        c.id === editingClass.id 
          ? {
              ...c,
              courseId,
              title: classTitle,
              description: classDescription,
              date: classDate as Date,
              time: classTime,
              link: classLink,
              platform: classPlatform as "zoom" | "google-meet" | "microsoft-teams",
            }
          : c
      );
      setClasses(updatedClasses);
      
      toast({
        title: "Class Updated",
        description: "The live class has been updated successfully.",
      });
    } else {
      // Create new class
      const newClass: LiveClass = {
        id: `lc${Date.now()}`,
        courseId,
        title: classTitle,
        description: classDescription,
        date: classDate as Date,
        time: classTime,
        link: classLink,
        platform: classPlatform as "zoom" | "google-meet" | "microsoft-teams",
      };
      
      setClasses([...classes, newClass]);
      
      toast({
        title: "Class Scheduled",
        description: "The live class has been scheduled successfully.",
      });
    }
    
    setIsScheduleDialogOpen(false);
    resetForm();
  };

  const filteredClasses = selectedDate
    ? classes.filter(c => 
        c.date.toDateString() === selectedDate.toDateString()
      )
    : classes;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule Live Class</h2>
          <p className="text-muted-foreground">
            Create and manage live class sessions for your courses
          </p>
        </div>
        <Button onClick={openScheduleDialog}>Schedule New Class</Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled live sessions</CardDescription>
            </div>
            <Tabs 
              defaultValue="list" 
              value={view} 
              onValueChange={(value) => setView(value as "calendar" | "list")}
            >
              <TabsList>
                <TabsTrigger value="list" className="flex gap-1">
                  <ClipboardList className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Defensive check: Only render TabsContent if view is set */}
              {view === "list" && (
                <TabsContent value="list" className="space-y-4">
                  {filteredClasses.length > 0 ? (
                    <div className="space-y-4">
                      {filteredClasses.map((liveClass) => {
                        const course = mockCourses.find(c => c.id === liveClass.courseId);
                        return (
                          <div 
                            key={liveClass.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 hover:bg-accent/10 transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                  liveClass.platform === 'zoom' ? 'bg-blue-100 text-blue-700' :
                                  liveClass.platform === 'google-meet' ? 'bg-green-100 text-green-700' :
                                  'bg-purple-100 text-purple-700'
                                }`}>
                                  <Video className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{liveClass.title}</h4>
                                  <p className="text-sm text-muted-foreground">{course?.title}</p>
                                </div>
                              </div>
                              <p className="text-sm">{liveClass.description}</p>
                            </div>
                            
                            <div className="flex flex-col sm:items-end mt-2 sm:mt-0 space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>{format(liveClass.date, "MMM dd, yyyy")}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{liveClass.time}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button variant="ghost" size="icon" asChild>
                                  <a href={liveClass.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(liveClass)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => confirmDeleteClass(liveClass.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No classes scheduled for the selected date.</p>
                      <Button variant="link" onClick={openScheduleDialog}>Schedule a new class</Button>
                    </div>
                  )}
                </TabsContent>
              )}
              
              {view === "calendar" && (
                <TabsContent value="calendar" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-[300px]">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className={cn("rounded-md border shadow pointer-events-auto")}
                        // Highlight days with classes
                        modifiers={{
                          hasClass: classes.map(c => new Date(c.date)),
                        }}
                        modifiersStyles={{
                          hasClass: { backgroundColor: "var(--primary)", color: "white" },
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 border rounded-md p-4 h-[300px] overflow-y-auto">
                      <h4 className="font-medium mb-4">
                        Classes for {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Selected Date"}
                      </h4>
                      
                      {filteredClasses.length > 0 ? (
                        <div className="space-y-4">
                          {filteredClasses.map((liveClass) => {
                            const course = mockCourses.find(c => c.id === liveClass.courseId);
                            return (
                              <div 
                                key={liveClass.id} 
                                className="flex items-center justify-between border-b pb-2 last:border-0"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium">{liveClass.time}</h5>
                                    <span className="text-sm">{liveClass.title}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{course?.title}</p>
                                </div>
                                
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href={liveClass.link} target="_blank" rel="noopener noreferrer">
                                      Join
                                    </a>
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(liveClass)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No classes scheduled for this date.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      
      {/* Schedule/Edit Class Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Live Class" : "Schedule New Live Class"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the details for your live class session" 
                : "Fill in the details to schedule a new live class session"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={courseId} onValueChange={setCourseId}>
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
            
            <div className="space-y-2">
              <Label htmlFor="title">Class Title</Label>
              <Input 
                id="title" 
                placeholder="Enter class title" 
                value={classTitle} 
                onChange={(e) => setClassTitle(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Enter class description" 
                value={classDescription} 
                onChange={(e) => setClassDescription(e.target.value)} 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !classDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {classDate ? format(classDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={classDate}
                      onSelect={setClassDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={classTime} 
                  onChange={(e) => setClassTime(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={classPlatform} onValueChange={value => setClassPlatform(value as any)}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="google-meet">Google Meet</SelectItem>
                  <SelectItem value="microsoft-teams">Microsoft Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Meeting Link</Label>
              <Input 
                id="link" 
                placeholder="https://" 
                value={classLink} 
                onChange={(e) => setClassLink(e.target.value)} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitClass}>
              {editMode ? "Update Class" : "Schedule Class"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this live class? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteClass}>Delete Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveClassPage;
