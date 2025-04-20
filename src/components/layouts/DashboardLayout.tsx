
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell } from "lucide-react";

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
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="inset" collapsible="offcanvas">
          <SidebarHeader className="flex flex-col gap-2">
            <div className="flex items-center px-4 py-3">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  E
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">E-Learning</span>
                  <span className="text-xs text-sidebar-foreground/70">Super Admin</span>
                </div>
              </div>
              <div className="ml-auto">
                <SidebarTrigger />
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
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6 bg-white">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="font-semibold text-lg">{getPageTitle()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span>{user?.name || "Admin"}</span>
              </Button>
            </div>
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
