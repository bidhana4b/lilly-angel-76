
import React from 'react';
import { motion } from 'framer-motion';

const SocialHeroSection = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-navy-dark mb-4" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Our Social Responsibility
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto mb-8" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          At Lilly-Angel, we believe education is a powerful tool for creating positive change. Our commitment to social responsibility extends beyond the classroom to make a meaningful impact on communities and the environment.
        </motion.p>
      </div>
    </section>
  );
};

export default SocialHeroSection;
