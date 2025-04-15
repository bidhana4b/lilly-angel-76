
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center" 
        style={{
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          contentVisibility: 'auto',
        }}>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center md:items-start py-20 md:py-28 md:max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Complete Vision Towards Professional Education
          </h1>
          <p className="text-gray-200 mb-8">
            Top-Quality & Affordable Tutoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-orange-DEFAULT hover:bg-orange-dark text-white px-6 py-2">
              Find Your Courses
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Student Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
