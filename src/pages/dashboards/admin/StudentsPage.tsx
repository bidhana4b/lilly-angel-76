
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Plus, Users } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: string;
  joined: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@school.com",
    grade: "10",
    status: "Active",
    joined: "2024-03-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.s@school.com",
    grade: "11",
    status: "Active",
    joined: "2024-03-10",
  },
];

const studentColumns = [
  { header: "Name", accessorKey: "name" as keyof Student },
  { header: "Email", accessorKey: "email" as keyof Student },
  { header: "Grade", accessorKey: "grade" as keyof Student },
  { header: "Status", accessorKey: "status" as keyof Student },
  { header: "Joined", accessorKey: "joined" as keyof Student },
];

const studentFormFields = [
  { name: "name", label: "Full Name", type: "text" as const, validation: { required: true } },
  { name: "email", label: "Email", type: "email" as const, validation: { required: true } },
  { name: "grade", label: "Grade", type: "text" as const, validation: { required: true } },
];

export default function StudentsPage() {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (data: any) => {
    console.log("New student data:", data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Manage student enrollment and information</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <DataForm
              fields={studentFormFields}
              onSubmit={handleSubmit}
              submitLabel="Add Student"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">All Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DataTable
              data={mockStudents}
              columns={studentColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
