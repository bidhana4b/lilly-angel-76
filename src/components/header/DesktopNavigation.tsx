
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import HeaderNavItem from './HeaderNavItem';

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <HeaderNavItem to="/" isActive={isActive('/')}>
            Home
          </HeaderNavItem>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={
              isActive('/about') 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" 
                : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105"
            }
          >
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 min-w-[200px]">
            <ul className="grid gap-2">
              <li>
                <Link to="/about" className="block p-2 rounded-md hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="block p-2 rounded-md hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600">
                  Our Team
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={
              isActive('/courses') 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" 
                : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105"
            }
          >
            Courses
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 min-w-[400px]">
            <ul className="grid gap-4">
              <li>
                <Link to="/courses" className="block p-2 rounded-md hover:bg-orange-100 transition-colors">
                  <div className="font-medium text-gray-800">All Courses</div>
                  <div className="text-sm text-gray-500">Browse our complete course catalog</div>
                </Link>
              </li>
              <li>
                <Link to="/courses/health-safety" className="block p-2 rounded-md hover:bg-orange-100 transition-colors">
                  <div className="font-medium text-gray-800">Health & Safety</div>
                  <div className="text-sm text-gray-500">Courses for health and safety compliance</div>
                </Link>
              </li>
              <li>
                <Link to="/courses/security" className="block p-2 rounded-md hover:bg-orange-100 transition-colors">
                  <div className="font-medium text-gray-800">Security Training</div>
                  <div className="text-sm text-gray-500">Professional security certification courses</div>
                </Link>
              </li>
              <li className="bg-gray-50 rounded-md">
                <Link to="/courses/teaching" className="block p-2 rounded-md hover:bg-orange-100 transition-colors">
                  <div className="font-medium text-gray-800">Teaching & Academics</div>
                  <div className="text-sm text-gray-500">Professional development for educators</div>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <HeaderNavItem to="/tutors" isActive={isActive('/tutors')}>
            Tutors
          </HeaderNavItem>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <HeaderNavItem to="/career" isActive={isActive('/career')}>
            Career
          </HeaderNavItem>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <HeaderNavItem to="/social-responsibility" isActive={isActive('/social-responsibility')}>
            Social Responsibility
          </HeaderNavItem>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <HeaderNavItem to="/contact" isActive={isActive('/contact')}>
            Contact
          </HeaderNavItem>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
