
import React from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

const CareerSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
                alt="Students collaborating" 
                className="rounded-lg object-cover h-full w-full"
              />
              <div className="absolute -top-4 -right-4 bg-orange-DEFAULT text-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <span className="text-3xl font-bold block">10+</span>
                  <span className="text-sm">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">
              Empower Your Career Through Quality Education
            </h2>
            <p className="text-gray-600 mb-8">
              Our comprehensive learning platform provides the skills, knowledge, and credentials you need to achieve your career goals. With expert instructors and a supportive community, we help you master new competencies and advance professionally.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-light/10 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-orange-DEFAULT" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-navy-dark">Expert Tutor</h3>
                  <p className="text-gray-600">Learn from industry professionals with years of practical experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-light/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-orange-DEFAULT" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-navy-dark">Online Community</h3>
                  <p className="text-gray-600">Join a thriving community of learners for collaboration and networking</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-light/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-orange-DEFAULT" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-navy-dark">Course Guidelines</h3>
                  <p className="text-gray-600">Structured learning paths with clear objectives and measurable outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
