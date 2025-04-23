
import { StudentProgress, AttendanceRecord, AssignmentPerformance } from "./types";

export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: "ST-1001",
    studentName: "Alex Johnson",
    course: "Advanced Mathematics",
    attendance: 95,
    completedAssignments: 12,
    totalAssignments: 15,
    averageGrade: 92,
    status: "excellent",
    lastActivity: "2025-04-20"
  },
  {
    studentId: "ST-1002",
    studentName: "Maria Garcia",
    course: "Introduction to Chemistry",
    attendance: 88,
    completedAssignments: 10,
    totalAssignments: 15,
    averageGrade: 85,
    status: "good",
    lastActivity: "2025-04-19"
  },
  {
    studentId: "ST-1003",
    studentName: "Ethan Wilson",
    course: "Business Economics",
    attendance: 78,
    completedAssignments: 8,
    totalAssignments: 15,
    averageGrade: 75,
    status: "average",
    lastActivity: "2025-04-15"
  },
  {
    studentId: "ST-1004",
    studentName: "Sophia Lee",
    course: "Advanced Physics",
    attendance: 92,
    completedAssignments: 14,
    totalAssignments: 15,
    averageGrade: 89,
    status: "good",
    lastActivity: "2025-04-21"
  },
  {
    studentId: "ST-1005",
    studentName: "Olivia Martinez",
    course: "Business Economics",
    attendance: 65,
    completedAssignments: 6,
    totalAssignments: 15,
    averageGrade: 68,
    status: "needsImprovement",
    lastActivity: "2025-04-10"
  },
  {
    studentId: "ST-1008",
    studentName: "David Kim",
    course: "Computer Science",
    attendance: 98,
    completedAssignments: 15,
    totalAssignments: 15,
    averageGrade: 95,
    status: "excellent",
    lastActivity: "2025-04-22"
  },
  {
    studentId: "ST-1014",
    studentName: "Daniel Jackson",
    course: "Advanced Physics",
    attendance: 45,
    completedAssignments: 5,
    totalAssignments: 15,
    averageGrade: 58,
    status: "at-risk",
    lastActivity: "2025-04-05"
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    date: "2025-04-22",
    courseId: "CS101",
    courseName: "Computer Science",
    totalStudents: 25,
    presentCount: 23,
    absentCount: 2,
    absentees: [
      {
        studentId: "ST-1012",
        studentName: "Robert Smith",
        reason: "Medical appointment"
      },
      {
        studentId: "ST-1019",
        studentName: "Emma Rodriguez"
      }
    ]
  },
  {
    date: "2025-04-21",
    courseId: "MTH202",
    courseName: "Advanced Mathematics",
    totalStudents: 22,
    presentCount: 20,
    absentCount: 2,
    absentees: [
      {
        studentId: "ST-1005",
        studentName: "Olivia Martinez"
      },
      {
        studentId: "ST-1014",
        studentName: "Daniel Jackson",
        reason: "Family emergency"
      }
    ]
  },
  {
    date: "2025-04-20",
    courseId: "PHY301",
    courseName: "Advanced Physics",
    totalStudents: 18,
    presentCount: 15,
    absentCount: 3,
    absentees: [
      {
        studentId: "ST-1014",
        studentName: "Daniel Jackson"
      },
      {
        studentId: "ST-1023",
        studentName: "Sophia Adams"
      },
      {
        studentId: "ST-1007",
        studentName: "Thomas Brown",
        reason: "Transportation issues"
      }
    ]
  },
  {
    date: "2025-04-19",
    courseId: "BUS105",
    courseName: "Business Economics",
    totalStudents: 30,
    presentCount: 28,
    absentCount: 2,
    absentees: [
      {
        studentId: "ST-1005",
        studentName: "Olivia Martinez"
      },
      {
        studentId: "ST-1018",
        studentName: "William Taylor"
      }
    ]
  }
];

export const mockAssignmentPerformance: AssignmentPerformance[] = [
  {
    assignmentId: "ASG-001",
    title: "Linear Algebra Problem Set",
    course: "Advanced Mathematics",
    dueDate: "2025-04-15",
    submissionCount: 20,
    totalStudents: 22,
    submissionRate: 90.9,
    gradeDistribution: {
      'A': 8,
      'B': 5,
      'C': 4,
      'D': 2,
      'F': 1,
      'Not Graded': 0
    },
    averageScore: 85.4,
    highestScore: 98,
    lowestScore: 55
  },
  {
    assignmentId: "ASG-002",
    title: "Database Design Project",
    course: "Computer Science",
    dueDate: "2025-04-10",
    submissionCount: 24,
    totalStudents: 25,
    submissionRate: 96,
    gradeDistribution: {
      'A': 10,
      'B': 9,
      'C': 3,
      'D': 2,
      'F': 0,
      'Not Graded': 0
    },
    averageScore: 88.2,
    highestScore: 100,
    lowestScore: 68
  },
  {
    assignmentId: "ASG-003",
    title: "Market Analysis Report",
    course: "Business Economics",
    dueDate: "2025-04-12",
    submissionCount: 26,
    totalStudents: 30,
    submissionRate: 86.7,
    gradeDistribution: {
      'A': 7,
      'B': 8,
      'C': 6,
      'D': 3,
      'F': 2,
      'Not Graded': 0
    },
    averageScore: 79.5,
    highestScore: 95,
    lowestScore: 52
  },
  {
    assignmentId: "ASG-004",
    title: "Wave Mechanics Lab Report",
    course: "Advanced Physics",
    dueDate: "2025-04-18",
    submissionCount: 12,
    totalStudents: 18,
    submissionRate: 66.7,
    gradeDistribution: {
      'A': 4,
      'B': 3,
      'C': 2,
      'D': 2,
      'F': 1,
      'Not Graded': 0
    },
    averageScore: 76.8,
    highestScore: 96,
    lowestScore: 45
  }
];
