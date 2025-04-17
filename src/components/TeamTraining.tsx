
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
    <section id="team-training" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Corporate Team Training</h2>
              <p className="text-gray-600 mb-6">
                Elevate your team's skills and productivity with our specialized corporate training programs. 
                We provide comprehensive solutions designed to address your organization's unique challenges 
                and objectives.
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">Request Information</Button>
                <Button variant="outline">Download Brochure</Button>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.div 
              className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Trophy className="h-10 w-10 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">Success Stories</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Tech Innovations Ltd.</h4>
                  <p className="text-gray-600 mb-2">
                    "After completing the team training, our productivity increased by 35% and team cohesion improved significantly."
                  </p>
                  <p className="text-sm text-gray-500">— Sarah Johnson, HR Director</p>
                </div>
                
                <div className="bg-white p-5 rounded-md shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Global Security Solutions</h4>
                  <p className="text-gray-600 mb-2">
                    "The customized security training program provided exactly what our team needed. Highly recommended!"
                  </p>
                  <p className="text-sm text-gray-500">— Michael Chen, Operations Manager</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTraining;
