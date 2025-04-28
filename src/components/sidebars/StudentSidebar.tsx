
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const StudentSidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard/student", tooltip: "View your student dashboard" },
    { icon: BookOpen, label: "My Courses", to: "/dashboard/student/courses", tooltip: "Access your enrolled courses" },
    { icon: Video, label: "Join Live Class", to: "/dashboard/student/live-class", tooltip: "Enter your scheduled live classes" },
    { icon: FileText, label: "View Syllabus", to: "/dashboard/student/syllabus", tooltip: "Review course curriculum" },
    { icon: Inbox, label: "Assignments", to: "/dashboard/student/assignments", tooltip: "View and submit assignments" },
    { icon: CreditCard, label: "Make Payment", to: "/dashboard/student/payments", tooltip: "Process fee payments" },
    { icon: Bell, label: "Notifications", to: "/dashboard/student/notifications", tooltip: "Check your notifications" },
    { icon: Settings, label: "Profile Settings", to: "/dashboard/student/settings", tooltip: "Update your profile settings" },
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
