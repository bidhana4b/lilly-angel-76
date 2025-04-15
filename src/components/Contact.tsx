
import React from 'react';
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <section className="py-16 bg-navy-dark text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Company Description */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Intuition</h3>
            <p className="text-gray-300">
              Our intuition prides in being a successful provider of further Education in London. Our mentors are passionate about delivering a high-quality service, which ultimately has a positive impact on the lives of individuals.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Column 3: Opening Hours & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Opening Hours</h3>
            <div className="flex items-start space-x-3 mb-4">
              <Clock className="h-5 w-5 text-orange-DEFAULT mt-0.5" />
              <p className="text-gray-300">09 AM - 05 PM</p>
            </div>
            <div className="flex items-start space-x-3 mb-6">
              <Calendar className="h-5 w-5 text-orange-DEFAULT mt-0.5" />
              <p className="text-gray-300">Monday - Saturday</p>
            </div>
            
            <p className="text-gray-300 mb-6">
              Our Support team is here for you around the clock, ready to answer your questions anytime.
            </p>
            
            <Button className="bg-orange-DEFAULT hover:bg-orange-dark text-white px-10 py-6 rounded">
              CALL US TODAY
            </Button>
          </div>
        </div>
        
        {/* Contact Information Row */}
        <div className="mt-12 pt-10 border-t border-gray-700">
          <h3 className="text-xl font-bold mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-orange-DEFAULT mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                1st floor, The welcome hub, 35 Vicarage lane East Ham E6 6DQ
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-orange-DEFAULT mt-1 flex-shrink-0" />
              <p className="text-gray-300">+44 02031962855</p>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-orange-DEFAULT mt-1 flex-shrink-0" />
              <p className="text-gray-300">info@lilly-angel.co.uk</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
