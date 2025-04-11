
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-navy-dark">Edu<span className="text-orange-dark">Hub</span></h1>
          
          <nav className="ml-10 hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-gray-600 hover:text-orange-dark transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-dark transition-colors">Courses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-dark transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-dark transition-colors">Tutors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-dark transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-light w-40 lg:w-60"
            />
          </div>
          <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          <Button className="bg-orange-DEFAULT hover:bg-orange-dark">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
