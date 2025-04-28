
import React from "react";
import { Card } from "@/components/ui/card";
import CourseFormWizard from "@/components/course/CourseFormWizard";

interface CourseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CourseForm({ onSubmit, initialData }: CourseFormProps) {
  return (
    <Card className="border-none shadow-md animate-fade-in">
      <CourseFormWizard 
        onSubmit={onSubmit}
        initialData={initialData}
        mode="admin"
      />
    </Card>
  );
}
