import React, { useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
const Footer = () => {
  // Partner logos array with the uploaded images
  const partnerLogos = [{
    src: "/lovable-uploads/e5ef987b-f557-4da4-a3e8-fbc618638f9e.png",
    alt: "Qualifi Logo"
  }, {
    src: "/lovable-uploads/6ec0235d-fd2f-4929-9c0b-149301b598ae.png",
    alt: "Trinity College London Logo"
  }, {
    src: "/lovable-uploads/6cb5dcdd-6528-45fd-bef5-3ba6341206e8.png",
    alt: "Highfield Approved Centre Logo"
  }, {
    src: "/lovable-uploads/d9ee0f94-2914-4175-abb5-3a8887aae076.png",
    alt: "CalmMinds-UK Partnership Logo"
  }, {
    src: "/lovable-uploads/ff791e04-e93f-48b4-8bbc-34970cbbfe58.png",
    alt: "Additional Partner Logo"
  }];
  return <footer>
      {/* Partners Section with Slideshow */}
      <div className="bg-[#8DD8F8] py-12">
        <div className="container mx-auto">
          <div className="border-t border-b border-gray-300 py-8">
            <Carousel opts={{
            align: "start",
            loop: true
          }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {partnerLogos.map((logo, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/5">
                    <div className="p-2 flex items-center justify-center h-24">
                      <img src={logo.src} alt={logo.alt} className="h-16 md:h-20 object-contain transition-all hover:scale-110 duration-300" />
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static translate-y-0 mx-2" />
                <CarouselNext className="static translate-y-0 mx-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-navy-dark text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <img src="/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png" alt="Lilly-Angel Logo" className="h-8 mr-2" />
                Lilly-Angel
              </h3>
              <p className="text-gray-300 mb-4">Our intuition prides in being a successful provider of further Education in London. Our mentors are passionate about delivering a high-quality service, which ultimately has a positive impact on the lives of individuals</p>
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