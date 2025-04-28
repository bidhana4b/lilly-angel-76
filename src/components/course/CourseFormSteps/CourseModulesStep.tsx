
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CourseFormData } from '../CourseFormWizard';

interface StepProps {
  formData: CourseFormData;
  updateFormData: (data: Partial<CourseFormData>) => void;
  mode: string;
}

const CourseModulesStep: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleAddModule = () => {
    const newModules = [
      ...formData.modules,
      {
        id: `module-${formData.modules.length + 1}`,
        title: '',
        description: '',
        expanded: true,
        lessons: []
      }
    ];
    updateFormData({ modules: newModules });
  };

  const handleRemoveModule = (index: number) => {
    const newModules = [...formData.modules];
    newModules.splice(index, 1);
    updateFormData({ modules: newModules });
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const newModules = [...formData.modules];
    newModules[index] = { ...newModules[index], [field]: value };
    updateFormData({ modules: newModules });
  };

  const toggleModuleExpanded = (index: number) => {
    const newModules = [...formData.modules];
    newModules[index].expanded = !newModules[index].expanded;
    updateFormData({ modules: newModules });
  };

  const handleAddLesson = (moduleIndex: number) => {
    const newModules = [...formData.modules];
    newModules[moduleIndex].lessons = [
      ...newModules[moduleIndex].lessons,
      {
        id: `lesson-${newModules[moduleIndex].lessons.length + 1}`,
        title: '',
        duration: '',
        type: 'video'
      }
    ];
    updateFormData({ modules: newModules });
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    const newModules = [...formData.modules];
    newModules[moduleIndex].lessons.splice(lessonIndex, 1);
    updateFormData({ modules: newModules });
  };

  const handleLessonChange = (
    moduleIndex: number,
    lessonIndex: number,
    field: string,
    value: string
  ) => {
    const newModules = [...formData.modules];
    newModules[moduleIndex].lessons[lessonIndex] = {
      ...newModules[moduleIndex].lessons[lessonIndex],
      [field]: value
    };
    updateFormData({ modules: newModules });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Course Modules</h3>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddModule}
        >
          Add Module
        </Button>
      </div>

      {formData.modules.length === 0 && (
        <div className="text-center py-8 border border-dashed rounded-md">
          <p className="text-muted-foreground">No modules added yet. Add your first module to get started.</p>
        </div>
      )}

      {formData.modules.map((module, moduleIndex) => (
        <div key={module.id} className="border rounded-md p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Module {moduleIndex + 1}</h4>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => toggleModuleExpanded(moduleIndex)}
              >
                {module.expanded ? '▼' : '►'}
              </button>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveModule(moduleIndex)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`module-${moduleIndex}-title`}>Title</Label>
              <Input
                id={`module-${moduleIndex}-title`}
                value={module.title}
                onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                placeholder="Module title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`module-${moduleIndex}-description`}>Description</Label>
              <Textarea
                id={`module-${moduleIndex}-description`}
                value={module.description}
                onChange={(e) => handleModuleChange(moduleIndex, 'description', e.target.value)}
                placeholder="Module description"
                rows={2}
              />
            </div>
          </div>

          {module.expanded && (
            <div className="mt-4 pl-4 border-l">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium">Lessons</h5>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddLesson(moduleIndex)}
                >
                  Add Lesson
                </Button>
              </div>

              {module.lessons.length === 0 && (
                <div className="text-center py-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground">No lessons added yet.</p>
                </div>
              )}

              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="p-3 border rounded-md mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-sm font-medium">Lesson {lessonIndex + 1}</h6>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <Input
                        value={lesson.title}
                        onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                        placeholder="Lesson title"
                      />
                    </div>
                    <div>
                      <Input
                        value={lesson.duration}
                        onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', e.target.value)}
                        placeholder="Duration (00:00)"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <select
                      value={lesson.type}
                      onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'type', e.target.value)}
                      className="flex w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="video">Video</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                      <option value="text">Reading</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseModulesStep;
