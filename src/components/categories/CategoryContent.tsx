
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Category } from './types';

interface CategoryContentProps {
  activeCategory: string;
  categories: Category[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ 
  activeCategory,
  categories
}) => {
  const activeItem = categories.find(cat => cat.id === activeCategory) || categories[0];

  return (
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
            <div className="h-full w-full relative group">
              <AspectRatio ratio={16/9} className="h-full">
                <motion.img 
                  src={activeItem.image} 
                  alt={activeItem.name} 
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    filter: "brightness(1.1)",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = activeItem.backupImage;
                  }}
                />
              </AspectRatio>
              
              {/* Enhanced image overlay with info that appears on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-6 backdrop-blur-[2px] group-hover:backdrop-blur-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeItem.id === 'security' && (
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="text-orange-400 font-semibold">Certified Training</span>
                    </div>
                  )}
                  <p className="text-white font-medium text-base md:text-lg mb-1">
                    Explore {activeItem.name}
                  </p>
                  <p className="text-white/90 text-sm md:text-base border-l-2 border-orange-500 pl-2 mt-2">
                    Click for complete course details & certification information
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryContent;
