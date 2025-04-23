
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Course {
  id: string;
  title: string;
}
interface Assignment {
  id: string;
  courseId: string;
  title: string;
}
interface SubmissionFiltersProps {
  courses: Course[];
  assignments: Assignment[];
  courseId: string;
  assignmentId: string;
  setCourseId: (v: string) => void;
  setAssignmentId: (v: string) => void;
}

export function SubmissionFilters({
  courses,
  assignments,
  courseId,
  assignmentId,
  setCourseId,
  setAssignmentId
}: SubmissionFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1 min-w-[180px]">
        <Label>Filter by Course</Label>
        <Select value={courseId} onValueChange={v => { setCourseId(v); setAssignmentId("all"); }}>
          <SelectTrigger>
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map(c => (
              <SelectItem value={c.id} key={c.id}>{c.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[180px]">
        <Label>Filter by Assignment</Label>
        <Select value={assignmentId} onValueChange={setAssignmentId}>
          <SelectTrigger>
            <SelectValue placeholder="All Assignments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignments</SelectItem>
            {assignments
              .filter(a => courseId === "all" || a.courseId === courseId)
              .map(a => (
                <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
