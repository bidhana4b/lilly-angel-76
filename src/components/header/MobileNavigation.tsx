import React from 'react';
import { Menu } from 'lucide-react';
import HeaderNavItem from './HeaderNavItem';

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
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
          <ul className="flex flex-col p-4">
            <HeaderNavItem to="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/about" label="About" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/courses" label="Courses" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/tutors" label="Tutors" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/career" label="Career" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/social-responsibility" label="Social Responsibility" onClick={() => setMobileMenuOpen(false)} />
            <HeaderNavItem to="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
