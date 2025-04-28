
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TeacherSidebar: React.FC = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", to: "/dashboard/teacher", tooltip: "View your teaching dashboard" },
    { icon: BookOpen, label: "My Courses", to: "/dashboard/teacher/courses", tooltip: "Manage your courses" },
    { icon: Upload, label: "Upload Syllabus", to: "/dashboard/teacher/syllabus", tooltip: "Upload course materials" },
    { icon: Video, label: "Schedule Live Class", to: "/dashboard/teacher/live-class", tooltip: "Create and manage live classes" },
    { icon: FileText, label: "Assignments", to: "/dashboard/teacher/assignments", tooltip: "Create and manage assignments" },
    { icon: CheckSquare, label: "Submissions", to: "/dashboard/teacher/submissions", tooltip: "Review student submissions" },
    { icon: Users, label: "Student List", to: "/dashboard/teacher/students", tooltip: "View your students" },
    { icon: Bell, label: "Notifications", to: "/dashboard/teacher/notifications", tooltip: "Check your notifications" },
    { icon: Settings, label: "Profile Settings", to: "/dashboard/teacher/settings", tooltip: "Update your profile settings" },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
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
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    {item.tooltip}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </TooltipProvider>
  );
};
