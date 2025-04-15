
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BarChart3, BookOpen, CalendarClock, Clock, GraduationCap, Bell, FileText, Settings, Users, CreditCard } from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", to: "/dashboard/admin" },
    { icon: Users, label: "Manage Teachers", to: "/dashboard/admin/teachers" },
    { icon: Users, label: "Manage Students", to: "/dashboard/admin/students" },
    { icon: BookOpen, label: "Manage Courses", to: "/dashboard/admin/courses" },
    { icon: FileText, label: "Manage Curriculum", to: "/dashboard/admin/curriculum" },
    { icon: CalendarClock, label: "Class Schedule", to: "/dashboard/admin/schedule" },
    { icon: Clock, label: "Assignments", to: "/dashboard/admin/assignments" },
    { icon: CreditCard, label: "Payments", to: "/dashboard/admin/payments" },
    { icon: BarChart3, label: "Reports", to: "/dashboard/admin/reports" },
    { icon: Bell, label: "Notifications", to: "/dashboard/admin/notifications" },
    { icon: Settings, label: "Settings", to: "/dashboard/admin/settings" },
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
