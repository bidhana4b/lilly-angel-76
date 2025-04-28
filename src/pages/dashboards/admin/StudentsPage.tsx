
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { DataForm, FormField } from "@/components/ui/data-form/DataForm";
import { Plus, User, UserX, UserCheck, BookOpen, FileText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  courses: CourseEnrollment[];
  status: "active" | "blocked";
  profileImage: string;
  paymentStatus: "paid" | "pending" | "overdue";
  joinedDate: string;
}

interface CourseEnrollment {
  courseId: string;
  courseName: string;
  progress: number;
  assignments: Assignment[];
  attendance: number;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "submitted" | "pending" | "late" | "graded";
  grade?: number;
}

interface Course {
  id: string;
  title: string;
}

const mockCourses: Course[] = [
  { id: "1", title: "Advanced Mathematics" },
  { id: "2", title: "English Composition" },
  { id: "3", title: "Physics 101" },
  { id: "4", title: "History of Art" },
];

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "+1 (555) 123-4567",
    courses: [
      {
        courseId: "1",
        courseName: "Advanced Mathematics",
        progress: 75,
        assignments: [
          { id: "1-1", title: "Calculus Fundamentals", dueDate: "2023-09-15", status: "graded", grade: 92 },
          { id: "1-2", title: "Linear Algebra", dueDate: "2023-10-01", status: "submitted" }
        ],
        attendance: 90
      },
      {
        courseId: "3",
        courseName: "Physics 101",
        progress: 60,
        assignments: [
          { id: "3-1", title: "Mechanics Quiz", dueDate: "2023-09-20", status: "submitted" }
        ],
        attendance: 85
      }
    ],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    paymentStatus: "paid",
    joinedDate: "2023-08-01"
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@example.com",
    phone: "+1 (555) 987-6543",
    courses: [
      {
        courseId: "2",
        courseName: "English Composition",
        progress: 45,
        assignments: [
          { id: "2-1", title: "Essay Draft", dueDate: "2023-09-25", status: "pending" }
        ],
        attendance: 70
      }
    ],
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    paymentStatus: "pending",
    joinedDate: "2023-08-15"
  },
  {
    id: "3",
    name: "Charlie Davis",
    email: "charlie.d@example.com",
    phone: "+1 (555) 234-5678",
    courses: [
      {
        courseId: "1",
        courseName: "Advanced Mathematics",
        progress: 30,
        assignments: [
          { id: "1-3", title: "Calculus Fundamentals", dueDate: "2023-09-15", status: "late" }
        ],
        attendance: 60
      },
      {
        courseId: "4",
        courseName: "History of Art",
        progress: 85,
        assignments: [
          { id: "4-1", title: "Renaissance Art Analysis", dueDate: "2023-09-10", status: "graded", grade: 88 },
          { id: "4-2", title: "Modern Art Movements", dueDate: "2023-09-30", status: "pending" }
        ],
        attendance: 95
      }
    ],
    status: "blocked",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    paymentStatus: "overdue",
    joinedDate: "2023-07-20"
  }
];

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState("all-students");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const studentFormFields: FormField[] = [
    { name: "name", label: "Full Name", type: "text", validation: { required: true } },
    { name: "email", label: "Email Address", type: "email", validation: { required: true } },
    { name: "phone", label: "Phone Number", type: "text" },
    // Course selection would be handled separately in a real implementation
  ];

  const handleAddStudent = (data: Partial<Student>) => {
    console.log("New student data:", data);
    toast({
      title: "Student Added",
      description: "New student has been added successfully and login credentials sent.",
    });
    setActiveTab("all-students");
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab("student-profile");
  };

  const handleToggleStatus = (student: Student) => {
    const newStatus = student.status === "active" ? "blocked" : "active";
    console.log(`Toggling status for ${student.name} to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `${student.name} has been ${newStatus === "active" ? "unblocked" : "blocked"}.`,
    });
  };

  // Filter students based on search and filters
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      searchQuery === "" || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = 
      !courseFilter || 
      student.courses.some(course => course.courseId === courseFilter);
    
    const matchesStatus = 
      !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const studentColumns: Column<Student>[] = [
    {
      header: "Student",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={row.original.profileImage}
              alt={row.original.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    { header: "Phone", accessorKey: "phone" },
    {
      header: "Payment",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        const statusColors = {
          paid: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          overdue: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[row.original.paymentStatus]
            }`}
          >
            {row.original.paymentStatus.charAt(0).toUpperCase() +
              row.original.paymentStatus.slice(1)}
          </span>
        );
      },
    },
    {
      header: "Courses",
      accessorKey: "courses",
      cell: ({ row }) => (
        <div>
          {row.original.courses.length > 0 ? (
            <span className="text-sm">
              {row.original.courses.length}{" "}
              {row.original.courses.length === 1 ? "course" : "courses"}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">No courses</span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "destructive"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewProfile(row.original)}
            title="View Profile"
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggleStatus(row.original)}
            title={
              row.original.status === "active" ? "Block Student" : "Unblock Student"
            }
          >
            {row.original.status === "active" ? (
              <UserX className="h-4 w-4" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage student enrollment and academic progress</p>
        </div>
        <Button onClick={() => {
          setSelectedStudent(null);
          setActiveTab("add-student");
        }} className="gap-2 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-students">All Students</TabsTrigger>
          <TabsTrigger value="add-student">Add Student</TabsTrigger>
          <TabsTrigger value="student-profile">Student Profile</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="all-students" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl font-semibold">All Students</CardTitle>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-1 text-sm border rounded-md w-full sm:w-auto"
                    />
                    <select
                      value={courseFilter || ""}
                      onChange={(e) => setCourseFilter(e.target.value || null)}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      <option value="">All Courses</option>
                      {mockCourses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                    <select
                      value={statusFilter || ""}
                      onChange={(e) => setStatusFilter(e.target.value || null)}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={filteredStudents}
                    columns={studentColumns}
                    pageSize={5}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="add-student" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <DataForm
                      fields={studentFormFields}
                      onSubmit={handleAddStudent}
                      submitLabel="Add Student & Create Account"
                    />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Course Selection</h3>
                      <div className="space-y-2">
                        {mockCourses.map((course) => (
                          <div key={course.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`course-${course.id}`} 
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label 
                              htmlFor={`course-${course.id}`}
                              className="text-sm"
                            >
                              {course.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Login credentials will be automatically sent to the student's email.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="student-profile" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedStudent ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={selectedStudent.profileImage} 
                            alt={selectedStudent.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>{selectedStudent.name}</CardTitle>
                          <CardDescription>{selectedStudent.email} • {selectedStudent.phone}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={selectedStudent.status === "active" ? "default" : "destructive"}
                      >
                        {selectedStudent.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Joined:</span>
                          <span className="text-sm">{selectedStudent.joinedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Payment Status:</span>
                          <Badge 
                            variant={
                              selectedStudent.paymentStatus === "paid" 
                                ? "default" 
                                : selectedStudent.paymentStatus === "pending" 
                                  ? "secondary" 
                                  : "destructive"
                            }
                          >
                            {selectedStudent.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Enrolled Courses:</span>
                          <span className="text-sm">{selectedStudent.courses.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">Course Progress</CardTitle>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedStudent.courses.map((course) => (
                          <div key={course.courseId} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{course.courseName}</span>
                              <span className="text-sm">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">Attendance</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedStudent.courses.map((course) => (
                          <div key={course.courseId} className="grid grid-cols-2 gap-2">
                            <span className="text-sm">{course.courseName}:</span>
                            <div className="flex items-center gap-2">
                              <Progress value={course.attendance} className="h-2 flex-1" />
                              <span className="text-sm font-medium">{course.attendance}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">Assignment Submissions</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-1 text-sm">Course</th>
                              <th className="text-left py-2 px-1 text-sm">Assignment</th>
                              <th className="text-left py-2 px-1 text-sm">Due Date</th>
                              <th className="text-left py-2 px-1 text-sm">Status</th>
                              <th className="text-left py-2 px-1 text-sm">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedStudent.courses.flatMap((course) =>
                              course.assignments.map((assignment) => (
                                <tr key={assignment.id} className="border-b">
                                  <td className="py-2 px-1 text-sm">{course.courseName}</td>
                                  <td className="py-2 px-1 text-sm">{assignment.title}</td>
                                  <td className="py-2 px-1 text-sm">{assignment.dueDate}</td>
                                  <td className="py-2 px-1 text-sm">
                                    <Badge 
                                      variant={
                                        assignment.status === "graded" 
                                          ? "default" 
                                          : assignment.status === "submitted" 
                                            ? "secondary" 
                                            : assignment.status === "pending"
                                              ? "outline"
                                              : "destructive"
                                      }
                                    >
                                      {assignment.status}
                                    </Badge>
                                  </td>
                                  <td className="py-2 px-1 text-sm">
                                    {assignment.grade !== undefined ? `${assignment.grade}%` : "-"}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <User className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Student Selected</h3>
                    <p className="text-muted-foreground">
                      Please select a student from the list to view their profile.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("all-students")} 
                      className="mt-6"
                    >
                      Go to Student List
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
