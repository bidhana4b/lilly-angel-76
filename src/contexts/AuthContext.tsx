
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Define user roles
export type UserRole = "admin" | "teacher" | "student";

// Define user type
export interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    email: "admin@example.com",
    name: "Super Admin",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Super+Admin&background=191c44&color=fff",
  },
  {
    email: "teacher@example.com",
    name: "Jane Smith",
    role: "teacher",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=191c44&color=fff",
  },
  {
    email: "student@example.com",
    name: "John Doe",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=191c44&color=fff",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Find the user in our mock database
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // If user is found (password is ignored for demo)
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        
        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(foundUser));
        
        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        // Redirect based on role
        navigate(`/dashboard/${foundUser.role}`);
        return true;
      } else {
        // Show error toast
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error(error);
      
      // Show error toast
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
    
    // Show success toast
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
