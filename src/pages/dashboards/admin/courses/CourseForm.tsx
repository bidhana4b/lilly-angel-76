
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataForm } from "@/components/ui/data-form/DataForm";

const courseFormFields = [
  { 
    name: "title", 
    label: "Course Title", 
    type: "text" as const, 
    validation: { required: true } 
  },
  { 
    name: "description", 
    label: "Description", 
    type: "textarea" as const, 
    validation: { required: true } 
  },
  { 
    name: "duration", 
    label: "Duration", 
    type: "text" as const, 
    validation: { required: true } 
  },
  { 
    name: "category", 
    label: "Category", 
    type: "text" as const, 
    validation: { required: true } 
  },
  { 
    name: "thumbnail", 
    label: "Thumbnail Image URL", 
    type: "text" as const, 
    validation: { required: true } 
  },
  { 
    name: "teacher", 
    label: "Assign Teacher", 
    type: "text" as const, 
    validation: { required: true } 
  },
  { 
    name: "price", 
    label: "Price ($)", 
    type: "number" as const, 
    validation: { required: true, min: 0 } 
  }
];

interface CourseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CourseForm({ onSubmit, initialData }: CourseFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Course" : "Add New Course"}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataForm
          fields={courseFormFields}
          onSubmit={onSubmit}
          submitLabel={initialData ? "Update Course" : "Create Course"}
          defaultValues={initialData}
        />
      </CardContent>
    </Card>
  );
}
