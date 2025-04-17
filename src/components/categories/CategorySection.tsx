
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Languages, Clock, Heart, Award } from 'lucide-react';
import { categories } from './types';
import CategoryTabs from './CategoryTabs';
import CategoryContent from './CategoryContent';
import CategoryIndicators from './CategoryIndicators';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add icons to categories
  const categoriesWithIcons = categories.map(category => {
    let icon;
    switch(category.id) {
      case 'security':
        icon = <Shield className="h-4 w-4" />;
        break;
      case 'english':
        icon = <Languages className="h-4 w-4" />;
        break;
      case 'short-courses':
        icon = <Clock className="h-4 w-4" />;
        break;
      case 'health-safety':
        icon = <Heart className="h-4 w-4" />;
        break;
      case 'level-7':
        icon = <Award className="h-4 w-4" />;
        break;
      default:
        icon = <Shield className="h-4 w-4" />;
    }
    return { ...category, icon };
  });
  
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
            {categoriesWithIcons.find(cat => cat.id === activeCategory)?.tagline || ''}
          </p>
        </motion.div>

        <div className="relative mb-12 overflow-hidden">
          <CategoryTabs 
            categories={categoriesWithIcons} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <CategoryContent 
            activeCategory={activeCategory} 
            categories={categoriesWithIcons} 
          />
          
          <CategoryIndicators 
            categories={categoriesWithIcons} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
