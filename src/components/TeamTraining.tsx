
import React from 'react';
import { Check, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const TeamTraining = () => {
  const benefits = [
    "Customized training programs tailored to your team's specific needs",
    "Flexible scheduling to accommodate your team's availability",
    "Real-time progress tracking and detailed performance analytics",
    "Collaborative projects to strengthen teamwork and communication",
    "Certification upon completion to validate acquired skills",
    "Ongoing support and consultation from industry experts"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left side with text content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy-dark relative">
              <span className="relative z-10">
                Corporate Team Training Solutions
              </span>
              <span className="absolute bottom-0 left-0 w-3/4 h-3 bg-orange-DEFAULT/20 -z-10 transform -rotate-1"></span>
            </h2>
            <p className="text-gray-700 mb-6">
              Invest in your team's growth with our specialized corporate training programs. Designed to enhance productivity,
              foster innovation, and build a stronger workforce ready to tackle today's challenges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Check className="text-green-500 mt-1 min-w-6" />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  Request Training
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Packages
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side with image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full bg-blue-500 rounded-lg -z-10"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-800">Elevate Your Team</h3>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Team training session" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-sm text-gray-700 mb-4">
                  Our team training programs have helped companies increase productivity by an average of 32% and employee satisfaction by 47%.
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Starting from £1200</span>
                  <span>In-person & Virtual options</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamTraining;
