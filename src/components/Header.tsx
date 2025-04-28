import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import OptimizedImage from '@/components/ui/optimized-image';
import { Menu, ChevronDown } from 'lucide-react';
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Animation variants for the logo
  const logoVariants = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Animation variants for menu items
  const menuItemVariants = {
    hover: {
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  return <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between py-3">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div initial="initial" animate="animate" whileHover="hover" variants={logoVariants} className="h-14 w-auto flex items-center justify-center">
            <OptimizedImage alt="Lilly-Angel Logo" className="h-14 w-auto object-contain" aspectRatio="aspect-auto" loading="eager" fetchPriority="high" src="/lovable-uploads/578c398f-11da-416f-94b3-9619310d0c14.png" />
          </motion.div>
        </Link>

        {/* Desktop Navigation with fancy animation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                  <motion.span variants={menuItemVariants} whileHover="hover">
                    Home
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/about') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                <motion.span variants={menuItemVariants} whileHover="hover">
                  About Us
                </motion.span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 min-w-[200px]">
                <ul className="grid gap-2">
                  <li>
                    <Link to="/about" className="block p-2 rounded-md hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/about/team" className="block p-2 rounded-md hover:bg-orange-100 transition-colors text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                      Our Team
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/courses') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                <motion.span variants={menuItemVariants} whileHover="hover">
                  Courses
                </motion.span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 min-w-[400px]">
                <ul className="grid gap-4">
                  <li>
                    <Link to="/courses" className="block p-2 rounded-md hover:bg-orange-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <div className="font-medium text-gray-800">All Courses</div>
                      <div className="text-sm text-gray-500">Browse our complete course catalog</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/health-safety" className="block p-2 rounded-md hover:bg-orange-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <div className="font-medium text-gray-800">Health & Safety</div>
                      <div className="text-sm text-gray-500">Courses for health and safety compliance</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/security" className="block p-2 rounded-md hover:bg-orange-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <div className="font-medium text-gray-800">Security Training</div>
                      <div className="text-sm text-gray-500">Professional security certification courses</div>
                    </Link>
                  </li>
                  <li className="bg-gray-50 rounded-md">
                    <Link to="/courses/teaching" className="block p-2 rounded-md hover:bg-orange-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <div className="font-medium text-gray-800">Teaching & Academics</div>
                      <div className="text-sm text-gray-500">Professional development for educators</div>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/tutors">
                <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/tutors') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                  <motion.span variants={menuItemVariants} whileHover="hover">
                    Tutors
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/career">
                <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/career') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                  <motion.span variants={menuItemVariants} whileHover="hover">
                    Career
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/social-responsibility">
                <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/social-responsibility') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                  <motion.span variants={menuItemVariants} whileHover="hover">
                    Social Responsibility
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", isActive('/contact') ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700")}>
                  <motion.span variants={menuItemVariants} whileHover="hover">
                    Contact
                  </motion.span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="button-shine">
              <Button variant="outline" size="sm" className="border-orange-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 font-medium">
                Log In
              </Button>
            </motion.div>
          </Link>
          <Link to="/login?register=true">
            <motion.div whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 8px rgba(255, 87, 51, 0.6)"
          }} whileTap={{
            scale: 0.95
          }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-md button-shine">
                Online Registration
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Navigation */}
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
            <motion.nav className="flex flex-col gap-4 mt-6" initial={{
            opacity: 0,
            y: 5
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            staggerChildren: 0.05,
            delayChildren: 0.2
          }}>
              <Link to="/" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              
              <div className="flex flex-col">
                <Link to="/about" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/about') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link to="/about/team" className={`text-md font-medium p-2 pl-6 rounded-md transition-colors ${isActive('/about/team') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                  Our Team
                </Link>
              </div>
              
              <div className="flex flex-col">
                <div className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/courses') ? 'text-orange-500 bg-orange-50' : 'text-gray-600'}`}>
                  Courses
                </div>
                <Link to="/courses" className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" onClick={() => setMobileMenuOpen(false)}>
                  All Courses
                </Link>
                <Link to="/courses/health-safety" className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" onClick={() => setMobileMenuOpen(false)}>
                  Health & Safety
                </Link>
                <Link to="/courses/security" className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" onClick={() => setMobileMenuOpen(false)}>
                  Security Training
                </Link>
                <Link to="/courses/teaching" className="text-md font-medium p-2 pl-6 rounded-md transition-colors text-gray-600 hover:text-orange-500 hover:bg-orange-50" onClick={() => setMobileMenuOpen(false)}>
                  Teaching & Academics
                </Link>
              </div>
              
              <Link to="/tutors" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/tutors') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                Tutors
              </Link>
              
              <Link to="/career" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/career') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                Career
              </Link>
              
              <Link to="/social-responsibility" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/social-responsibility') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                Social Responsibility
              </Link>
              
              <Link to="/contact" className={`text-lg font-medium p-2 rounded-md transition-colors ${isActive('/contact') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`} onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-orange-300 hover:border-orange-500 text-gray-700 hover:text-orange-600">
                    Log In
                  </Button>
                </Link>
                <Link to="/login?register=true" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Online Registration
                  </Button>
                </Link>
              </div>
            </motion.nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>;
};
export default Header;