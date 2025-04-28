
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CourseListPage from "./CourseListPage";
import CourseFormWizard from "@/components/course/CourseFormWizard";
import { useToast } from "@/hooks/use-toast";

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: string;
  thumbnail: string;
  price: string;
  duration: string;
  teachers: string[];
  studentCount: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

export default function CoursesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCourseSubmit = (courseData: any) => {
    console.log("Course data submitted:", courseData);
    toast({
      title: courseData.id ? "Course Updated" : "Course Created",
      description: `${courseData.title} has been ${courseData.id ? "updated" : "created"} successfully.`,
    });
    navigate("/dashboard/admin/courses");
  };

  return (
    <Routes>
      <Route index element={<CourseListPage />} />
      <Route 
        path="new" 
        element={
          <CourseFormWizard 
            onSubmit={handleCourseSubmit} 
            mode="admin"
          />
        } 
      />
      <Route 
        path="edit/:id" 
        element={
          <CourseFormWizard 
            onSubmit={handleCourseSubmit}
            initialData={{
              id: "sample-id",
              title: "Advanced JavaScript Programming",
              shortDescription: "Master modern JavaScript concepts and techniques",
              description: "This comprehensive course teaches you advanced JavaScript concepts including closures, prototypes, promises, async/await, and modern ES6+ features. Perfect for developers looking to level up their JavaScript skills.",
              category: "Technology",
              level: "intermediate",
              thumbnail: "",
              price: "199.99",
              discountPrice: "149.99",
              duration: "8",
              durationUnit: "weeks",
              isFeatured: true,
              isPublished: true,
              teachers: ["3", "5"],
              modules: [
                {
                  id: "module-1",
                  title: "JavaScript Fundamentals Review",
                  description: "A quick review of core JavaScript concepts",
                  expanded: false,
                  lessons: [
                    { id: "lesson-1", title: "Variables and Data Types", duration: "00:45", type: "video" },
                    { id: "lesson-2", title: "Functions and Scope", duration: "01:10", type: "video" },
                    { id: "lesson-3", title: "Objects and Arrays", duration: "00:55", type: "video" }
                  ]
                },
                {
                  id: "module-2",
                  title: "Advanced Concepts",
                  description: "Exploring advanced JavaScript concepts",
                  expanded: false,
                  lessons: [
                    { id: "lesson-4", title: "Closures and Prototypes", duration: "01:20", type: "video" },
                    { id: "lesson-5", title: "This Keyword Deep Dive", duration: "00:55", type: "video" },
                    { id: "lesson-6", title: "Module 1 Quiz", duration: "00:30", type: "quiz" }
                  ]
                }
              ],
              objectives: [
                { id: "obj-1", text: "Understand advanced JavaScript concepts in-depth" },
                { id: "obj-2", text: "Build complex applications using modern JavaScript" },
                { id: "obj-3", text: "Master asynchronous programming techniques" },
                { id: "obj-4", text: "Implement effective error handling strategies" }
              ],
              requirements: [
                { id: "req-1", text: "Basic knowledge of JavaScript fundamentals" },
                { id: "req-2", text: "Understanding of HTML and CSS" },
                { id: "req-3", text: "A code editor installed on your computer" }
              ],
              meta: {
                seoTitle: "Advanced JavaScript Programming | Lilly-Angel Courses",
                seoDescription: "Master advanced JavaScript concepts including closures, prototypes, promises, and ES6+ features.",
                keywords: "javascript, es6, advanced javascript, web development, programming"
              }
            }}
            mode="admin"
          />
        } 
      />
    </Routes>
  );
}
