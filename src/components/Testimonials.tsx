
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { QuoteIcon } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      initials: "JD",
      name: "John Doe",
      role: "Marketing Specialist",
    },
    {
      id: 2,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
      initials: "AS",
      name: "Amanda Smith",
      role: "UX Designer",
    },
    {
      id: 3,
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      initials: "ML",
      name: "Michael Lee",
      role: "Developer",
    },
    {
      id: 4,
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Data Analyst",
    },
  ];

  return (
    <section className="py-16 bg-navy-dark text-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Everyone Deserves The Chance <br/> To Learn With EduHub
          </h2>
          <p className="text-gray-300 max-w-2xl">
            Join thousands of satisfied students who have transformed their careers and lives through our comprehensive educational platform.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map(testimonial => (
            <Avatar key={testimonial.id} className="h-12 w-12 border-2 border-white">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button className="bg-orange-DEFAULT hover:bg-orange-dark text-white">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
