
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Users, 
  Bell, 
  Settings, 
  Upload, 
  Video
} from "lucide-react";

export const TeacherSidebar: React.FC = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", to: "/dashboard/teacher" },
    { icon: BookOpen, label: "My Courses", to: "/dashboard/teacher/courses" },
    { icon: Upload, label: "Upload Syllabus", to: "/dashboard/teacher/syllabus" },
    { icon: Video, label: "Schedule Live Class", to: "/dashboard/teacher/live-class" },
    { icon: FileText, label: "Assignments", to: "/dashboard/teacher/assignments" },
    { icon: CheckSquare, label: "Submissions", to: "/dashboard/teacher/submissions" },
    { icon: Users, label: "Student List", to: "/dashboard/teacher/students" },
    { icon: Bell, label: "Notifications", to: "/dashboard/teacher/notifications" },
    { icon: Settings, label: "Profile Settings", to: "/dashboard/teacher/settings" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "data-[active=true]" : ""
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
