
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-navy-dark text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Us In Making A Difference</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Whether you're a student, business, or community organization, there are many ways to participate in our social responsibility initiatives.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" className="bg-white text-navy-dark hover:bg-gray-100">
            Partner With Us
          </Button>
          <Button variant="outline" className="border-white text-gray-50 bg-orange-dark">
            Volunteer Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
