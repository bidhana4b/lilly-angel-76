
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Plus, X, Edit, Book, Star, Clock, Users, Video, ChevronDown, ChevronUp } from "lucide-react";
import CoursePreview from "./CoursePreview";

// Categories list for dropdown
const categoriesList = [
  "Mathematics", 
  "Language", 
  "Science", 
  "Marketing", 
  "Technology", 
  "Business", 
  "Arts", 
  "Health"
];

// Difficulty levels
const difficultyLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// Mock data for teachers
const teachersList = [
  { id: "1", name: "John Smith", department: "Mathematics" },
  { id: "2", name: "Emma Wilson", department: "English" },
  { id: "3", name: "Robert Johnson", department: "Science" },
  { id: "4", name: "Sarah Parker", department: "Marketing" },
  { id: "5", name: "Michael Brown", department: "Computer Science" },
];

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  expanded: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "text" | "assignment";
}

interface Objective {
  id: string;
  text: string;
}

interface Requirement {
  id: string;
  text: string;
}

export interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: string;
  thumbnail: string;
  previewVideo?: string;
  price: string;
  discountPrice?: string;
  duration: string;
  durationUnit: string;
  enrollmentLimit?: string;
  startDate?: string;
  endDate?: string;
  isFeatured: boolean;
  isPublished: boolean;
  teachers: string[];
  modules: Module[];
  objectives: Objective[];
  requirements: Requirement[];
  meta: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string;
  }
}

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  initialData?: Partial<CourseFormData>;
  mode?: "admin" | "teacher";
}

const CourseFormWizard: React.FC<CourseFormProps> = ({ 
  onSubmit, 
  initialData = {},
  mode = "admin"
}) => {
  // Create default data structure with initialData or empty values
  const [activeTab, setActiveTab] = useState("basic");
  // Fix the spread type error by explicitly typing the default values
  const defaultFormData: CourseFormData = {
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "beginner",
    thumbnail: "",
    previewVideo: "",
    price: "",
    discountPrice: "",
    duration: "",
    durationUnit: "weeks",
    enrollmentLimit: "",
    startDate: "",
    endDate: "",
    isFeatured: false,
    isPublished: false,
    teachers: [],
    modules: [],
    objectives: [],
    requirements: [],
    meta: {
      seoTitle: "",
      seoDescription: "",
      keywords: ""
    }
  };
  
  const [formData, setFormData] = useState<CourseFormData>({
    ...defaultFormData,
    // Fix the spread type error by using a conditional to ensure initialData is an object
    ...(initialData ? initialData : {})
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData && initialData.thumbnail ? initialData.thumbnail : null
  );
  
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties like meta.seoTitle
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CourseFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTeacherChange = (teacherId: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return { ...prev, teachers: [...prev.teachers, teacherId] };
      } else {
        return { ...prev, teachers: prev.teachers.filter(id => id !== teacherId) };
      }
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
        setFormData(prev => ({ ...prev, thumbnail: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new module
  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: `New Module`,
      description: "",
      lessons: [],
      expanded: true
    };
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };

  // Handle updating a module
  const updateModule = (moduleId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    }));
  };

  // Handle removing a module
  const removeModule = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }));
  };

  // Toggle module expansion
  const toggleModuleExpansion = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId ? { ...module, expanded: !module.expanded } : module
      )
    }));
  };

  // Handle adding a lesson to a module
  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "New Lesson",
      duration: "00:30",
      type: "video"
    };
    
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, lessons: [...module.lessons, newLesson] } 
          : module
      )
    }));
  };

  // Handle updating a lesson
  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              lessons: module.lessons.map(lesson => 
                lesson.id === lessonId 
                  ? { ...lesson, [field]: value } 
                  : lesson
              ) 
            } 
          : module
      )
    }));
  };

  // Handle removing a lesson
  const removeLesson = (moduleId: string, lessonId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              lessons: module.lessons.filter(lesson => lesson.id !== lessonId) 
            } 
          : module
      )
    }));
  };

  // Handle adding an objective
  const addObjective = () => {
    const newObjective: Objective = {
      id: `objective-${Date.now()}`,
      text: ""
    };
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObjective]
    }));
  };

  // Handle updating an objective
  const updateObjective = (id: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj => 
        obj.id === id ? { ...obj, text } : obj
      )
    }));
  };

  // Handle removing an objective
  const removeObjective = (id: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter(obj => obj.id !== id)
    }));
  };

  // Handle adding a requirement
  const addRequirement = () => {
    const newRequirement: Requirement = {
      id: `requirement-${Date.now()}`,
      text: ""
    };
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement]
    }));
  };

  // Handle updating a requirement
  const updateRequirement = (id: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map(req => 
        req.id === id ? { ...req, text } : req
      )
    }));
  };

  // Handle removing a requirement
  const removeRequirement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format duration with unit
    const formattedData = {
      ...formData,
      duration: `${formData.duration} ${formData.durationUnit}`,
    };
    onSubmit(formattedData);
  };

  // Calculate lesson count and total duration
  const totalLessons = formData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  
  const totalDuration = formData.modules.reduce((acc, module) => {
    const moduleDuration = module.lessons.reduce((lessonAcc, lesson) => {
      // Parse duration like "00:30" into minutes
      const [hours, minutes] = lesson.duration.split(':').map(Number);
      return lessonAcc + (hours * 60) + minutes;
    }, 0);
    return acc + moduleDuration;
  }, 0);
  
  // Format total duration in hours and minutes
  const formattedTotalDuration = `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {initialData.id ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-muted-foreground">
            Fill in the details to {initialData.id ? "update" : "create"} your course
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div>
          <Card className="border-none shadow-md">
            <CardHeader className="pb-4">
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <TabsContent value="basic" className="space-y-4">
                    {/* Basic Info Tab */}
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter course title"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shortDescription">Short Description</Label>
                      <Input
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        placeholder="Brief overview of the course"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Full Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Detailed description of the course content"
                        required
                        className="mt-1 min-h-[150px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10 px-3 py-2 rounded-md border border-input"
                          required
                        >
                          <option value="" disabled>Select a category</option>
                          {categoriesList.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="level">Course Level</Label>
                        <select
                          id="level"
                          name="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10 px-3 py-2 rounded-md border border-input"
                          required
                        >
                          {difficultyLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Learning Objectives</Label>
                      <div className="space-y-2 mt-2">
                        {formData.objectives.map((objective) => (
                          <div key={objective.id} className="flex items-center gap-2">
                            <Input
                              value={objective.text}
                              onChange={(e) => updateObjective(objective.id, e.target.value)}
                              placeholder="What students will learn..."
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeObjective(objective.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addObjective}
                          className="w-full mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Learning Objective
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-6">
                    {/* Course Curriculum Tab */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-semibold">Course Modules</Label>
                        <div className="text-sm text-muted-foreground">
                          {totalLessons} Lessons • {formattedTotalDuration}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {formData.modules.map((module) => (
                          <div key={module.id} className="border rounded-md p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleModuleExpansion(module.id)}
                                  className="p-1 h-auto"
                                >
                                  {module.expanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </Button>
                                <Input
                                  value={module.title}
                                  onChange={(e) => updateModule(module.id, "title", e.target.value)}
                                  placeholder="Module Title"
                                  className="font-medium border-none shadow-none focus-visible:ring-0 p-0 text-base"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeModule(module.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {module.expanded && (
                              <div className="mt-2 space-y-2">
                                <div>
                                  <Label htmlFor={`module-desc-${module.id}`} className="sr-only">
                                    Module Description
                                  </Label>
                                  <Textarea
                                    id={`module-desc-${module.id}`}
                                    value={module.description}
                                    onChange={(e) => updateModule(module.id, "description", e.target.value)}
                                    placeholder="Module description"
                                    className="h-20 resize-none"
                                  />
                                </div>
                                
                                <div className="space-y-2 pl-4">
                                  {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center gap-2 border-l-2 border-gray-200 pl-2">
                                      <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
                                        {lesson.type === "video" ? (
                                          <Video className="w-4 h-4" />
                                        ) : lesson.type === "quiz" ? (
                                          <Book className="w-4 h-4" />
                                        ) : (
                                          <Book className="w-4 h-4" />
                                        )}
                                      </div>
                                      <Input
                                        value={lesson.title}
                                        onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                                        placeholder="Lesson title"
                                        className="flex-1"
                                      />
                                      <Input
                                        value={lesson.duration}
                                        onChange={(e) => updateLesson(module.id, lesson.id, "duration", e.target.value)}
                                        placeholder="Duration (HH:MM)"
                                        className="w-20"
                                      />
                                      <select
                                        value={lesson.type}
                                        onChange={(e) => updateLesson(
                                          module.id, 
                                          lesson.id, 
                                          "type", 
                                          e.target.value as "video" | "quiz" | "text" | "assignment"
                                        )}
                                        className="h-9 rounded-md border border-input px-2 py-1 text-sm"
                                      >
                                        <option value="video">Video</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="text">Text</option>
                                        <option value="assignment">Assignment</option>
                                      </select>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeLesson(module.id, lesson.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addLesson(module.id)}
                                    className="ml-2"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add Lesson
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addModule}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Module
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="space-y-4">
                    {/* Requirements Tab */}
                    <div>
                      <Label>Course Requirements</Label>
                      <div className="space-y-2 mt-2">
                        {formData.requirements.map((requirement) => (
                          <div key={requirement.id} className="flex items-center gap-2">
                            <Input
                              value={requirement.text}
                              onChange={(e) => updateRequirement(requirement.id, e.target.value)}
                              placeholder="Required prerequisite..."
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeRequirement(requirement.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addRequirement}
                          className="w-full mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Requirement
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          name="duration"
                          type="number"
                          value={formData.duration}
                          onChange={handleInputChange}
                          placeholder="Duration"
                          min="1"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="durationUnit">Unit</Label>
                        <select
                          id="durationUnit"
                          name="durationUnit"
                          value={formData.durationUnit}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10 px-3 py-2 rounded-md border border-input"
                          required
                        >
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                          <option value="days">Days</option>
                          <option value="hours">Hours</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4">
                    {/* Media Tab */}
                    <div>
                      <Label htmlFor="thumbnail">Course Thumbnail</Label>
                      <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                        {thumbnailPreview ? (
                          <div className="relative w-full">
                            <img
                              src={thumbnailPreview}
                              alt="Course thumbnail preview"
                              className="w-full h-[180px] object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setThumbnailPreview(null);
                                setFormData((prev) => ({ ...prev, thumbnail: "" }));
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label
                            htmlFor="file-upload"
                            className="w-full flex flex-col items-center justify-center cursor-pointer"
                          >
                            <UploadCloud className="h-12 w-12 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-600">
                              Click to upload or drag and drop
                            </span>
                            <span className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                            <Input
                              id="file-upload"
                              name="thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                              className="sr-only"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="previewVideo">Course Preview Video (URL)</Label>
                      <Input
                        id="previewVideo"
                        name="previewVideo"
                        value={formData.previewVideo}
                        onChange={handleInputChange}
                        placeholder="Enter YouTube or Vimeo URL"
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    {/* Settings Tab */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="Course price"
                          min="0"
                          step="0.01"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discountPrice">
                          Discount Price ($) <span className="text-sm text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="discountPrice"
                          name="discountPrice"
                          type="number"
                          value={formData.discountPrice}
                          onChange={handleInputChange}
                          placeholder="Discounted price"
                          min="0"
                          step="0.01"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label htmlFor="enrollmentLimit">
                          Enrollment Limit <span className="text-sm text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="enrollmentLimit"
                          name="enrollmentLimit"
                          type="number"
                          value={formData.enrollmentLimit}
                          onChange={handleInputChange}
                          placeholder="Maximum number of students"
                          min="0"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="startDate">
                          Start Date <span className="text-sm text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">
                          End Date <span className="text-sm text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="isFeatured"
                          checked={formData.isFeatured}
                          onCheckedChange={(checked) => handleCheckboxChange("isFeatured", checked === true)}
                        />
                        <label
                          htmlFor="isFeatured"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Feature this course (will be highlighted)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="isPublished"
                          checked={formData.isPublished}
                          onCheckedChange={(checked) => handleCheckboxChange("isPublished", checked === true)}
                        />
                        <label
                          htmlFor="isPublished"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Publish course (visible to students)
                        </label>
                      </div>
                    </div>
                    
                    {mode === "admin" && (
                      <div>
                        <Label>Assign Teacher(s)</Label>
                        <div className="mt-2 max-h-[280px] overflow-y-auto border rounded-md p-3">
                          <div className="space-y-2">
                            {teachersList.map((teacher) => (
                              <div key={teacher.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`teacher-${teacher.id}`}
                                  checked={formData.teachers.includes(teacher.id)}
                                  onCheckedChange={(checked) => handleTeacherChange(teacher.id, checked === true)}
                                />
                                <label
                                  htmlFor={`teacher-${teacher.id}`}
                                  className="flex flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  <span className="flex-1">{teacher.name}</span>
                                  <span className="text-muted-foreground text-xs">{teacher.department}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <Label>SEO Settings</Label>
                      <div className="space-y-3 mt-2">
                        <div>
                          <Label htmlFor="meta.seoTitle" className="text-sm">SEO Title</Label>
                          <Input
                            id="meta.seoTitle"
                            name="meta.seoTitle"
                            value={formData.meta.seoTitle}
                            onChange={handleInputChange}
                            placeholder="SEO-optimized title"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="meta.seoDescription" className="text-sm">Meta Description</Label>
                          <Textarea
                            id="meta.seoDescription"
                            name="meta.seoDescription"
                            value={formData.meta.seoDescription}
                            onChange={handleInputChange}
                            placeholder="Brief description for search engines"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="meta.keywords" className="text-sm">Keywords</Label>
                          <Input
                            id="meta.keywords"
                            name="meta.keywords"
                            value={formData.meta.keywords}
                            onChange={handleInputChange}
                            placeholder="Comma-separated keywords"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                    <Button type="submit" variant="default">
                      {initialData.id ? "Update Course" : "Create Course"}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {showPreview && (
          <div className="sticky top-0">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Course Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <CoursePreview course={formData} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseFormWizard;

