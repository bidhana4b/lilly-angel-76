
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="px-2" aria-label="Menu">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-white to-orange-50">
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <span className="text-lg font-bold text-navy-dark">Menu</span>
        </div>
        <motion.nav 
          className="flex flex-col gap-4 mt-6" 
          initial={{
            opacity: 0,
            y: 5
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            staggerChildren: 0.05,
            delayChildren: 0.2
          }}
        >
          <Link 
            to="/" 
            className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          <div className="flex flex-col">
            <Link 
              to="/about" 
              className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/about') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/about/team" 
              className={`text-md font-medium p-2 pl-6 rounded-md transition-colors ${isActive('/about/team') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Team
            </Link>
          </div>
          
          <div className="flex flex-col">
            <div className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/courses') ? 'text-orange-500 bg-orange-50' : 'text-gray-600'}`}>
              Courses
            </div>
            <Link 
              to="/courses" 
              className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" 
              onClick={() => setMobileMenuOpen(false)}
            >
              All Courses
            </Link>
            <Link 
              to="/courses/health-safety" 
              className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Health & Safety
            </Link>
            <Link 
              to="/courses/security" 
              className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Security Training
            </Link>
            <Link 
              to="/courses/teaching" 
              className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Teaching & Academics
            </Link>
          </div>
          
          <Link 
            to="/tutors" 
            className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/tutors') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Tutors
          </Link>
          
          <Link 
            to="/career" 
            className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/career') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Career
          </Link>
          
          <Link 
            to="/social-responsibility" 
            className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/social-responsibility') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Social Responsibility
          </Link>
          
          <Link 
            to="/contact" 
            className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/contact') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} 
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full border-orange-300 hover:border-orange-500 text-gray-700 hover:text-orange-600"
              >
                Log In
              </Button>
            </Link>
            <Link to="/login?register=true" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Online Registration
              </Button>
            </Link>
          </div>
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
