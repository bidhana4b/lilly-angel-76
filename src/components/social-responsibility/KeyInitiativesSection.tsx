
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, HandHeart, Globe, Users } from 'lucide-react';

const KeyInitiativesSection = () => {
  const initiatives = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: "Environmental Sustainability",
      description: "Our commitment to reducing our carbon footprint through digital learning resources, energy-efficient facilities, and sustainable practices."
    },
    {
      icon: <HandHeart className="h-10 w-10 text-red-600" />,
      title: "Community Education",
      description: "Free training workshops and educational resources provided to underserved communities to promote skill development and employability."
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-600" />,
      title: "Global Partnerships",
      description: "Collaborations with international organizations to extend educational opportunities to developing regions worldwide."
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Diversity & Inclusion",
      description: "Creating an inclusive learning environment that celebrates diversity and ensures equal opportunities for all students and staff."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Our Key Initiatives</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We focus on these core areas to maximize our positive impact on society and the environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md flex" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }} 
              viewport={{ once: true }}
            >
              <div className="mr-4 flex-shrink-0">
                {initiative.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy-dark mb-2">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInitiativesSection;
