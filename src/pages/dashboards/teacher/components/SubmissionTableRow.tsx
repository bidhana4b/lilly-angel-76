
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Check } from "lucide-react";

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

interface SubmissionTableRowProps {
  submission: Submission;
  assignment: Assignment | undefined;
  gradeValue: string;
  feedbackValue: string;
  onGradeChange: (subId: string, value: string) => void;
  onFeedbackChange: (subId: string, value: string) => void;
  onGradeSubmit: (subId: string) => void;
}

export function SubmissionTableRow({
  submission,
  assignment,
  gradeValue,
  feedbackValue,
  onGradeChange,
  onFeedbackChange,
  onGradeSubmit
}: SubmissionTableRowProps) {
  return (
    <tr className={submission.status === "graded" ? "bg-green-50" : ""}>
      <td className="p-2">{submission.studentName}</td>
      <td className="p-2">{assignment?.title}</td>
      <td className="p-2">
        <Button variant="ghost" size="icon" asChild>
          <a href={submission.fileUrl} download>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </td>
      <td className="p-2 w-32">
        {submission.status === "graded" ? (
          <span className="font-bold text-green-700">{submission.grade}</span>
        ) : (
          <Input
            placeholder="Grade"
            value={gradeValue}
            onChange={e => onGradeChange(submission.id, e.target.value)}
          />
        )}
      </td>
      <td className="p-2 w-48">
        {submission.status === "graded" ? (
          <span className="text-xs">{submission.feedback}</span>
        ) : (
          <Textarea
            placeholder="Feedback"
            value={feedbackValue}
            onChange={e => onFeedbackChange(submission.id, e.target.value)}
            rows={1}
          />
        )}
      </td>
      <td className="p-2">
        {submission.status === "graded" ? (
          <span className="rounded bg-green-200 text-green-900 px-2 py-0.5 text-xs">Graded</span>
        ) : (
          <span className="rounded bg-yellow-100 text-yellow-900 px-2 py-0.5 text-xs">Pending</span>
        )}
      </td>
      <td className="p-2">
        {submission.status === "pending" && (
          <Button variant="default" size="sm" onClick={() => onGradeSubmit(submission.id)}>
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
        )}
      </td>
    </tr>
  );
}
