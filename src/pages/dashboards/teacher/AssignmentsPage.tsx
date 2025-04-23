
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { UploadCloud, Edit, Trash, File, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const mockCourses = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
];

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  fileUrl?: string;
  deadline: Date;
}

const initialAssignments: Assignment[] = [
  {
    id: "a1",
    courseId: "c1",
    title: "HTML & CSS Basics",
    description: "Submit a styled web page (HTML+CSS)",
    fileUrl: "",
    deadline: new Date(2025, 4, 30),
  },
  {
    id: "a2",
    courseId: "c2",
    title: "React State Management",
    description: "Create a TODO app using useState and useReducer",
    fileUrl: "",
    deadline: new Date(2025, 5, 8),
  },
];

export default function AssignmentsPage() {
  const [tab, setTab] = useState("list");
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);

  // Dialog/Form state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);

  // Form inputs
  const [formCourseId, setFormCourseId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formDeadline, setFormDeadline] = useState<Date | undefined>(undefined);

  function resetForm() {
    setFormCourseId("");
    setFormTitle("");
    setFormDesc("");
    setFormFile(null);
    setFormDeadline(undefined);
    setCurrentAssignment(null);
    setIsEditMode(false);
  }
  function openCreate() {
    resetForm();
    setDialogOpen(true);
    setIsEditMode(false);
  }
  function openEdit(assignment: Assignment) {
    setCurrentAssignment(assignment);
    setFormCourseId(assignment.courseId);
    setFormTitle(assignment.title);
    setFormDesc(assignment.description);
    setFormDeadline(new Date(assignment.deadline));
    setDialogOpen(true);
    setIsEditMode(true);
  }
  function handleDelete(id: string) {
    setAssignments((prev) => prev.filter(a => a.id !== id));
  }
  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!formCourseId || !formTitle || !formDeadline) return;
    if (isEditMode && currentAssignment) {
      setAssignments(assignments.map(a =>
        a.id === currentAssignment.id
          ? { ...a, courseId: formCourseId, title: formTitle, description: formDesc, deadline: formDeadline }
          : a
      ));
    } else {
      setAssignments([
        ...assignments,
        {
          id: `a${Date.now()}`,
          courseId: formCourseId,
          title: formTitle,
          description: formDesc,
          fileUrl: formFile ? URL.createObjectURL(formFile) : "",
          deadline: formDeadline!,
        },
      ]);
    }
    setDialogOpen(false);
    resetForm();
  }
  const filteredAssignments = assignments.filter(a => {
    const courseMatch = filterCourse === "all" || a.courseId === filterCourse;
    const dateMatch = !filterDate || (a.deadline && a.deadline.toDateString() === filterDate.toDateString());
    return courseMatch && dateMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground">
            Create and manage assignments for your courses
          </p>
        </div>
        <Button onClick={openCreate}>
          <UploadCloud className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4 w-full md:w-auto grid grid-cols-2">
          <TabsTrigger value="list">All Assignments</TabsTrigger>
          <TabsTrigger value="create">Create Assignment</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4 transition-all animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>View and filter all assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label>Filter by Course</Label>
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {mockCourses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label>Filter by Date</Label>
                  <Calendar
                    mode="single"
                    selected={filterDate}
                    onSelect={setFilterDate}
                    className="border rounded-md pointer-events-auto"
                  />
                </div>
              </div>
              {(filteredAssignments.length > 0) ? (
                <div className="space-y-3">
                  {filteredAssignments.map(assign => {
                    const course = mockCourses.find(c => c.id === assign.courseId);
                    return (
                      <Card key={assign.id} className="flex-col md:flex-row flex justify-between items-center gap-y-3 transition-all animate-fade-in border p-4 mb-1">
                        <div className="flex-1">
                          <h4 className="font-medium">{assign.title}</h4>
                          <div className="text-sm text-muted-foreground">
                            <File className="inline-flex h-4 w-4 mr-1" /> {course?.title || "Course"}
                          </div>
                          <div className="text-xs text-muted-foreground">{assign.description}</div>
                        </div>
                        <div className="flex flex-col gap-2 text-xs min-w-fit">
                          <div className="flex gap-2 items-center">
                            <span>Due:</span>
                            <span className="rounded bg-accent/50 px-2 py-0.5">{format(assign.deadline, "PPP")}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEdit(assign)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(assign.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">No assignments found.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create" className="transition-all animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Assignment</CardTitle>
              <CardDescription>Fill in the details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmitForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={formCourseId} onValueChange={setFormCourseId}>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={formTitle} onChange={e => setFormTitle(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Input id="desc" value={formDesc} onChange={e => setFormDesc(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upload">File Upload</Label>
                  <Input id="upload" type="file" onChange={e => setFormFile(e.target.files?.[0] || null)} />
                </div>
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Calendar
                    mode="single"
                    selected={formDeadline}
                    onSelect={setFormDeadline}
                    className="border rounded-md pointer-events-auto"
                  />
                </div>
                <Button type="submit" className="mt-2">
                  <Check className="h-4 w-4 mr-2" />
                  {isEditMode ? "Update Assignment" : "Create Assignment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Assignment" : "Create Assignment"}</DialogTitle>
            <DialogDescription>Assignment details</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmitForm}>
            <Label className="block">Course</Label>
            <Select value={formCourseId} onValueChange={setFormCourseId}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className="block mt-2">Title</Label>
            <Input value={formTitle} onChange={e => setFormTitle(e.target.value)} required />
            <Label className="block mt-2">Description</Label>
            <Input value={formDesc} onChange={e => setFormDesc(e.target.value)} />
            <Label className="block mt-2">File Upload</Label>
            <Input type="file" onChange={e => setFormFile(e.target.files?.[0] || null)} />
            <Label className="block mt-2">Deadline</Label>
            <Calendar
              mode="single"
              selected={formDeadline}
              onSelect={setFormDeadline}
              className="border rounded-md pointer-events-auto"
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)} type="button">Cancel</Button>
              <Button type="submit">
                <Check className="h-4 w-4 mr-2" />
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
