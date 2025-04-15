
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger, SidebarRail } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface DashboardLayoutProps {
  sidebarContent: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebarContent }) => {
  const { user, logout } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="inset" collapsible="offcanvas">
          <SidebarHeader className="flex flex-col gap-2">
            <div className="flex items-center px-4 pb-2">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  E
                </span>
                <span>E-Learning</span>
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
                src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="font-semibold">Dashboard</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </Button>
            </div>
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
