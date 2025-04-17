
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Shield, Languages, Clock, Heart, Award, Sparkles } from 'lucide-react';
import { categories } from './types';
import CategoryTabs from './CategoryTabs';
import CategoryContent from './CategoryContent';
import CategoryIndicators from './CategoryIndicators';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position into parallax movement values with different intensities
  const layer1X = useTransform(mouseX, [-500, 500], [15, -15]);
  const layer1Y = useTransform(mouseY, [-500, 500], [15, -15]);
  const layer2X = useTransform(mouseX, [-500, 500], [-10, 10]);
  const layer2Y = useTransform(mouseY, [-500, 500], [-10, 10]);
  
  // Track mouse position relative to the container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  // Reset mouse position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
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
          ref={containerRef}
          className="mb-12 max-w-3xl mx-auto text-center relative z-10 perspective-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Decorative elements with parallax effect */}
          <motion.div 
            className="absolute -z-10 w-full h-full top-0 left-0 bg-orange-50 rounded-xl -rotate-1 scale-110"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              x: layer1X, 
              y: layer1Y,
              rotateX: useTransform(mouseY, [-500, 500], [2, -2]),
              rotateY: useTransform(mouseX, [-500, 500], [-2, 2])
            }}
          />
          
          <motion.div 
            className="absolute -z-10 w-full h-full top-2 left-2 bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl rotate-1 scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ 
              x: layer2X, 
              y: layer2Y,
              rotateX: useTransform(mouseY, [-500, 500], [-1, 1]),
              rotateY: useTransform(mouseX, [-500, 500], [1, -1])
            }}
          />
          
          <div className="p-6">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="text-orange-500 h-6 w-6 animate-pulse" />
              <span className="text-orange-500 font-medium uppercase tracking-wide text-sm">Featured Courses</span>
              <Sparkles className="text-orange-500 h-6 w-6 animate-pulse" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-navy-dark relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="relative z-10">Lilly-Angel Training Courses & Qualifications</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200/70 -z-10 transform -rotate-1"></span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-700 text-lg mt-6 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {categoriesWithIcons.find(cat => cat.id === activeCategory)?.tagline || ''}
            </motion.p>
          </div>
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
