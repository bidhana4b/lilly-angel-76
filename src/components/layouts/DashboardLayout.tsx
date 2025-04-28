
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell } from "lucide-react";
import { TourButton } from "@/components/tour/TourButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardLayoutProps {
  sidebarContent: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebarContent }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Extract the current page title from the path
  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(Boolean);
    const lastSegment = path[path.length - 1];
    
    if (lastSegment === "admin") return "Dashboard";
    return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Dashboard";
  };
  
  return (
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <Sidebar variant="inset" collapsible="offcanvas" className={user?.role + "-sidebar"}>
            <SidebarHeader className="flex flex-col gap-2">
              <div className="flex items-center px-4 py-3">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    E
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">E-Learning</span>
                    <span className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarTrigger />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                      Toggle sidebar
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {sidebarContent}
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-2 p-4">
                <img 
                  src={user?.avatar || "https://ui-avatars.com/api/?name=Admin"}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    Logout
                  </TooltipContent>
                </Tooltip>
              </div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6 bg-white">
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger className="md:hidden" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    Toggle menu
                  </TooltipContent>
                </Tooltip>
                <div className="font-semibold text-lg">{getPageTitle()}</div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <TourButton />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    Start guided tour
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    View notifications
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2 items-center">
                      <User className="h-4 w-4" />
                      <span>{user?.name || "Admin"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
                    View profile
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};
