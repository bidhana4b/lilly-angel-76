import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Download, Check } from "lucide-react";

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
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 min-w-[180px]">
              <Label>Filter by Course</Label>
              <Select value={courseId} onValueChange={v => { setCourseId(v); setAssignmentId("all"); }}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map(c => (
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
                  {mockAssignments
                    .filter(a => courseId === "all" || a.courseId === courseId)
                    .map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {filteredSubmissions.length > 0 ? (
            <div className="overflow-auto">
              <table className="min-w-full rounded border shadow transition animate-fade-in">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 text-left">Student</th>
                    <th className="p-2 text-left">Assignment</th>
                    <th className="p-2 text-left">Download</th>
                    <th className="p-2 text-left">Grade</th>
                    <th className="p-2 text-left">Feedback</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map(sub => {
                    const assignment = mockAssignments.find(a => a.id === sub.assignmentId);
                    return (
                      <tr key={sub.id} className={sub.status === "graded" ? "bg-green-50" : ""}>
                        <td className="p-2">{sub.studentName}</td>
                        <td className="p-2">{assignment?.title}</td>
                        <td className="p-2">
                          <Button variant="ghost" size="icon" asChild>
                            <a href={sub.fileUrl} download>
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </td>
                        <td className="p-2 w-32">
                          {sub.status === "graded" ? (
                            <span className="font-bold text-green-700">{sub.grade}</span>
                          ) : (
                            <Input
                              placeholder="Grade"
                              value={gradeValues[sub.id] ?? ""}
                              onChange={e => handleGradeChange(sub.id, e.target.value)}
                            />
                          )}
                        </td>
                        <td className="p-2 w-48">
                          {sub.status === "graded" ? (
                            <span className="text-xs">{sub.feedback}</span>
                          ) : (
                            <Textarea
                              placeholder="Feedback"
                              value={feedbackValues[sub.id] ?? ""}
                              onChange={e => handleFeedbackChange(sub.id, e.target.value)}
                              rows={1}
                            />
                          )}
                        </td>
                        <td className="p-2">
                          {sub.status === "graded" ? (
                            <span className="rounded bg-green-200 text-green-900 px-2 py-0.5 text-xs">Graded</span>
                          ) : (
                            <span className="rounded bg-yellow-100 text-yellow-900 px-2 py-0.5 text-xs">Pending</span>
                          )}
                        </td>
                        <td className="p-2">
                          {sub.status === "pending" && (
                            <Button variant="default" size="sm" onClick={() => handleGradeSubmit(sub.id)}>
                              <Check className="h-4 w-4 mr-1" /> Save
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No submissions found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
