
import { FileText, Upload, Edit, Eye, Download, FileUp, Plus } from "lucide-react";

// Syllabus type
export interface Syllabus {
  id: string;
  title: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  uploadType: "file" | "link" | "editor";
  content?: string;
  fileUrl?: string;
  driveLink?: string;
  course: string;
}

// Mock Courses
export const mockCourses = [
  { id: "1", name: "Mathematics Grade 10" },
  { id: "2", name: "English Literature Grade 11" },
  { id: "3", name: "Physics Grade 12" },
  { id: "4", name: "Chemistry Grade 10" },
  { id: "5", name: "Biology Grade 11" },
];

// Mock Syllabi
export const mockSyllabus: Syllabus[] = [
  {
    id: "1",
    title: "Mathematics Grade 10",
    subject: "Mathematics",
    grade: "10",
    lastUpdated: "2024-04-15",
    uploadType: "file",
    fileUrl: "/sample-syllabus.pdf",
    course: "Mathematics Grade 10"
  },
  {
    id: "2",
    title: "English Literature Grade 11",
    subject: "English",
    grade: "11",
    lastUpdated: "2024-04-14",
    uploadType: "link",
    driveLink: "https://drive.google.com/file/example",
    course: "English Literature Grade 11"
  },
  {
    id: "3",
    title: "Physics Grade 12",
    subject: "Physics",
    grade: "12",
    lastUpdated: "2024-04-10",
    uploadType: "editor",
    content: "<h1>Physics Syllabus</h1><p>This is the content of the physics syllabus...</p>",
    course: "Physics Grade 12"
  },
];
