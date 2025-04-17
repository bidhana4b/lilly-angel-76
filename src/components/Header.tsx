import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" alt="Lilly-Angel Logo" className="h-12 mr-2" width="114" height="48" loading="eager" fetchPriority="high" />
            </Link>
          </div>
          
          <nav className="ml-10 hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] p-4 lg:w-[400px] lg:grid-cols-1 gap-3">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Our Vision & Mission</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about our company's vision and mission
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
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
                  <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] p-4 lg:w-[400px] lg:grid-cols-1 gap-3">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/courses" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">All Courses</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our complete course catalog
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
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
                  <Link to="/tutors" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Tutors
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/career" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Career
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/social-responsibility" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Social Responsibility
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-10">
              <nav>
                <ul className="space-y-3">
                  <li><Link to="/" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                  <li><Link to="/about" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                  <li><Link to="/courses" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Courses</Link></li>
                  <li><Link to="/tutors" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Tutors</Link></li>
                  <li><Link to="/career" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Career</Link></li>
                  <li><Link to="/social-responsibility" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Social Responsibility</Link></li>
                  <li><Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                  <li><Link to="/login" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Log In</Link></li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            
          </div>
          <Link to="/login">
            <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">Online Registration</Button>
        </div>
      </div>
    </header>;
};
export default Header;