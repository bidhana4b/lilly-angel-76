
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/optimized-image';

const logoVariants = {
  initial: {
    opacity: 0,
    y: -20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <motion.div 
        initial="initial" 
        animate="animate" 
        whileHover="hover" 
        variants={logoVariants} 
        className="h-14 w-40"
      >
        <OptimizedImage 
          src="/lovable-uploads/d1ec282c-b572-4a27-b1b5-1bfc82905ae9.png" 
          alt="Lilly-Angel Logo" 
          className="h-full w-full" 
          aspectRatio="aspect-auto" 
          loading="eager" 
          fetchPriority="high"
        />
      </motion.div>
    </Link>
  );
};

export default HeaderLogo;
