
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AuthButtons: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/login">
        <motion.div 
          whileHover={{
            scale: 1.05
          }} 
          whileTap={{
            scale: 0.95
          }} 
          className="button-shine"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="border-orange-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 font-medium"
          >
            Log In
          </Button>
        </motion.div>
      </Link>
      <Link to="/login?register=true">
        <motion.div 
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 8px rgba(255, 87, 51, 0.6)"
          }} 
          whileTap={{
            scale: 0.95
          }} 
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-md button-shine"
          >
            Online Registration
          </Button>
        </motion.div>
      </Link>
    </div>
  );
};

export default AuthButtons;
