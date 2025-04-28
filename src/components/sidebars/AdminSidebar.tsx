
import React from "react";
import { NavLink } from "react-router-dom";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { 
  BarChart3, BookOpen, CalendarClock, Clock, GraduationCap, 
  Bell, FileText, Settings, Users, CreditCard, PlusCircle, 
  LayoutDashboard, FileEdit, ClipboardList, User, Calendar,
  FileUp, ChartBar
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AdminSidebar: React.FC = () => {
  const menuGroups = [
    {
      title: "Main",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/admin", tooltip: "View administrative dashboard" }
      ]
    },
    {
      title: "User Management",
      items: [
        { icon: Users, label: "Manage Teachers", to: "/dashboard/admin/teachers", tooltip: "Add, edit or remove teachers" },
        { icon: GraduationCap, label: "Manage Students", to: "/dashboard/admin/students", tooltip: "Manage student accounts" }
      ]
    },
    {
      title: "Education",
      items: [
        { icon: BookOpen, label: "Manage Courses", to: "/dashboard/admin/courses", tooltip: "Organize and edit courses" },
        { icon: FileText, label: "Syllabus Manager", to: "/dashboard/admin/syllabus", tooltip: "Manage course curricula" },
        { icon: Calendar, label: "Class Schedule", to: "/dashboard/admin/schedule", tooltip: "Schedule classes and events" },
        { icon: ClipboardList, label: "Assignments", to: "/dashboard/admin/assignments", tooltip: "Oversee all assignments" }
      ]
    },
    {
      title: "Finance",
      items: [
        { icon: CreditCard, label: "Payments", to: "/dashboard/admin/payments", tooltip: "Process and track payments" },
        { icon: ChartBar, label: "Reports", to: "/dashboard/admin/reports", tooltip: "View financial reports" }
      ]
    },
    {
      title: "System",
      items: [
        { icon: Bell, label: "Notifications", to: "/dashboard/admin/notifications", tooltip: "Manage system notifications" },
        { icon: Settings, label: "Settings", to: "/dashboard/admin/settings", tooltip: "Configure system settings" }
      ]
    }
  ];

  return (
    <TooltipProvider delayDuration={300}>
      {menuGroups.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex} className="mb-2">
          <div className="px-4 py-2">
            <h4 className="text-xs font-semibold text-sidebar-foreground/60">{group.title}</h4>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
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
      ))}
    </TooltipProvider>
  );
};
