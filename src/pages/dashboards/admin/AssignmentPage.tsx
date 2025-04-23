import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  ClipboardList, 
  Download, 
  Search, 
  CheckCircle, 
  Clock, 
  User, 
  FileText,
  Filter
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  course: string;
  teacher: string;
  dueDate: Date;
  submissionCount: number;
  totalStudents: number;
  status: "active" | "past" | "upcoming";
}

interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  submissionDate: Date;
  gradingStatus: "graded" | "pending" | "reviewing";
  score?: number;
  fileUrl: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Fundamentals Quiz",
    course: "Mathematics Grade 10",
    teacher: "John Smith",
    dueDate: new Date(2025, 3, 25),
    submissionCount: 18,
    totalStudents: 24,
    status: "active"
  },
  {
    id: "2",
    title: "Essay on Shakespeare",
    course: "English Literature Grade 11",
    teacher: "Maria Garcia",
    dueDate: new Date(2025, 3, 30),
    submissionCount: 12,
    totalStudents: 18,
    status: "upcoming"
  },
  {
    id: "3",
    title: "Physics Lab Report",
    course: "Physics Grade 12",
    teacher: "David Johnson",
    dueDate: new Date(2025, 3, 15),
    submissionCount: 16,
    totalStudents: 16,
    status: "past"
  },
  {
    id: "4",
    title: "Chemistry Experiment Analysis",
    course: "Chemistry Grade 10",
    teacher: "Sarah Wilson",
    dueDate: new Date(2025, 3, 28),
    submissionCount: 14,
    totalStudents: 22,
    status: "active"
  },
];

const mockSubmissions: Record<string, Submission[]> = {
  "1": [
    {
      id: "s1",
      studentName: "Alice Johnson",
      studentId: "ST001",
      submissionDate: new Date(2025, 3, 20),
      gradingStatus: "graded",
      score: 92,
      fileUrl: "/submissions/alice-algebra.pdf"
    },
    {
      id: "s2",
      studentName: "Bob Smith",
      studentId: "ST002",
      submissionDate: new Date(2025, 3, 21),
      gradingStatus: "pending",
      fileUrl: "/submissions/bob-algebra.pdf"
    },
    {
      id: "s3",
      studentName: "Charlie Brown",
      studentId: "ST003",
      submissionDate: new Date(2025, 3, 22),
      gradingStatus: "reviewing",
      fileUrl: "/submissions/charlie-algebra.pdf"
    },
  ],
  "2": [
    {
      id: "s4",
      studentName: "Diana Prince",
      studentId: "ST004",
      submissionDate: new Date(2025, 3, 28),
      gradingStatus: "pending",
      fileUrl: "/submissions/diana-essay.pdf"
    },
    {
      id: "s5",
      studentName: "Ethan Hunt",
      studentId: "ST005",
      submissionDate: new Date(2025, 3, 29),
      gradingStatus: "pending",
      fileUrl: "/submissions/ethan-essay.pdf"
    },
  ],
};

const mockTeachers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Maria Garcia" },
  { id: "3", name: "David Johnson" },
  { id: "4", name: "Sarah Wilson" },
  { id: "5", name: "Michael Brown" },
];

const assignmentColumns: Column<Assignment>[] = [
  { header: "Title", accessorKey: "title" },
  { header: "Course", accessorKey: "course" },
  { header: "Teacher", accessorKey: "teacher" },
  { 
    header: "Due Date", 
    accessorKey: "dueDate",
    cell: (row: Assignment) => format(row.dueDate, "MMM d, yyyy") 
  },
  { 
    header: "Submissions", 
    accessorKey: "submissionCount",
    cell: (row: Assignment) => `${row.submissionCount}/${row.totalStudents}`
  },
  { 
    header: "Status", 
    accessorKey: "status",
    cell: (row: Assignment) => {
      const statusColors = {
        active: "bg-green-100 text-green-800",
        upcoming: "bg-blue-100 text-blue-800",
        past: "bg-gray-100 text-gray-800"
      };
      const statusLabels = {
        active: "Active",
        upcoming: "Upcoming",
        past: "Past"
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {statusLabels[row.status]}
        </span>
      );
    }
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (row: Assignment) => (
      <Button variant="outline" size="sm">
        View Submissions
      </Button>
    )
  }
];

const submissionColumns: Column<Submission>[] = [
  { header: "Student", accessorKey: "studentName" },
  { header: "Student ID", accessorKey: "studentId" },
  { 
    header: "Submission Date", 
    accessorKey: "submissionDate",
    cell: (row: Submission) => format(row.submissionDate, "MMM d, yyyy h:mm a") 
  },
  { 
    header: "Status", 
    accessorKey: "gradingStatus",
    cell: (row: Submission) => {
      const statusIcons = {
        graded: <CheckCircle className="h-4 w-4 text-green-500" />,
        pending: <Clock className="h-4 w-4 text-amber-500" />,
        reviewing: <User className="h-4 w-4 text-blue-500" />
      };
      
      const statusLabels = {
        graded: "Graded",
        pending: "Pending",
        reviewing: "Reviewing"
      };
      
      return (
        <div className="flex items-center gap-2">
          {statusIcons[row.gradingStatus]}
          <span>{statusLabels[row.gradingStatus]}</span>
          {row.score !== undefined && (
            <Badge variant="outline" className="ml-2">{row.score}%</Badge>
          )}
        </div>
      );
    }
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (row: Submission) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
        {row.gradingStatus === "pending" && (
          <Button variant="outline" size="sm">
            Assign Reviewer
          </Button>
        )}
      </div>
    )
  }
];

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState("all-assignments");
  const [filteredCourse, setFilteredCourse] = useState("");
  const [filteredTeacher, setFilteredTeacher] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState<Submission[]>([]);

  // Filter assignments
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesCourse = !filteredCourse || assignment.course === filteredCourse;
    const matchesTeacher = !filteredTeacher || assignment.teacher === filteredTeacher;
    const matchesStatus = !filteredStatus || assignment.status === filteredStatus;
    const matchesSearch = !searchTerm || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCourse && matchesTeacher && matchesStatus && matchesSearch;
  });

  // Group assignments by course
  const assignmentsByCourse = filteredAssignments.reduce<Record<string, Assignment[]>>((acc, assignment) => {
    if (!acc[assignment.course]) {
      acc[assignment.course] = [];
    }
    acc[assignment.course].push(assignment);
    return acc;
  }, {});

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSelectedSubmissions(mockSubmissions[assignment.id] || []);
    setActiveTab("view-submissions");
  };

  // Override the action cell to add our custom handler
  const assignmentColumnsWithAction = assignmentColumns.map(col => 
    col.accessorKey === "actions" 
      ? { 
          ...col, 
          cell: (row: Assignment) => (
            <Button variant="outline" size="sm" onClick={() => handleViewSubmissions(row)}>
              View Submissions
            </Button>
          )
        } 
      : col
  );

  const handleBackToAssignments = () => {
    setSelectedAssignment(null);
    setActiveTab("all-assignments");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignment Monitor</h2>
          <p className="text-muted-foreground">Track and manage student assignments</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="all-assignments">All Assignments</TabsTrigger>
          <TabsTrigger value="by-course">Assignments by Course</TabsTrigger>
          <TabsTrigger value="view-submissions" disabled={!selectedAssignment}>
            View Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-assignments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Assignments</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search assignments..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Select value={filteredCourse} onValueChange={setFilteredCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {Array.from(new Set(mockAssignments.map(a => a.course))).map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={filteredTeacher} onValueChange={setFilteredTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teachers</SelectItem>
                      {Array.from(new Set(mockAssignments.map(a => a.teacher))).map((teacher) => (
                        <SelectItem key={teacher} value={teacher}>
                          {teacher}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filteredStatus === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilteredStatus("")}
                >
                  All
                </Button>
                <Button
                  variant={filteredStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilteredStatus("active")}
                  className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
                >
                  Active
                </Button>
                <Button
                  variant={filteredStatus === "upcoming" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilteredStatus("upcoming")}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
                >
                  Upcoming
                </Button>
                <Button
                  variant={filteredStatus === "past" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilteredStatus("past")}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                >
                  Past
                </Button>
              </div>

              <DataTable
                data={filteredAssignments}
                columns={assignmentColumnsWithAction}
                pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-course" className="space-y-6">
          {Object.entries(assignmentsByCourse).length > 0 ? (
            Object.entries(assignmentsByCourse).map(([course, assignments]) => (
              <Card key={course} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-lg">{course}</CardTitle>
                  <CardDescription>{assignments.length} assignments</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {assignment.teacher} • Due {format(assignment.dueDate, "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Submissions:</span>
                            <span className="font-medium">{assignment.submissionCount}/{assignment.totalStudents}</span>
                            <span 
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                assignment.status === "active" ? "bg-green-100 text-green-800" :
                                assignment.status === "upcoming" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewSubmissions(assignment)}>
                          View Submissions
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No assignments found for the selected filters
            </div>
          )}
        </TabsContent>

        <TabsContent value="view-submissions" className="space-y-4">
          {selectedAssignment && (
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div>
                  <Button variant="ghost" size="sm" className="mb-2 -ml-2" onClick={handleBackToAssignments}>
                    ← Back to Assignments
                  </Button>
                  <CardTitle className="text-xl">{selectedAssignment.title}</CardTitle>
                  <CardDescription>{selectedAssignment.course} • {selectedAssignment.teacher}</CardDescription>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Due Date: {format(selectedAssignment.dueDate, "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Submissions: {selectedAssignment.submissionCount}/{selectedAssignment.totalStudents}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Student Submissions</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download All
                        </Button>
                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Submissions</SelectItem>
                            <SelectItem value="graded">Graded</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewing">Reviewing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DataTable
                      data={selectedSubmissions}
                      columns={submissionColumns}
                      pageSize={10}
                    />

                    <div>
                      <h3 className="font-medium mb-2">Assign Reviewer</h3>
                      <div className="flex gap-3">
                        <Select>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select Teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockTeachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button>Assign to Review</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No submissions found for this assignment
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
