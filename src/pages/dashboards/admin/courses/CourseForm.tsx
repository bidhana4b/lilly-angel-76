
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadCloud } from "lucide-react";

// Mock data for teachers
const teachersList = [
  { id: "1", name: "John Smith", department: "Mathematics" },
  { id: "2", name: "Emma Wilson", department: "English" },
  { id: "3", name: "Robert Johnson", department: "Science" },
  { id: "4", name: "Sarah Parker", department: "Marketing" },
  { id: "5", name: "Michael Brown", department: "Computer Science" },
];

// Mock data for categories
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

interface CourseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CourseForm({ onSubmit, initialData }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    duration: initialData?.duration || "",
    durationUnit: initialData?.durationUnit || "weeks",
    category: initialData?.category || "",
    thumbnail: initialData?.thumbnail || "",
    teachers: initialData?.teachers ? initialData.teachers.split(",") : [],
    price: initialData?.price || "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnail || null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeacherChange = (teacherId: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, teachers: [...prev.teachers, teacherId] };
      } else {
        return { ...prev, teachers: prev.teachers.filter((id: string) => id !== teacherId) };
      }
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
        // In a real app, you would upload the file to a server and get a URL
        setFormData((prev) => ({ ...prev, thumbnail: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format duration with unit
    const formattedData = {
      ...formData,
      duration: `${formData.duration} ${formData.durationUnit}`,
      teachers: formData.teachers.join(","), // Convert array to comma-separated string
    };
    onSubmit(formattedData);
  };

  return (
    <Card className="border-none shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">{initialData ? "Edit Course" : "Add New Course"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Course Title */}
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
              
              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  required
                  className="mt-1 min-h-[120px]"
                />
              </div>
              
              {/* Duration */}
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
                  </select>
                </div>
              </div>
              
              {/* Category */}
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
              
              {/* Price */}
              <div>
                <Label htmlFor="price">
                  Price ($) <span className="text-sm text-muted-foreground">(Optional)</span>
                </Label>
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
            </div>
            
            <div className="space-y-4">
              {/* Thumbnail Upload */}
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
              
              {/* Assign Teachers */}
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
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onSubmit(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {initialData ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
