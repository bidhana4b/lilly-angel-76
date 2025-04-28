
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderNavItemProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const menuItemVariants = {
  hover: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ to, isActive, children }) => {
  return (
    <Link to={to}>
      <NavigationMenuLink 
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", 
          isActive ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700"
        )}
      >
        <motion.span variants={menuItemVariants} whileHover="hover">
          {children}
        </motion.span>
      </NavigationMenuLink>
    </Link>
  );
};

export default HeaderNavItem;
