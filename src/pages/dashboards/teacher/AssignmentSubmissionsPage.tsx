
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SubmissionTable } from "./components/SubmissionTable";
import { SubmissionFilters } from "./components/SubmissionFilters";

// Mock data, types
const mockCourses = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
];
const mockAssignments = [
  { id: "a1", courseId: "c1", title: "HTML & CSS Basics" },
  { id: "a2", courseId: "c2", title: "React State Management" },
];

interface Submission {
  id: string;
  studentName: string;
  courseId: string;
  assignmentId: string;
  grade: string;
  feedback: string;
  status: "graded" | "pending";
  fileUrl: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "s1",
    studentName: "Alice",
    courseId: "c1",
    assignmentId: "a1",
    grade: "",
    feedback: "",
    status: "pending",
    fileUrl: "#",
  },
  {
    id: "s2",
    studentName: "Bob",
    courseId: "c1",
    assignmentId: "a1",
    grade: "A",
    feedback: "Great work!",
    status: "graded",
    fileUrl: "#",
  },
  {
    id: "s3",
    studentName: "Tom",
    courseId: "c2",
    assignmentId: "a2",
    grade: "",
    feedback: "",
    status: "pending",
    fileUrl: "#",
  },
];

export default function AssignmentSubmissionsPage() {
  const [courseId, setCourseId] = useState("all");
  const [assignmentId, setAssignmentId] = useState("all");
  const [gradeValues, setGradeValues] = useState<{ [sid: string]: string }>({});
  const [feedbackValues, setFeedbackValues] = useState<{ [sid: string]: string }>({});

  const filteredAssignments = assignmentId === "all"
    ? mockAssignments.filter(a => courseId === "all" || a.courseId === courseId)
    : mockAssignments.filter(a => a.id === assignmentId);

  const filteredSubmissions = mockSubmissions.filter(sub =>
    (courseId === "all" || sub.courseId === courseId)
    && (assignmentId === "all" || sub.assignmentId === assignmentId)
  );

  function handleGradeChange(subId: string, value: string) {
    setGradeValues({ ...gradeValues, [subId]: value });
  }
  function handleFeedbackChange(subId: string, value: string) {
    setFeedbackValues({ ...feedbackValues, [subId]: value });
  }
  function handleGradeSubmit(subId: string) {
    // In real app, persist the grade and feedback
    mockSubmissions.forEach(s => {
      if (s.id === subId) {
        s.grade = gradeValues[subId] || "";
        s.feedback = feedbackValues[subId] || "";
        s.status = "graded";
      }
    });
    setGradeValues({ ...gradeValues, [subId]: "" });
    setFeedbackValues({ ...feedbackValues, [subId]: "" });
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Student Submissions</h2>
        <p className="text-muted-foreground">
          Review and grade your students' assignment submissions
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Filter and review student uploads for your assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionFilters
            courses={mockCourses}
            assignments={mockAssignments}
            courseId={courseId}
            assignmentId={assignmentId}
            setCourseId={setCourseId}
            setAssignmentId={setAssignmentId}
          />
          {filteredSubmissions.length > 0 ? (
            <SubmissionTable
              submissions={filteredSubmissions}
              assignments={mockAssignments}
              gradeValues={gradeValues}
              feedbackValues={feedbackValues}
              onGradeChange={handleGradeChange}
              onFeedbackChange={handleFeedbackChange}
              onGradeSubmit={handleGradeSubmit}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">No submissions found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
