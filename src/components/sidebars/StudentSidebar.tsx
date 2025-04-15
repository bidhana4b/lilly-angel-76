
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, BookOpen, FileText, VideoIcon, Award, CreditCard, Bell, Settings, Calendar } from "lucide-react";

export const StudentSidebar: React.FC = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", to: "/dashboard/student" },
    { icon: BookOpen, label: "My Courses", to: "/dashboard/student/courses" },
    { icon: VideoIcon, label: "Join Live Class", to: "/dashboard/student/live-class" },
    { icon: FileText, label: "View Syllabus", to: "/dashboard/student/syllabus" },
    { icon: Calendar, label: "Submit Assignments", to: "/dashboard/student/assignments" },
    { icon: Award, label: "View Grades", to: "/dashboard/student/grades" },
    { icon: CreditCard, label: "Make Payment", to: "/dashboard/student/payments" },
    { icon: Bell, label: "Notifications", to: "/dashboard/student/notifications" },
    { icon: Settings, label: "Profile Settings", to: "/dashboard/student/settings" },
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
