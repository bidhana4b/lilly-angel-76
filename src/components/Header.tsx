import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" 
              alt="Lilly-Angel Logo" 
              className="h-12" 
              width="114" 
              height="48" 
              loading="eager" 
              fetchPriority="high" 
            />
          </Link>
          
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 font-medium">About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[300px] p-4 gap-3 grid">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/about" 
                          className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-medium">Our Vision & Mission</div>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            Learn about our company's vision and mission
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about/team" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Our Team</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Meet the people behind Lilly-Angel
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about/history" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Our History</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover our journey and milestones
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 font-medium">Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[300px] p-4 gap-3 grid">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/courses" 
                          className="block p-3 space-y-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-medium">All Courses</div>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            Browse our complete course catalog
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/courses?category=health" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Health & Safety</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Courses for health and safety compliance
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/courses?category=security" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Security Training</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Professional security certification courses
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/courses?category=teaching" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Teaching & Academics</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Professional development for educators
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/tutors" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Tutors
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/career" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Career
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/social-responsibility" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Social Responsibility
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/contact" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-10">
              <nav className="space-y-4">
                <Link to="/" className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <li><Link to="/courses" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
                <li><Link to="/tutors" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Tutors</Link></li>
                <li><Link to="/career" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Career</Link></li>
                <li><Link to="/social-responsibility" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Social Responsibility</Link></li>
                <li><Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/login" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Log In</Link></li>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                className="group relative overflow-hidden px-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <LogIn className="w-4 h-4 mr-2" />
                Log In
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
