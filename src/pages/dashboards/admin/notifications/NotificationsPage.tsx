
import React from "react";
import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock } from "lucide-react";

// Import submodules
import CreateNotificationPage from "./CreateNotificationPage";
import NotificationHistoryPage from "./NotificationHistoryPage";

const NotificationsPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Create and manage system notifications
          </p>
        </div>
      </div>

      <Card>
        <Tabs 
          defaultValue="create" 
          value={currentTab === "notifications" ? "create" : currentTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full bg-muted/50 p-1">
            <TabsTrigger value="create" asChild>
              <NavLink to="/dashboard/admin/notifications/create" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Create Notification</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="history" asChild>
              <NavLink to="/dashboard/admin/notifications/history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Notification History</span>
              </NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <Routes>
        <Route index element={<Navigate to="create" replace />} />
        <Route path="create" element={<CreateNotificationPage />} />
        <Route path="history" element={<NotificationHistoryPage />} />
      </Routes>
    </div>
  );
};

export default NotificationsPage;
