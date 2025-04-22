
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import CourseListPage from "./CourseListPage";
import CourseForm from "./CourseForm";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function CoursesPage() {
  const [showForm, setShowForm] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    if (!data) {
      setShowForm(false);
      setCourseToEdit(null);
      return;
    }

    console.log("Course data:", data);
    toast({
      title: courseToEdit ? "Course Updated" : "Course Created",
      description: courseToEdit 
        ? "The course has been updated successfully." 
        : "New course has been created successfully.",
    });
    setShowForm(false);
    setCourseToEdit(null);
  };

  const handleEditCourse = (course: any) => {
    setCourseToEdit(course);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage course offerings and assignments</p>
        </div>
        <Button 
          onClick={() => {
            setCourseToEdit(null);
            setShowForm(true);
          }} 
          className="gap-2 transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseForm onSubmit={handleSubmit} initialData={courseToEdit} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseListPage onEditCourse={handleEditCourse} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
