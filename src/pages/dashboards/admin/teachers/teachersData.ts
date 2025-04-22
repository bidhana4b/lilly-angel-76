
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: "active" | "inactive" | "blocked";
  profileImage: string;
  assignedCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
}

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Mathematics",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: ["1", "3"]
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 987-6543",
    subject: "English Literature",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: ["2"]
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Physics",
    status: "blocked",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    assignedCourses: []
  }
];

export const mockCourses: Course[] = [
  { id: "1", title: "Advanced Mathematics", description: "Calculus and Linear Algebra" },
  { id: "2", title: "English Composition", description: "Writing and Literature Analysis" },
  { id: "3", title: "Physics 101", description: "Introduction to Physics" },
  { id: "4", title: "History of Art", description: "Renaissance to Modern Art" },
];
