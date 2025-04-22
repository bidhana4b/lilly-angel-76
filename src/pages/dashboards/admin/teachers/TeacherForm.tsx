
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DataForm, FormField } from "@/components/ui/data-form/DataForm";
import { Teacher } from "./teachersData";

interface TeacherFormProps {
  teacher: Teacher | null;
  onSubmit: (data: Partial<Teacher>) => void;
}

export function TeacherForm({ teacher, onSubmit }: TeacherFormProps) {
  const teacherFormFields: FormField[] = [
    { name: "name", label: "Full Name", type: "text", validation: { required: true } },
    { name: "email", label: "Email Address", type: "email", validation: { required: true } },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "subject", label: "Subject Expertise", type: "text", validation: { required: true } },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {teacher ? "Edit Teacher" : "Add New Teacher"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataForm
          fields={teacherFormFields}
          onSubmit={onSubmit}
          submitLabel={teacher ? "Update Teacher" : "Add Teacher & Send Login"}
          defaultValues={teacher || {}}
        />
        {!teacher && (
          <p className="mt-2 text-sm text-muted-foreground">
            A temporary password will be generated and sent to the teacher's email.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
