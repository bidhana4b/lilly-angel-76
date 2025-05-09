
import React from 'react';
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
const Contact = () => {
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
  return <section className="py-16 bg-gradient-to-r from-navy-dark to-navy-light relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-orange-light animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-orange-DEFAULT animate-float opacity-20"></div>
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-blue-400 animate-float opacity-20"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Company Description */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} viewport={{
          once: true
        }} className="bg-navy-light/30 p-6 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-white text-center">Proudly Member</h3>
            <div className="flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }}
                className="max-w-full"
              >
                <img 
                  src="/lovable-uploads/bbd6870b-dc62-4a60-9b89-a5daca6d50b0.png" 
                  alt="Bonny Downs Community Association" 
                  className="max-h-56 object-contain mx-auto"
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="bg-navy-light/30 p-6 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-white">Contact Form</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input id="name" placeholder="Your name" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <textarea id="message" rows={3} placeholder="How can we help you?" className="w-full rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 p-2"></textarea>
              </div>
              <Button className="bg-orange-DEFAULT hover:bg-orange-dark text-white w-full">
                Send Message
              </Button>
            </form>
          </motion.div>
          
          {/* Column 3: Opening Hours & Contact */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="bg-navy-light/30 p-6 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-white">Opening Hours</h3>
            <div className="flex items-start space-x-3 mb-4">
              <Clock className="h-5 w-5 text-orange-DEFAULT mt-0.5 bg-orange-dark" />
              <p className="text-gray-300">09 AM - 05 PM</p>
            </div>
            <div className="flex items-start space-x-3 mb-6">
              <Calendar className="h-5 w-5 text-orange-DEFAULT mt-0.5 bg-orange-dark" />
              <p className="text-gray-300">Monday - Saturday</p>
            </div>
            
            <p className="text-gray-300 mb-6">
              Our Support team is here for you around the clock, ready to answer your questions anytime.
            </p>
            
            <Button className="bg-orange-DEFAULT hover:bg-orange-dark text-white px-10 py-6 rounded transition-all hover:scale-105">
              CALL US TODAY
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Partners Section */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} viewport={{
        once: true
      }} className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">Our Partners</h3>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            We are proud to work with these trusted organizations to deliver high-quality education and training programs.
          </p>
          
          <div className="p-6 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg bg-indigo-500">
            <Carousel className="w-full" opts={{
            align: "start",
            loop: true
          }}>
              <CarouselContent className="py-4">
                {partnerLogos.map((logo, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                    <motion.div className="h-24 bg-white/10 rounded-lg p-4 flex items-center justify-center mx-2 hover:bg-white/20 transition-colors" initial={{
                  opacity: 0,
                  y: 10
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.3,
                  delay: index * 0.1
                }} whileHover={{
                  scale: 1.05
                }} viewport={{
                  once: true
                }}>
                      <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                    </motion.div>
                  </CarouselItem>)}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.div>
        
        {/* Contact Information Row */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="mt-12 pt-10 border-t border-gray-700">
          <h3 className="text-2xl font-bold mb-8 text-white text-center">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 bg-navy-light/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg group">
              <MapPin className="h-8 w-8 text-[#f75722] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-white font-semibold mb-1">Address</h4>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  1st floor, The welcome hub,<br />
                  35 Vicarage lane East Ham<br />
                  E6 6DQ
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-navy-light/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg group">
              <Phone className="h-8 w-8 text-[#f75722] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-white font-semibold mb-1">Phone</h4>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  +44 02031962855
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-navy-light/30 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg group">
              <Mail className="h-8 w-8 text-[#f75722] flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                  info@lilly-angel.co.uk
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Contact;
