
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Plus, FileText } from "lucide-react";

interface Syllabus {
  id: string;
  title: string;
  subject: string;
  grade: string;
  lastUpdated: string;
}

const mockSyllabus: Syllabus[] = [
  {
    id: "1",
    title: "Mathematics Grade 10",
    subject: "Mathematics",
    grade: "10",
    lastUpdated: "2024-04-15",
  },
  {
    id: "2",
    title: "English Literature Grade 11",
    subject: "English",
    grade: "11",
    lastUpdated: "2024-04-14",
  },
];

const syllabusColumns = [
  { header: "Title", accessorKey: "title" as keyof Syllabus },
  { header: "Subject", accessorKey: "subject" as keyof Syllabus },
  { header: "Grade", accessorKey: "grade" as keyof Syllabus },
  { header: "Last Updated", accessorKey: "lastUpdated" as keyof Syllabus },
];

const syllabusFormFields = [
  { name: "title", label: "Title", type: "text" as const, validation: { required: true } },
  { name: "subject", label: "Subject", type: "text" as const, validation: { required: true } },
  { name: "grade", label: "Grade", type: "text" as const, validation: { required: true } },
];

export default function SyllabusPage() {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (data: any) => {
    console.log("New syllabus data:", data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Syllabus Manager</h2>
          <p className="text-muted-foreground">Create and manage course syllabi</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Syllabus
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Syllabus</CardTitle>
          </CardHeader>
          <CardContent>
            <DataForm
              fields={syllabusFormFields}
              onSubmit={handleSubmit}
              submitLabel="Create Syllabus"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">All Syllabi</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DataTable
              data={mockSyllabus}
              columns={syllabusColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
