import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
const Footer = () => {
  // Partner logos array with the uploaded images
  const partnerLogos = [{
    src: "/lovable-uploads/b3d9ea52-4905-417d-9403-6d23cd3e8499.png",
    alt: "Qualifi Logo"
  }, {
    src: "/lovable-uploads/18f4bf6f-6b3d-4e94-a279-58efe83fa447.png",
    alt: "Trinity College London Logo"
  }, {
    src: "/lovable-uploads/028b546c-a59b-47a0-a299-35ae799b0d5d.png",
    alt: "Highfield Approved Centre Logo"
  }, {
    src: "/lovable-uploads/95611343-7f51-4cf9-85a9-6a1b59554def.png",
    alt: "CalmMinds-UK Partnership Logo"
  }];
  return <footer>
      {/* Partners Section with Carousel */}
      

      {/* Main Footer */}
      <div className="bg-navy-dark text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <p className="text-gray-300 mb-4">Our institution prides itself in being a successful provider of further Education in London. Our mentors are passionate about delivering a high-quality service, which ultimately has a positive impact on the lives of individuals</p>
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
                <li><Link to="/tutors" className="text-gray-300 hover:text-white transition-colors">Tutors</Link></li>
                <li><Link to="/career" className="text-gray-300 hover:text-white transition-colors">Career</Link></li>
                <li><Link to="/social-responsibility" className="text-gray-300 hover:text-white transition-colors">Social Responsibility</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
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
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <img src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" alt="Lilly-Angel Logo" className="h-10 mb-4 md:mb-0 mx-auto md:mx-0" />
              </div>
              <div className="text-center md:text-left mb-4 md:mb-0">
                Lilly-Angel Empowering Learners Through Quality Education
              </div>
              <div>
                Copyright © {new Date().getFullYear()}. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;