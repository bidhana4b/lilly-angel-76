
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Corporate Team <span className="text-blue-600">Training Solutions</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Elevate your team's performance with our specialized corporate training programs designed to enhance skills, boost productivity, and foster innovation.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="bg-green-100 rounded-full p-1 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request Corporate Training
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6 text-yellow-800" />
              </div>
              <h3 className="text-xl font-bold mb-4">Why Choose Our Team Training?</h3>
              <p className="text-gray-600 mb-6">
                Our comprehensive approach combines theoretical learning with practical application, ensuring your team develops skills they can immediately implement in your workplace.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">95%</h4>
                  <p className="text-sm text-gray-600">Client satisfaction rate</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">+500</h4>
                  <p className="text-sm text-gray-600">Companies trained</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">24/7</h4>
                  <p className="text-sm text-gray-600">Support available</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">+50</h4>
                  <p className="text-sm text-gray-600">Training modules</p>
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
