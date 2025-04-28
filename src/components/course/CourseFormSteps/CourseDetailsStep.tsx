
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CourseFormData } from '../CourseFormWizard';

interface StepProps {
  formData: CourseFormData;
  updateFormData: (data: Partial<CourseFormData>) => void;
  mode: string;
}

const CourseDetailsStep: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleAddObjective = () => {
    const newObjectives = [...formData.objectives, { 
      id: `obj-${formData.objectives.length + 1}`, 
      text: '' 
    }];
    updateFormData({ objectives: newObjectives });
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = { ...newObjectives[index], text: value };
    updateFormData({ objectives: newObjectives });
  };

  const handleRemoveObjective = (index: number) => {
    const newObjectives = [...formData.objectives];
    newObjectives.splice(index, 1);
    updateFormData({ objectives: newObjectives });
  };

  const handleAddRequirement = () => {
    const newRequirements = [...formData.requirements, { 
      id: `req-${formData.requirements.length + 1}`, 
      text: '' 
    }];
    updateFormData({ requirements: newRequirements });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = { ...newRequirements[index], text: value };
    updateFormData({ requirements: newRequirements });
  };

  const handleRemoveRequirement = (index: number) => {
    const newRequirements = [...formData.requirements];
    newRequirements.splice(index, 1);
    updateFormData({ requirements: newRequirements });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            placeholder="99.99"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discounted Price ($)</Label>
          <Input
            id="discountPrice"
            name="discountPrice"
            type="text"
            value={formData.discountPrice || ''}
            onChange={handleChange}
            placeholder="79.99"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            placeholder="8"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationUnit">Duration Unit</Label>
          <select
            id="durationUnit"
            name="durationUnit"
            value={formData.durationUnit || 'weeks'}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="text"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Course Objectives</Label>
          <button
            type="button"
            className="text-sm text-primary"
            onClick={handleAddObjective}
          >
            + Add Objective
          </button>
        </div>

        {formData.objectives.map((objective, index) => (
          <div key={objective.id} className="flex gap-2">
            <Input
              value={objective.text}
              onChange={(e) => handleObjectiveChange(index, e.target.value)}
              placeholder="What students will learn"
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveObjective(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Course Requirements</Label>
          <button
            type="button"
            className="text-sm text-primary"
            onClick={handleAddRequirement}
          >
            + Add Requirement
          </button>
        </div>

        {formData.requirements.map((requirement, index) => (
          <div key={requirement.id} className="flex gap-2">
            <Input
              value={requirement.text}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              placeholder="What students need to know before taking this course"
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveRequirement(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailsStep;
