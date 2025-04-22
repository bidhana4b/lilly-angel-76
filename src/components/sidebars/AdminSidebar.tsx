
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { 
  BarChart3, BookOpen, CalendarClock, Clock, GraduationCap, 
  Bell, FileText, Settings, Users, CreditCard, PlusCircle, 
  LayoutDashboard, FileEdit, ClipboardList, User, Calendar
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const menuGroups = [
    {
      title: "Main",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/admin" }
      ]
    },
    {
      title: "User Management",
      items: [
        { icon: Users, label: "Manage Teachers", to: "/dashboard/admin/teachers" },
        { icon: GraduationCap, label: "Manage Students", to: "/dashboard/admin/students" }
      ]
    },
    {
      title: "Education",
      items: [
        { icon: BookOpen, label: "Manage Courses", to: "/dashboard/admin/courses" },
        { icon: FileText, label: "Syllabus Manager", to: "/dashboard/admin/syllabus" },
        { icon: Calendar, label: "Class Schedule", to: "/dashboard/admin/schedule" },
        { icon: ClipboardList, label: "Assignments", to: "/dashboard/admin/assignments" }
      ]
    },
    {
      title: "Finance",
      items: [
        { icon: CreditCard, label: "Payments", to: "/dashboard/admin/payments" },
        { icon: BarChart3, label: "Reports", to: "/dashboard/admin/reports" }
      ]
    },
    {
      title: "System",
      items: [
        { icon: Bell, label: "Notifications", to: "/dashboard/admin/notifications" },
        { icon: Settings, label: "Settings", to: "/dashboard/admin/settings" }
      ]
    }
  ];

  return (
    <>
      {menuGroups.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex} className="mb-2">
          <div className="px-4 py-2">
            <h4 className="text-xs font-semibold text-sidebar-foreground/60">{group.title}</h4>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
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
      ))}
    </>
  );
};
