
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Mail, Phone, User, Calendar, FileText, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollmentDate: Date;
  assignments: {
    completed: number;
    total: number;
  };
  attendance: {
    present: number;
    total: number;
  };
  courses: string[];
}

interface Course {
  id: string;
  title: string;
}

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: Date;
}

interface StudentAssignment {
  id: string;
  assignmentId: string;
  grade: number | null;
  status: "submitted" | "graded" | "not_submitted";
  submittedDate?: Date;
}

const mockCourses: Course[] = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
  { id: "c4", title: "UI/UX Design Principles" },
];

const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "555-123-4567",
    enrollmentDate: new Date(2025, 2, 15),
    assignments: {
      completed: 12,
      total: 15,
    },
    attendance: {
      present: 18,
      total: 20,
    },
    courses: ["c1", "c2"]
  },
  {
    id: "s2",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "555-234-5678",
    enrollmentDate: new Date(2025, 2, 10),
    assignments: {
      completed: 14,
      total: 15,
    },
    attendance: {
      present: 19,
      total: 20,
    },
    courses: ["c1", "c3"]
  },
  {
    id: "s3",
    name: "James Wilson",
    email: "james@example.com",
    phone: "555-345-6789",
    enrollmentDate: new Date(2025, 2, 20),
    assignments: {
      completed: 10,
      total: 15,
    },
    attendance: {
      present: 16,
      total: 20,
    },
    courses: ["c1", "c4"]
  },
  {
    id: "s4",
    name: "Sara Chen",
    email: "sara@example.com",
    phone: "555-456-7890",
    enrollmentDate: new Date(2025, 2, 5),
    assignments: {
      completed: 15,
      total: 15,
    },
    attendance: {
      present: 20,
      total: 20,
    },
    courses: ["c2", "c3"]
  },
  {
    id: "s5",
    name: "Derek Lewis",
    email: "derek@example.com",
    phone: "555-567-8901",
    enrollmentDate: new Date(2025, 2, 8),
    assignments: {
      completed: 11,
      total: 15,
    },
    attendance: {
      present: 17,
      total: 20,
    },
    courses: ["c1", "c3"]
  },
];

const mockAssignments: Assignment[] = [
  {
    id: "a1",
    courseId: "c1",
    title: "Create a Responsive Website",
    dueDate: new Date(2025, 5, 15),
  },
  {
    id: "a2",
    courseId: "c2",
    title: "React State Management Project",
    dueDate: new Date(2025, 5, 10),
  },
  {
    id: "a3",
    courseId: "c3",
    title: "JavaScript Design Patterns Implementation",
    dueDate: new Date(2025, 5, 20),
  },
];

const mockStudentAssignments: StudentAssignment[] = [
  {
    id: "sa1",
    assignmentId: "a1",
    grade: 85,
    status: "graded",
    submittedDate: new Date(2025, 5, 12),
  },
  {
    id: "sa2",
    assignmentId: "a2",
    grade: 92,
    status: "graded",
    submittedDate: new Date(2025, 5, 7),
  },
  {
    id: "sa3",
    assignmentId: "a3",
    grade: null,
    status: "submitted",
    submittedDate: new Date(2025, 5, 18),
  },
];

const StudentsPage: React.FC = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseFilter, setCourseFilter] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState<boolean>(false);
  const [attendanceDate, setAttendanceDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !courseFilter || student.courses.includes(courseFilter);
    return matchesSearch && matchesCourse;
  });
  
  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };
  
  const openAttendanceDialog = () => {
    // Reset attendance records
    const initialAttendance: Record<string, boolean> = {};
    students.forEach(student => {
      initialAttendance[student.id] = true; // Default to present
    });
    setAttendanceRecords(initialAttendance);
    setIsAttendanceOpen(true);
  };
  
  const toggleAttendance = (studentId: string) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };
  
  const saveAttendance = () => {
    // Here you would typically save the attendance records to your backend
    setIsAttendanceOpen(false);
    
    const presentCount = Object.values(attendanceRecords).filter(Boolean).length;
    alert(`Attendance recorded: ${presentCount} students present out of ${students.length}`);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student List</h2>
          <p className="text-muted-foreground">
            Manage and track your enrolled students
          </p>
        </div>
        <Button onClick={openAttendanceDialog}>Take Attendance</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                View all students enrolled in your courses
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  {mockCourses.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Enrolled Courses</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              student.assignments.completed / student.assignments.total >= 0.8 
                                ? "text-green-600" 
                                : student.assignments.completed / student.assignments.total >= 0.6 
                                ? "text-amber-600" 
                                : "text-red-600"
                            )}>
                              {student.assignments.completed}/{student.assignments.total}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({Math.round((student.assignments.completed / student.assignments.total) * 100)}%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              student.attendance.present / student.attendance.total >= 0.8 
                                ? "text-green-600" 
                                : student.attendance.present / student.attendance.total >= 0.6 
                                ? "text-amber-600" 
                                : "text-red-600"
                            )}>
                              {student.attendance.present}/{student.attendance.total}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({Math.round((student.attendance.present / student.attendance.total) * 100)}%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {student.courses.map(courseId => {
                              const course = mockCourses.find(c => c.id === courseId);
                              return course ? (
                                <Badge key={courseId} variant="outline" className="whitespace-nowrap text-xs">
                                  {course.title.length > 20 
                                    ? `${course.title.substring(0, 20)}...` 
                                    : course.title}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewProfile(student)}>
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No students found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Student Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              Detailed information and performance data
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Enrolled: {format(new Date(selectedStudent.enrollmentDate), "MMMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="courses">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent.courses.map(courseId => {
                          const course = mockCourses.find(c => c.id === courseId);
                          const progress = Math.floor(Math.random() * 41) + 60; // Random progress between 60-100%
                          
                          return course ? (
                            <TableRow key={courseId}>
                              <TableCell>{course.title}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={cn(
                                        "h-2 rounded-full",
                                        progress >= 80 ? "bg-green-500" :
                                        progress >= 60 ? "bg-amber-500" :
                                        "bg-red-500"
                                      )}
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                  <span className="text-sm">{progress}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : null;
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAssignments.map(assignment => {
                          const studentAssignment = mockStudentAssignments.find(sa => sa.assignmentId === assignment.id);
                          
                          return (
                            <TableRow key={assignment.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span>{assignment.title}</span>
                                </div>
                              </TableCell>
                              <TableCell>{format(new Date(assignment.dueDate), "MMM dd, yyyy")}</TableCell>
                              <TableCell>
                                {studentAssignment ? (
                                  studentAssignment.status === "graded" ? (
                                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                      Graded
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                      Submitted
                                    </Badge>
                                  )
                                ) : (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                    Not Submitted
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {studentAssignment && studentAssignment.grade !== null ? (
                                  <span className={cn(
                                    "font-medium",
                                    studentAssignment.grade >= 80 ? "text-green-600" : 
                                    studentAssignment.grade >= 60 ? "text-amber-600" : "text-red-600"
                                  )}>
                                    {studentAssignment.grade}/100
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="attendance" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Attendance Summary</h4>
                      <div className="flex items-center gap-1 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>
                          <span className="font-medium">
                            {selectedStudent.attendance.present}/{selectedStudent.attendance.total}
                          </span> classes attended
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full",
                          (selectedStudent.attendance.present / selectedStudent.attendance.total) >= 0.8 
                            ? "bg-green-500" :
                          (selectedStudent.attendance.present / selectedStudent.attendance.total) >= 0.6 
                            ? "bg-amber-500" :
                            "bg-red-500"
                        )}
                        style={{ width: `${(selectedStudent.attendance.present / selectedStudent.attendance.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((selectedStudent.attendance.present / selectedStudent.attendance.total) * 100)}% attendance rate
                    </p>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-3 gap-2 p-4 border-b">
                      {Array.from({ length: 6 }).map((_, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (5 - index));
                        const isPresent = Math.random() > 0.2; // 80% chance of being present
                        
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div className="text-sm font-medium">{format(date, "MMM dd")}</div>
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            )}>
                              {isPresent ? "P" : "A"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Showing recent attendance records
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Attendance Dialog */}
      <Dialog open={isAttendanceOpen} onOpenChange={setIsAttendanceOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Take Attendance</DialogTitle>
            <DialogDescription>
              Mark students as present or absent
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attendance-date">Date</Label>
              <Input
                id="attendance-date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={!!attendanceRecords[student.id]}
                            onCheckedChange={() => toggleAttendance(student.id)}
                            id={`attendance-${student.id}`}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAttendanceOpen(false)}>Cancel</Button>
              <Button onClick={saveAttendance}>Save Attendance</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
