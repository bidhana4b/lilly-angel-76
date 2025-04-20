
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Plus, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacher: string;
  students: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Mathematics",
    subject: "Mathematics",
    grade: "10",
    teacher: "John Smith",
    students: 25,
  },
  {
    id: "2",
    title: "English Literature",
    subject: "English",
    grade: "11",
    teacher: "Emma Wilson",
    students: 22,
  },
];

const courseColumns = [
  { header: "Title", accessorKey: "title" as keyof Course },
  { header: "Subject", accessorKey: "subject" as keyof Course },
  { header: "Grade", accessorKey: "grade" as keyof Course },
  { header: "Teacher", accessorKey: "teacher" as keyof Course },
  { header: "Students", accessorKey: "students" as keyof Course },
];

const courseFormFields = [
  { name: "title", label: "Course Title", type: "text" as const, validation: { required: true } },
  { name: "subject", label: "Subject", type: "text" as const, validation: { required: true } },
  { name: "grade", label: "Grade", type: "text" as const, validation: { required: true } },
  { name: "teacher", label: "Teacher", type: "text" as const, validation: { required: true } },
];

export default function CoursesPage() {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (data: any) => {
    console.log("New course data:", data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage course offerings and assignments</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <DataForm
              fields={courseFormFields}
              onSubmit={handleSubmit}
              submitLabel="Create Course"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">All Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DataTable
              data={mockCourses}
              columns={courseColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
