
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" 
                alt="Lilly-Angel Logo" 
                className="h-12 mr-2"
                width="114" 
                height="48"
                loading="eager"
                fetchPriority="high"
              />
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
                  <NavigationMenuTrigger className="text-orange-500 font-medium">Student Advisory</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex min-w-[600px] bg-white">
                      <div className="w-1/2 border-r">
                        <ul className="p-4">
                          <li className="mb-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/consultancy"
                                className="block font-semibold text-gray-900 rounded-md p-2 hover:bg-gray-100"
                              >
                                Our Student Consultancy
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="mb-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/countries"
                                className="block font-semibold text-orange-500 rounded-md p-2 hover:bg-gray-100"
                              >
                                Country We Work With
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/online-admission"
                                className="block font-semibold text-gray-900 rounded-md p-2 hover:bg-gray-100"
                              >
                                Online Admission Form
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                      <div className="w-1/2 bg-gray-50">
                        <ul className="p-4">
                          <li className="mb-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/study-uk"
                                className="block font-medium text-gray-900 rounded-md p-2 hover:bg-gray-100"
                              >
                                Study In UK
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li className="mb-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/study-australia"
                                className="block font-medium text-gray-900 rounded-md p-2 hover:bg-gray-100"
                              >
                                Study In Australia
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/study-canada"
                                className="block font-medium text-gray-900 rounded-md p-2 hover:bg-gray-100"
                              >
                                Study In Canada
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-blue-600 focus:outline-none px-4 py-2">
                    Blog
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
                  <li>
                    <div className="py-2">
                      <p className="text-orange-500 font-medium mb-2">Student Advisory</p>
                      <ul className="pl-4 space-y-2">
                        <li><Link to="/consultancy" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Our Student Consultancy</Link></li>
                        <li><Link to="/countries" className="block text-orange-500 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Country We Work With</Link></li>
                        <li><Link to="/online-admission" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Online Admission Form</Link></li>
                        <li><Link to="/study-uk" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Study In UK</Link></li>
                        <li><Link to="/study-australia" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Study In Australia</Link></li>
                        <li><Link to="/study-canada" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Study In Canada</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="/blog" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                  <li><Link to="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 w-40 lg:w-60"
              aria-label="Search courses"
            />
          </div>
          <Link to="/login">
            <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
