
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Grid2X2 } from 'lucide-react';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className="flex flex-wrap justify-center border-b border-gray-200 pb-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
    >
      {isMobile ? (
        // Mobile view - grid layout
        <div className="grid grid-cols-2 gap-2 w-full px-4 py-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-3 py-3 text-sm font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg'
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
              <span className="text-xs md:text-sm">{category.name}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        // Desktop view - horizontal scrolling
        <div className="inline-flex space-x-2 pb-2 px-4 overflow-x-auto scrollbar-none flex-nowrap">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-5 py-3 text-sm md:text-base font-medium rounded-full flex items-center gap-2 shadow-sm transition-all duration-300 whitespace-nowrap ${
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
      )}
    </motion.div>
  );
};

export default CategoryTabs;
