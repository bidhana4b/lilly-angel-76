
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CourseBasicInfoStep from './CourseFormSteps/CourseBasicInfoStep';
import CourseDetailsStep from './CourseFormSteps/CourseDetailsStep';
import CourseModulesStep from './CourseFormSteps/CourseModulesStep';
import CourseSummaryStep from './CourseFormSteps/CourseSummaryStep';

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

  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { name: 'Basic Info', component: CourseBasicInfoStep },
    { name: 'Details', component: CourseDetailsStep },
    { name: 'Modules', component: CourseModulesStep },
    { name: 'Summary', component: CourseSummaryStep }
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<CourseFormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{initialData ? 'Edit Course' : 'Create New Course'}</h2>
        <p className="text-gray-500 mt-1">
          {currentStep + 1} of {steps.length}: {steps[currentStep].name}
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div 
                className={`flex flex-col items-center ${index <= currentStep ? 'text-primary' : 'text-gray-400'}`}
              >
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep ? 'bg-primary text-white' : 
                    index === currentStep ? 'border-2 border-primary text-primary' : 
                    'border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-xs mt-1">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="py-4 border-t border-b">
        <CurrentStepComponent 
          formData={formData}
          updateFormData={updateFormData}
          mode={mode}
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePreviousStep} 
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNextStep}>Next</Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            variant="default"
          >
            {initialData ? 'Update Course' : 'Create Course'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseFormWizard;
