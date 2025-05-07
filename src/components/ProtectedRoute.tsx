
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles,
  children
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to the user's dashboard if they try to access a route they don't have permission for
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
