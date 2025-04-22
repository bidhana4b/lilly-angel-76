
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Video,
  Users,
  Book,
  User,
  Check,
  X,
  Edit
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ClassEvent {
  id: string;
  title: string;
  course: string;
  teacher: string;
  date: Date;
  startTime: string;
  endTime: string;
  meetingLink: string;
  studentCount: number;
}

const mockCourses = [
  { id: "1", name: "Mathematics Grade 10" },
  { id: "2", name: "English Literature Grade 11" },
  { id: "3", name: "Physics Grade 12" },
];

const mockTeachers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Maria Garcia" },
  { id: "3", name: "David Johnson" },
];

const mockClasses: ClassEvent[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    course: "Mathematics Grade 10",
    teacher: "John Smith",
    date: new Date(2025, 3, 23),
    startTime: "09:00",
    endTime: "10:30",
    meetingLink: "https://zoom.us/j/example1",
    studentCount: 24
  },
  {
    id: "2",
    title: "Shakespeare Analysis",
    course: "English Literature Grade 11",
    teacher: "Maria Garcia",
    date: new Date(2025, 3, 23),
    startTime: "11:00",
    endTime: "12:30",
    meetingLink: "https://meet.google.com/example2",
    studentCount: 18
  },
  {
    id: "3",
    title: "Quantum Physics",
    course: "Physics Grade 12",
    teacher: "David Johnson",
    date: new Date(2025, 3, 24),
    startTime: "14:00",
    endTime: "15:30",
    meetingLink: "https://zoom.us/j/example3",
    studentCount: 16
  },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  course: z.string().min(1, "Course is required"),
  teacher: z.string().min(1, "Teacher is required"),
  date: z.date({ required_error: "Date is required" }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  meetingLink: z.string().url("Please enter a valid URL"),
  sendReminder: z.boolean().optional(),
});

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filteredCourse, setFilteredCourse] = useState("");
  const [filteredTeacher, setFilteredTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      course: "",
      teacher: "",
      startTime: "",
      endTime: "",
      meetingLink: "",
      sendReminder: true,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Class scheduled:", values);
    setActiveTab("calendar");
    form.reset();
  };

  const handleEdit = (classEvent: ClassEvent) => {
    setSelectedClass(classEvent);
    form.reset({
      title: classEvent.title,
      course: classEvent.course,
      teacher: classEvent.teacher,
      date: classEvent.date,
      startTime: classEvent.startTime,
      endTime: classEvent.endTime,
      meetingLink: classEvent.meetingLink,
      sendReminder: true,
    });
    setIsEditing(true);
    setActiveTab("schedule");
  };

  const handleCancel = () => {
    setSelectedClass(null);
    setIsEditing(false);
    form.reset();
  };

  // Filter classes by selected date, course, and teacher
  const filteredClasses = mockClasses.filter(cls => {
    const dateMatches = !date || cls.date.toDateString() === date.toDateString();
    const courseMatches = !filteredCourse || cls.course === filteredCourse;
    const teacherMatches = !filteredTeacher || cls.teacher === filteredTeacher;
    return dateMatches && courseMatches && teacherMatches;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Class Schedule Manager</h2>
          <p className="text-muted-foreground">View and manage class schedules</p>
        </div>
        <Button onClick={() => setActiveTab("schedule")} className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule New Class
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Class</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule Calendar</CardTitle>
              <CardDescription>View and filter scheduled classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto"
                  />
                </div>
                <div className="space-y-4 col-span-1 md:col-span-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="filter-course">Filter by Course</Label>
                      <Select value={filteredCourse} onValueChange={setFilteredCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Courses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Courses</SelectItem>
                          {mockCourses.map((course) => (
                            <SelectItem key={course.id} value={course.name}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="filter-teacher">Filter by Teacher</Label>
                      <Select value={filteredTeacher} onValueChange={setFilteredTeacher}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Teachers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Teachers</SelectItem>
                          {mockTeachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.name}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      {date ? format(date, "MMMM d, yyyy") : "All"} Classes 
                      {filteredCourse && ` for ${filteredCourse}`}
                      {filteredTeacher && ` with ${filteredTeacher}`}
                    </h3>
                    {filteredClasses.length > 0 ? (
                      <div className="space-y-3">
                        {filteredClasses.map((cls) => (
                          <Card key={cls.id} className="overflow-hidden border">
                            <div className="flex items-center p-4">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center">
                                  <h4 className="font-medium text-lg">{cls.title}</h4>
                                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded ml-2">
                                    {format(cls.date, "MMM d")}
                                  </span>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground gap-y-1 md:gap-x-4">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {cls.startTime} - {cls.endTime}
                                  </div>
                                  <div className="flex items-center">
                                    <Book className="h-3 w-3 mr-1" />
                                    {cls.course}
                                  </div>
                                  <div className="flex items-center">
                                    <User className="h-3 w-3 mr-1" />
                                    {cls.teacher}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {cls.studentCount} students
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <a 
                                  href={cls.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                  <Video className="h-3 w-3 mr-1" /> Join
                                </a>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleEdit(cls)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No classes scheduled for the selected filters
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Class" : "Schedule New Class"}</CardTitle>
              <CardDescription>
                {isEditing ? "Modify the class details below" : "Enter the details for the new class"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter class title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockCourses.map((course) => (
                                <SelectItem key={course.id} value={course.name}>
                                  {course.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teacher"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teacher</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select teacher" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockTeachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.name}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="meetingLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Link (Zoom / Google Meet)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sendReminder"
                      className="h-4 w-4"
                      {...form.register("sendReminder")}
                    />
                    <label htmlFor="sendReminder" className="text-sm">
                      Send reminder to students and teacher
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    {isEditing && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleCancel}
                      >
                        Cancel Class
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setActiveTab("calendar");
                        handleCancel();
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {isEditing ? "Discard Changes" : "Cancel"}
                    </Button>
                    <Button type="submit">
                      <Check className="h-4 w-4 mr-2" />
                      {isEditing ? "Update Class" : "Schedule Class"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
