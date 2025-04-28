
import React from "react";
import { Card } from "@/components/ui/card";
import CourseFormWizard, { CourseFormWizardProps } from "@/components/course/CourseFormWizard";

interface CourseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  mode: string;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, initialData, mode }) => {
  return (
    <Card className="border-none shadow-md animate-fade-in">
      <CourseFormWizard 
        onSubmit={onSubmit}
        initialData={initialData}
        mode={mode}
      />
    </Card>
  );
};

export default CourseForm;
