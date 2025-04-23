
import React from "react";
import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users } from "lucide-react";

// Import submodules
import GeneralSettingsPage from "./GeneralSettingsPage";
import AdminRolesPage from "./AdminRolesPage";

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure system settings and manage administrator permissions
          </p>
        </div>
      </div>

      <Card>
        <Tabs 
          defaultValue="general" 
          value={currentTab === "settings" ? "general" : currentTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full bg-muted/50 p-1">
            <TabsTrigger value="general" asChild>
              <NavLink to="/dashboard/admin/settings/general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>General Settings</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="roles" asChild>
              <NavLink to="/dashboard/admin/settings/roles" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Admin Roles</span>
              </NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <Routes>
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<GeneralSettingsPage />} />
        <Route path="roles" element={<AdminRolesPage />} />
      </Routes>
    </div>
  );
};

export default SettingsPage;
