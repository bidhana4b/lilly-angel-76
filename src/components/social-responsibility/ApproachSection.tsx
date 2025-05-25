
import React from 'react';
import { motion } from 'framer-motion';

const ApproachSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">Our Approach to Social Responsibility</h2>
            <p className="text-gray-600 mb-6">
              We recognize that as an educational institution, we have a unique opportunity and responsibility to create positive change. Our approach to social responsibility is integrated into all aspects of our operations, from how we design our courses to how we engage with our communities.
            </p>
            <p className="text-gray-600 mb-6">
              We focus on initiatives that leverage our core expertise in education and training, creating programs that empower individuals, support communities, and promote sustainable practices both within our organization and beyond.
            </p>
            <p className="text-gray-600">
              Through strategic partnerships with nonprofits, community organizations, and businesses, we multiply our impact and address pressing social and environmental challenges.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }} 
            viewport={{ once: true }} 
            className="hidden md:block"
          >
            <img 
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Community outreach" 
              className="rounded-lg shadow-lg" 
              loading="lazy" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
