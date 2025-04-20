
import React from "react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  joined: string;
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Mathematics",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    subject: "English",
    status: "Active",
    joined: "2024-02-01",
  },
];

const teacherColumns = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
  { header: "Subject", accessorKey: "subject" },
  { header: "Status", accessorKey: "status" },
  { header: "Joined", accessorKey: "joined" },
];

const teacherFormFields = [
  { name: "name", label: "Full Name", type: "text" as const, validation: { required: true } },
  { name: "email", label: "Email", type: "email" as const, validation: { required: true } },
  { name: "subject", label: "Subject", type: "text" as const, validation: { required: true } },
];

export default function TeachersPage() {
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (data: any) => {
    console.log("New teacher data:", data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground">Manage your teaching staff</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <DataForm
              fields={teacherFormFields}
              onSubmit={handleSubmit}
              submitLabel="Add Teacher"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">All Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DataTable
              data={mockTeachers}
              columns={teacherColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
