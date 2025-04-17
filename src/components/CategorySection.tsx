
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Languages, Clock, Heart, Award } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  description: string;
  tagline: string;
  cta: string;
  image: string;
  backupImage: string;
  icon: React.ReactNode;
}

const categories: Category[] = [{
  id: 'security',
  name: 'Security Courses',
  description: 'Professional security training',
  tagline: 'Comprehensive security courses designed for individuals and organizations seeking professional certification and expertise',
  cta: 'Explore Security Courses',
  image: 'https://images.unsplash.com/photo-1553522911-d0ba7b3ee935?q=80&w=1470&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1553522911-d0ba7b3ee935?q=80&w=1470&auto=format&fit=crop',
  icon: <Shield className="h-4 w-4" />
}, {
  id: 'english',
  name: 'English Language',
  description: 'Master the English language',
  tagline: 'From beginners to advanced levels, our English language courses help you communicate confidently in any situation',
  cta: 'Explore English Courses',
  image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
  icon: <Languages className="h-4 w-4" />
}, {
  id: 'short-courses',
  name: 'Short Courses',
  description: 'Quick learning for busy professionals',
  tagline: 'Intensive, focused training designed for quick skill acquisition and immediate application in your career',
  cta: 'Explore Short Courses',
  image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1480&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1480&auto=format&fit=crop',
  icon: <Clock className="h-4 w-4" />
}, {
  id: 'health-safety',
  name: 'Health & Safety',
  description: '#1 Most popular topic on Lilly-Angel',
  tagline: 'With over 100,000 customers, from individuals to some of the most respected global brands',
  cta: 'Explore Health And Safety Courses',
  image: '/lovable-uploads/b6830540-4fd4-4909-8e65-53d63367223e.png',
  backupImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop',
  icon: <Heart className="h-4 w-4" />
}, {
  id: 'level-7',
  name: 'Level 7 Courses',
  description: 'Advanced professional qualifications',
  tagline: 'High-level qualifications designed for career advancement and deep industry expertise',
  cta: 'Explore Level 7 Courses',
  image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1470&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1470&auto=format&fit=crop',
  icon: <Award className="h-4 w-4" />
}];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeItem = categories.find(cat => cat.id === activeCategory) || categories[0];
  
  // Animation effect when changing categories
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4 relative inline-block">
            <span className="relative z-10">Lilly-Angel Training Courses & Qualifications</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200/50 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            {activeItem.tagline}
          </p>
        </motion.div>

        <div className="relative mb-12 overflow-hidden">
          <motion.div 
            className="flex flex-wrap justify-center border-b border-gray-200 pb-2 overflow-x-auto scrollbar-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex space-x-2 pb-2 px-4 flex-nowrap">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`px-5 py-3 text-sm md:text-base font-medium rounded-full flex items-center gap-2 shadow-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg transform -translate-y-1 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-orange-500 border border-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <span className={`${activeCategory === category.id ? 'text-white' : 'text-orange-500'}`}>
                    {category.icon}
                  </span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform"
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <motion.span 
                    className="bg-orange-100 text-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-6 w-fit"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeItem.description}
                  </motion.span>
                  <motion.h3 
                    className="text-3xl font-bold text-navy-dark mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeItem.name}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-8 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {activeItem.tagline}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-6 py-6 mt-4 rounded-lg w-fit group transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span>{activeItem.cta}</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </div>
                
                <div className="order-1 md:order-2 h-64 md:h-auto overflow-hidden">
                  <div className="h-full w-full">
                    <AspectRatio ratio={16/9} className="h-full">
                      <motion.img 
                        src={activeItem.image} 
                        alt={activeItem.name} 
                        className="w-full h-full object-cover object-center"
                        initial={{ scale: 1.1, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          e.currentTarget.src = activeItem.backupImage;
                        }}
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {categories.map((category, index) => (
                <motion.button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to ${category.name}`}
                  whileHover={{ scale: 1.2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
