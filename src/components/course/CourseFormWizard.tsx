
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Define CourseFormData interface
export interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: string;
  thumbnail: string;
  price: string;
  discountPrice?: string;
  duration: string;
  durationUnit?: string;
  teachers: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  studentCount?: number;
  rating?: number;
  reviewCount?: number;
  modules: {
    id: string;
    title: string;
    description: string;
    expanded: boolean;
    lessons: {
      id: string;
      title: string;
      duration: string;
      type: string;
    }[];
  }[];
  objectives: { id: string; text: string }[];
  requirements: { id: string; text: string }[];
  meta?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string;
  };
}

// Define props interface for the component
export interface CourseFormWizardProps {
  onSubmit: (data: any) => void;
  initialData?: CourseFormData;
  mode: string;
}

const CourseFormWizard: React.FC<CourseFormWizardProps> = ({ onSubmit, initialData, mode }) => {
  const defaultFormData: CourseFormData = {
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    level: "beginner",
    thumbnail: "",
    price: "",
    duration: "",
    durationUnit: "weeks",
    teachers: [],
    modules: [],
    objectives: [],
    requirements: []
  };

  // Use initialData if provided, otherwise use default form data
  const [formData, setFormData] = useState<CourseFormData>({
    ...defaultFormData,
    ...(initialData || {})
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Form Wizard</h2>
      <p className="text-gray-500">
        This is a placeholder for the Course Form Wizard component.
        The actual implementation would include multiple steps for creating/editing a course.
      </p>
      <Button onClick={handleSubmit}>
        {initialData ? 'Update Course' : 'Create Course'}
      </Button>
    </div>
  );
};

export default CourseFormWizard;
