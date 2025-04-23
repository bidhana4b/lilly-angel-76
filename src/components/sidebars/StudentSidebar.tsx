
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  FileText, 
  Inbox, 
  CreditCard, 
  Bell, 
  Settings
} from "lucide-react";

export const StudentSidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/student" },
    { icon: BookOpen, label: "My Courses", to: "/dashboard/student/courses" },
    { icon: Video, label: "Join Live Class", to: "/dashboard/student/live-class" },
    { icon: FileText, label: "View Syllabus", to: "/dashboard/student/syllabus" },
    { icon: Inbox, label: "Assignments", to: "/dashboard/student/assignments" },
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
