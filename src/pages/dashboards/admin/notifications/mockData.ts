
import { Notification } from "./types";

export const mockNotifications: Notification[] = [
  {
    id: "NOT-001",
    title: "Important System Maintenance",
    message: "The system will be down for maintenance on Saturday, April 30th, from 2:00 AM to 5:00 AM EST. Please plan accordingly.",
    target: "all",
    createdAt: "2025-04-21T14:30:00",
    sentAt: "2025-04-21T15:00:00",
    status: "sent",
    sender: "System Administrator",
    senderId: "ADMIN-001"
  },
  {
    id: "NOT-002",
    title: "New Course Materials Available",
    message: "New learning materials for the Advanced Physics course have been uploaded. Please check the course page for updates.",
    target: "course",
    targetId: "PHY301",
    targetName: "Advanced Physics",
    createdAt: "2025-04-20T09:15:00",
    sentAt: "2025-04-20T10:00:00",
    status: "sent",
    sender: "John Davis",
    senderId: "ADMIN-002"
  },
  {
    id: "NOT-003",
    title: "Urgent: Assignment Deadline Extension",
    message: "Due to technical difficulties, the deadline for the Database Design Project has been extended to April 25th.",
    target: "course",
    targetId: "CS101",
    targetName: "Computer Science",
    createdAt: "2025-04-19T16:45:00",
    scheduledFor: "2025-04-20T08:00:00",
    sentAt: "2025-04-20T08:00:00",
    status: "sent",
    sender: "Sarah Johnson",
    senderId: "ADMIN-003"
  },
  {
    id: "NOT-004",
    title: "Student Progress Meeting",
    message: "Please schedule a meeting with your academic advisor to discuss your current academic progress.",
    target: "student",
    targetId: "ST-1014",
    targetName: "Daniel Jackson",
    createdAt: "2025-04-18T11:20:00",
    status: "draft",
    sender: "Academic Advisory",
    senderId: "ADMIN-004"
  },
  {
    id: "NOT-005",
    title: "Teacher Conference Reminder",
    message: "Reminder: The annual teacher conference will be held next month. Please confirm your attendance by May 1st.",
    target: "teachers",
    createdAt: "2025-04-15T14:20:00",
    scheduledFor: "2025-04-30T09:00:00",
    status: "scheduled",
    sender: "Principal's Office",
    senderId: "ADMIN-001"
  },
  {
    id: "NOT-006",
    title: "Enrollment Period Opening",
    message: "The enrollment period for the Fall 2025 semester will open on May 15th. Please ensure all requirements are met before enrolling.",
    target: "students",
    createdAt: "2025-04-10T15:30:00",
    scheduledFor: "2025-05-01T09:00:00",
    status: "scheduled",
    sender: "Registrar's Office",
    senderId: "ADMIN-005"
  }
];

export const mockStudents = [
  { id: "ST-1001", name: "Alex Johnson" },
  { id: "ST-1002", name: "Maria Garcia" },
  { id: "ST-1003", name: "Ethan Wilson" },
  { id: "ST-1004", name: "Sophia Lee" },
  { id: "ST-1005", name: "Olivia Martinez" },
  { id: "ST-1008", name: "David Kim" },
  { id: "ST-1014", name: "Daniel Jackson" }
];

export const mockTeachers = [
  { id: "TCH-001", name: "Dr. Robert Anderson" },
  { id: "TCH-002", name: "Prof. Jennifer White" },
  { id: "TCH-003", name: "Dr. Michael Chen" },
  { id: "TCH-004", name: "Prof. Emily Rodriguez" },
  { id: "TCH-005", name: "Dr. Jonathan Turner" }
];

export const mockCourses = [
  { id: "CS101", name: "Computer Science" },
  { id: "MTH202", name: "Advanced Mathematics" },
  { id: "PHY301", name: "Advanced Physics" },
  { id: "BUS105", name: "Business Economics" },
  { id: "ENG110", name: "English Literature" }
];
