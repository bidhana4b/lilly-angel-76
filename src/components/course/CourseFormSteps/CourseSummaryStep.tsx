
import React from 'react';
import { CourseFormData } from '../CourseFormWizard';

interface StepProps {
  formData: CourseFormData;
  updateFormData: (data: Partial<CourseFormData>) => void;
  mode: string;
}

const CourseSummaryStep: React.FC<StepProps> = ({ formData, updateFormData, mode }) => {
  const handleTogglePublish = () => {
    updateFormData({ isPublished: !formData.isPublished });
  };

  const handleToggleFeatured = () => {
    updateFormData({ isFeatured: !formData.isFeatured });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Course Summary</h3>
      
      <div className="bg-gray-50 p-4 rounded-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Title</h4>
            <p>{formData.title || 'Not specified'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Category</h4>
            <p>{formData.category || 'Not specified'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Level</h4>
            <p className="capitalize">{formData.level || 'Not specified'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Duration</h4>
            <p>{formData.duration} {formData.durationUnit}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Price</h4>
            <p>
              {formData.price ? `$${formData.price}` : 'Free'}
              {formData.discountPrice && (
                <span className="ml-2 line-through text-gray-500">${formData.discountPrice}</span>
              )}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Short Description</h4>
          <p>{formData.shortDescription || 'Not specified'}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Modules</h4>
          <p>{formData.modules.length} modules, {formData.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Objectives</h4>
          {formData.objectives.length > 0 ? (
            <ul className="list-disc pl-5">
              {formData.objectives.map((obj) => (
                <li key={obj.id}>{obj.text}</li>
              ))}
            </ul>
          ) : (
            <p>No objectives specified</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Requirements</h4>
          {formData.requirements.length > 0 ? (
            <ul className="list-disc pl-5">
              {formData.requirements.map((req) => (
                <li key={req.id}>{req.text}</li>
              ))}
            </ul>
          ) : (
            <p>No requirements specified</p>
          )}
        </div>
      </div>

      {mode === "admin" && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <input
              id="isPublished"
              type="checkbox"
              checked={formData.isPublished || false}
              onChange={handleTogglePublish}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isPublished" className="font-medium">
              Published
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              id="isFeatured"
              type="checkbox"
              checked={formData.isFeatured || false}
              onChange={handleToggleFeatured}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isFeatured" className="font-medium">
              Featured
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSummaryStep;
