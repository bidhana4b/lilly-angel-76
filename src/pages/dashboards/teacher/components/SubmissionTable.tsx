
import React from "react";
import { SubmissionTableRow } from "./SubmissionTableRow";

interface Assignment {
  id: string;
  courseId: string;
  title: string;
}
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

interface SubmissionTableProps {
  submissions: Submission[];
  assignments: Assignment[];
  gradeValues: { [sid: string]: string };
  feedbackValues: { [sid: string]: string };
  onGradeChange: (subId: string, value: string) => void;
  onFeedbackChange: (subId: string, value: string) => void;
  onGradeSubmit: (subId: string) => void;
}

export function SubmissionTable({
  submissions,
  assignments,
  gradeValues,
  feedbackValues,
  onGradeChange,
  onFeedbackChange,
  onGradeSubmit
}: SubmissionTableProps) {
  return (
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
          {submissions.map(sub => {
            const assignment = assignments.find(a => a.id === sub.assignmentId);
            return (
              <SubmissionTableRow
                key={sub.id}
                submission={sub}
                assignment={assignment}
                gradeValue={gradeValues[sub.id] ?? ""}
                feedbackValue={feedbackValues[sub.id] ?? ""}
                onGradeChange={onGradeChange}
                onFeedbackChange={onFeedbackChange}
                onGradeSubmit={onGradeSubmit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
