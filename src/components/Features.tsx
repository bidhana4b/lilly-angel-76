
import React from 'react';
import { Trophy, BookOpen, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Trophy className="h-10 w-10 text-orange-DEFAULT" />,
      title: "Flexibility & Expertise",
      description: "Learn from industry professionals with flexible scheduling options",
      stats: "96% Success Rate"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-orange-DEFAULT" />,
      title: "Customized Curriculum",
      description: "Personalized learning path designed to match your goals",
      stats: "200+ Courses Available"
    },
    {
      icon: <Users className="h-10 w-10 text-orange-DEFAULT" />,
      title: "Mentoring",
      description: "One-on-one guidance from experienced mentors in your field",
      stats: "24/7 Support"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center card-hover"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-navy-dark">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <span className="text-sm font-medium bg-orange-light/10 text-orange-dark px-3 py-1 rounded-full">
                {feature.stats}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
