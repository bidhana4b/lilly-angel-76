
import { GeneralSettings, AdminRole, Permission, AdminUser } from "./types";

export const mockGeneralSettings: GeneralSettings = {
  websiteName: "EduLearn Academy",
  logoUrl: "/logo.png",
  contactEmail: "info@edulearn.com",
  contactPhone: "+1 (555) 123-4567",
  timezone: "America/New_York",
  currency: "USD",
  primaryColor: "#9b87f5",
  secondaryColor: "#7E69AB",
  tertiaryColor: "#E5DEFF",
  lastUpdated: "2025-03-15T10:30:00"
};

export const mockPermissions: Permission[] = [
  { id: "P001", module: "dashboard", action: "view", description: "View dashboard analytics" },
  { id: "P002", module: "students", action: "view", description: "View student records" },
  { id: "P003", module: "students", action: "create", description: "Create new student records" },
  { id: "P004", module: "students", action: "edit", description: "Edit student records" },
  { id: "P005", module: "students", action: "delete", description: "Delete student records" },
  
  { id: "P006", module: "teachers", action: "view", description: "View teacher records" },
  { id: "P007", module: "teachers", action: "create", description: "Create new teacher records" },
  { id: "P008", module: "teachers", action: "edit", description: "Edit teacher records" },
  { id: "P009", module: "teachers", action: "delete", description: "Delete teacher records" },
  
  { id: "P010", module: "courses", action: "view", description: "View courses" },
  { id: "P011", module: "courses", action: "create", description: "Create new courses" },
  { id: "P012", module: "courses", action: "edit", description: "Edit courses" },
  { id: "P013", module: "courses", action: "delete", description: "Delete courses" },
  
  { id: "P014", module: "syllabus", action: "manage", description: "Manage course syllabi" },
  { id: "P015", module: "schedule", action: "manage", description: "Manage class schedules" },
  { id: "P016", module: "assignments", action: "manage", description: "Manage assignments" },
  
  { id: "P017", module: "payments", action: "view", description: "View payment records" },
  { id: "P018", module: "payments", action: "create", description: "Process payments" },
  { id: "P019", module: "payments", action: "edit", description: "Edit payment records" },
  
  { id: "P020", module: "reports", action: "view", description: "View reports" },
  { id: "P021", module: "reports", action: "create", description: "Generate new reports" },
  
  { id: "P022", module: "notifications", action: "view", description: "View notifications" },
  { id: "P023", module: "notifications", action: "create", description: "Send notifications" },
  
  { id: "P024", module: "settings", action: "view", description: "View system settings" },
  { id: "P025", module: "settings", action: "edit", description: "Edit system settings" },
  
  { id: "P026", module: "roles", action: "view", description: "View admin roles" },
  { id: "P027", module: "roles", action: "create", description: "Create admin roles" },
  { id: "P028", module: "roles", action: "edit", description: "Edit admin roles" },
  { id: "P029", module: "roles", action: "delete", description: "Delete admin roles" }
];

export const mockAdminRoles: AdminRole[] = [
  {
    id: "R001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: mockPermissions,
    createdAt: "2024-12-01T09:00:00",
    lastUpdated: "2025-02-15T14:20:00",
    usersAssigned: 2
  },
  {
    id: "R002",
    name: "Academic Manager",
    description: "Manages courses, teachers, and students",
    permissions: mockPermissions.filter(p => 
      ["dashboard", "students", "teachers", "courses", "syllabus", "schedule", "assignments"].includes(p.module)
    ),
    createdAt: "2025-01-10T11:30:00",
    lastUpdated: "2025-03-05T16:45:00",
    usersAssigned: 3
  },
  {
    id: "R003",
    name: "Finance Administrator",
    description: "Manages payments and financial reports",
    permissions: mockPermissions.filter(p => 
      ["dashboard", "payments", "reports"].includes(p.module) || 
      (p.module === "students" && p.action === "view")
    ),
    createdAt: "2025-01-15T10:20:00",
    lastUpdated: "2025-02-28T09:15:00",
    usersAssigned: 2
  },
  {
    id: "R004",
    name: "Student Records Manager",
    description: "Manages student records and related reports",
    permissions: mockPermissions.filter(p => 
      (p.module === "dashboard" && p.action === "view") ||
      (p.module === "students") ||
      (p.module === "reports" && p.action === "view")
    ),
    createdAt: "2025-02-05T13:45:00",
    usersAssigned: 4
  }
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: "ADMIN-001",
    name: "System Administrator",
    email: "admin@edulearn.com",
    role: "Super Admin",
    lastLogin: "2025-04-22T09:15:00",
    status: "active"
  },
  {
    id: "ADMIN-002",
    name: "John Davis",
    email: "john.davis@edulearn.com",
    role: "Academic Manager",
    lastLogin: "2025-04-21T14:30:00",
    status: "active"
  },
  {
    id: "ADMIN-003",
    name: "Sarah Johnson",
    email: "sarah.j@edulearn.com",
    role: "Academic Manager",
    lastLogin: "2025-04-22T08:45:00",
    status: "active"
  },
  {
    id: "ADMIN-004",
    name: "Michael Wong",
    email: "m.wong@edulearn.com",
    role: "Finance Administrator",
    lastLogin: "2025-04-20T11:20:00",
    status: "active"
  },
  {
    id: "ADMIN-005",
    name: "Emily Rodriguez",
    email: "e.rodriguez@edulearn.com",
    role: "Student Records Manager",
    lastLogin: "2025-04-15T15:10:00",
    status: "inactive"
  }
];
