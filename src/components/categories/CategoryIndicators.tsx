
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from './types';

interface CategoryIndicatorsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryIndicators: React.FC<CategoryIndicatorsProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
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
  );
};

export default CategoryIndicators;
