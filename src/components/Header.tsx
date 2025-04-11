
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" 
              alt="Lilly-Angel Logo" 
              className="h-12 mr-2"
            />
          </div>
          
          <nav className="ml-10 hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tutors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 w-40 lg:w-60"
            />
          </div>
          <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
