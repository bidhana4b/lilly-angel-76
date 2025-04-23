
export interface StudentProgress {
  studentId: string;
  studentName: string;
  course: string;
  attendance: number; // percentage
  completedAssignments: number;
  totalAssignments: number;
  averageGrade: number;
  status: 'excellent' | 'good' | 'average' | 'needsImprovement' | 'at-risk';
  lastActivity: string; // date
}

export interface AttendanceRecord {
  date: string;
  courseId: string;
  courseName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  absentees: {
    studentId: string;
    studentName: string;
    reason?: string;
  }[];
}

export interface AssignmentPerformance {
  assignmentId: string;
  title: string;
  course: string;
  dueDate: string;
  submissionCount: number;
  totalStudents: number;
  submissionRate: number;
  gradeDistribution: {
    'A': number;
    'B': number;
    'C': number;
    'D': number;
    'F': number;
    'Not Graded': number;
  };
  averageScore: number;
  highestScore: number;
  lowestScore: number;
}
