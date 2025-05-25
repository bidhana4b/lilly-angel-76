
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CommunityPartnershipSection = () => {
  return (
    <section className="py-16 bg-green-100 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Community Partnership
          </motion.h2>
          <motion.p 
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We're proud to support Bonny Downs Community Association in their mission to serve the local community and create positive change.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="/lovable-uploads/fe07de65-07a9-4c55-b709-d0fd58761e3c.png" 
              alt="Join as Friends of Bonny Downs" 
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-navy-dark mb-3">Support Bonny Downs</h3>
              <p className="text-gray-600 mb-4">
                For less than the price of a Netflix subscription, your support can change local lives. 
                Join 600 Friends who donate just £10 monthly to help deliver vital community services.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="/lovable-uploads/95c9c31a-8c7c-4114-a127-f147a9e3d0dc.png" 
              alt="BDCA Community Support" 
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-navy-dark mb-3">Community Impact</h3>
              <p className="text-gray-600 mb-4">
                At BDCA, they help people of all backgrounds in the local community, including families on 
                low income, those experiencing homelessness, young people, and lonely elders.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Visit bonnydowns.org
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-600">
            Bonny Downs Community Association is a registered charity no 1071625<br />
            Registered Office: The Well Community Centre, 49 Vicarage Lane, London E6 6DQ
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityPartnershipSection;
