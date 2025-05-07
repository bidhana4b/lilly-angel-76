
import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import HeaderNavItem from './HeaderNavItem';
import { 
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-navy-dark focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col p-4">
              <HeaderNavItem to="/" label="Home" isActive={currentPath === '/'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/about" label="About" isActive={currentPath === '/about'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/courses" label="Courses" isActive={currentPath === '/courses'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/tutors" label="Tutors" isActive={currentPath === '/tutors'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/career" label="Career" isActive={currentPath === '/career'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/social-responsibility" label="Social Responsibility" isActive={currentPath === '/social-responsibility'} onClick={() => setMobileMenuOpen(false)} />
              <HeaderNavItem to="/contact" label="Contact" isActive={currentPath === '/contact'} onClick={() => setMobileMenuOpen(false)} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
