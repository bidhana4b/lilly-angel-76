
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import { Teacher, Course } from "./teachersData";

interface AssignCoursesProps {
  teacher: Teacher | null;
  courses: Course[];
  selectedCourses: string[];
  setSelectedCourses: (c: string[]) => void;
  onSubmit: () => void;
}

export function AssignCourses({
  teacher,
  courses,
  selectedCourses,
  setSelectedCourses,
  onSubmit,
}: AssignCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Courses to Teacher</CardTitle>
        {teacher && (
          <p className="text-muted-foreground">
            Assigning courses for: {teacher.name}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {teacher ? (
          <div className="space-y-4">
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={`course-${course.id}`}
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCourses([...selectedCourses, course.id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter((id) => id !== course.id)
                        );
                      }
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`course-${course.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {course.title}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={onSubmit} className="mt-4">
              Save Course Assignments
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <User className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2">Select a teacher first to assign courses</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
