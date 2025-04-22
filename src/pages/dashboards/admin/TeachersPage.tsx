
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { DataForm, FormField } from "@/components/ui/data-form/DataForm";
import { Plus, User, Edit, UserCheck, UserX, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: "active" | "inactive" | "blocked";
  profileImage: string;
  assignedCourses: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: ["1", "3"]
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 987-6543",
    subject: "English Literature",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: ["2"]
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Physics",
    status: "blocked",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: []
  }
];

const mockCourses: Course[] = [
  { id: "1", title: "Advanced Mathematics", description: "Calculus and Linear Algebra" },
  { id: "2", title: "English Composition", description: "Writing and Literature Analysis" },
  { id: "3", title: "Physics 101", description: "Introduction to Physics" },
  { id: "4", title: "History of Art", description: "Renaissance to Modern Art" },
];

export default function TeachersPage() {
  const [activeTab, setActiveTab] = useState("all-teachers");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { toast } = useToast();

  const teacherFormFields: FormField[] = [
    { name: "name", label: "Full Name", type: "text", validation: { required: true } },
    { name: "email", label: "Email Address", type: "email", validation: { required: true } },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "subject", label: "Subject Expertise", type: "text", validation: { required: true } },
    // Image upload would be handled separately in a real implementation
  ];

  const handleAddTeacher = (data: Partial<Teacher>) => {
    console.log("New teacher data:", data);
    toast({
      title: "Teacher Added",
      description: "New teacher has been added successfully and login credentials sent.",
    });
    setActiveTab("all-teachers");
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveTab("add-teacher");
  };

  const handleToggleStatus = (teacher: Teacher) => {
    const newStatus = teacher.status === "active" ? "blocked" : "active";
    console.log(`Toggling status for ${teacher.name} to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `${teacher.name} has been ${newStatus === "active" ? "unblocked" : "blocked"}.`,
    });
  };

  const handleSelectTeacherForCourse = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedCourses(teacher.assignedCourses);
    setActiveTab("assign-courses");
  };

  const handleAssignCourses = () => {
    if (!selectedTeacher) return;
    console.log(`Assigning courses for ${selectedTeacher.name}:`, selectedCourses);
    toast({
      title: "Courses Assigned",
      description: `Updated course assignments for ${selectedTeacher.name}`,
    });
    setActiveTab("all-teachers");
    setSelectedTeacher(null);
  };

  // Filter teachers based on search and filters
  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = 
      searchQuery === "" || 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = 
      !subjectFilter || teacher.subject === subjectFilter;
    
    const matchesStatus = 
      !statusFilter || teacher.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const teacherColumns: Column<Teacher>[] = [
    { 
      header: "Teacher", 
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={row.profileImage} 
              alt={row.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    { header: "Phone", accessorKey: "phone" },
    { header: "Subject", accessorKey: "subject" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (row) => (
        <Badge 
          variant={row.status === "active" ? "default" : "destructive"}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEditTeacher(row)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleToggleStatus(row)}
            className="h-8 w-8 p-0"
          >
            {row.status === "active" ? (
              <UserX className="h-4 w-4" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
            <span className="sr-only">
              {row.status === "active" ? "Block" : "Unblock"}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleSelectTeacherForCourse(row)}
            className="h-8 w-8 p-0"
          >
            <Book className="h-4 w-4" />
            <span className="sr-only">Assign Courses</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground">Manage your teaching staff and course assignments</p>
        </div>
        <Button onClick={() => {
          setSelectedTeacher(null);
          setActiveTab("add-teacher");
        }} className="gap-2 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-teachers">All Teachers</TabsTrigger>
          <TabsTrigger value="add-teacher">
            {selectedTeacher ? "Edit Teacher" : "Add Teacher"}
          </TabsTrigger>
          <TabsTrigger value="assign-courses">Assign Courses</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="all-teachers" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-xl font-semibold">All Teachers</CardTitle>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search teachers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-1 text-sm border rounded-md w-full sm:w-auto"
                    />
                    <select
                      value={subjectFilter || ""}
                      onChange={(e) => setSubjectFilter(e.target.value || null)}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      <option value="">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="English Literature">English Literature</option>
                      <option value="Physics">Physics</option>
                    </select>
                    <select
                      value={statusFilter || ""}
                      onChange={(e) => setStatusFilter(e.target.value || null)}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={filteredTeachers}
                    columns={teacherColumns}
                    pageSize={5}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="add-teacher" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedTeacher ? "Edit Teacher" : "Add New Teacher"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataForm
                    fields={teacherFormFields}
                    onSubmit={handleAddTeacher}
                    submitLabel={selectedTeacher ? "Update Teacher" : "Add Teacher & Send Login"}
                    defaultValues={selectedTeacher || {}}
                  />
                  {!selectedTeacher && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      A temporary password will be generated and sent to the teacher's email.
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="assign-courses" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Assign Courses to Teacher</CardTitle>
                  {selectedTeacher && (
                    <p className="text-muted-foreground">
                      Assigning courses for: {selectedTeacher.name}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedTeacher ? (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        {mockCourses.map((course) => (
                          <div key={course.id} className="flex items-start space-x-2">
                            <Checkbox 
                              id={`course-${course.id}`}
                              checked={selectedCourses.includes(course.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCourses([...selectedCourses, course.id]);
                                } else {
                                  setSelectedCourses(
                                    selectedCourses.filter((id) => id !== course.id)
                                  );
                                }
                              }}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`course-${course.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {course.title}
                              </label>
                              <p className="text-sm text-muted-foreground">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button onClick={handleAssignCourses} className="mt-4">
                        Save Course Assignments
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <User className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2">Select a teacher first to assign courses</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
