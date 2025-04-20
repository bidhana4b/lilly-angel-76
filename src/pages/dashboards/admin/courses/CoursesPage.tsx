
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CourseListPage from "./CourseListPage";
import CourseForm from "./CourseForm";
import { useToast } from "@/hooks/use-toast";

export default function CoursesPage() {
  const [showForm, setShowForm] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    console.log("New course data:", data);
    toast({
      title: "Success",
      description: "Course has been created successfully.",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage course offerings and assignments</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {showForm ? (
        <CourseForm onSubmit={handleSubmit} />
      ) : (
        <CourseListPage />
      )}
    </div>
  );
}
