
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const partners = ["/lovable-uploads/0d38ad80-069f-4181-94dc-8c0553640c31.png"];
  return (
    <footer>
      <div className="bg-navy-dark text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <img 
                  src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" 
                  alt="Lilly-Angel Logo" 
                  className="h-8 mr-2"
                />
                Lilly-Angel
              </h3>
              <p className="text-gray-300 mb-4">
                Providing quality education and training accessible to everyone, everywhere.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                <li><Link to="/courses?category=health" className="text-gray-300 hover:text-white transition-colors">Health and Safety</Link></li>
                <li><Link to="/courses?category=first-aid" className="text-gray-300 hover:text-white transition-colors">First Aid</Link></li>
                <li><Link to="/courses?category=security" className="text-gray-300 hover:text-white transition-colors">Security Training</Link></li>
                <li><Link to="/courses?category=hospitality" className="text-gray-300 hover:text-white transition-colors">Hospitality</Link></li>
                <li><Link to="/courses?category=teaching" className="text-gray-300 hover:text-white transition-colors">Teaching & Academics</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          
          {partners.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="text-center text-gray-300 mb-4">Our Trusted Partners</h4>
              <div className="flex justify-center space-x-8">
                {partners.map((partner, index) => (
                  <img 
                    key={index}
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    className="h-12 object-contain"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lilly-Angel. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
