
import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderNavItem from './HeaderNavItem';
import { 
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-8">
          <HeaderNavItem to="/" label="Home" isActive={currentPath === '/'} />
          <HeaderNavItem to="/about" label="About" isActive={currentPath === '/about'} />
          <HeaderNavItem to="/courses" label="Courses" isActive={currentPath === '/courses'} />
          <HeaderNavItem to="/tutors" label="Tutors" isActive={currentPath === '/tutors'} />
          <HeaderNavItem to="/career" label="Career" isActive={currentPath === '/career'} />
          <HeaderNavItem to="/social-responsibility" label="Social Responsibility" isActive={currentPath === '/social-responsibility'} />
          <HeaderNavItem to="/contact" label="Contact" isActive={currentPath === '/contact'} />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
