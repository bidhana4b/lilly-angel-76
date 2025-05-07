
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  NavigationMenuItem,
  NavigationMenuLink 
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderNavItemProps {
  to: string;
  label: string;
  isActive?: boolean;
  tooltip?: string;
  onClick?: () => void;
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

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ to, label, isActive = false, tooltip, onClick }) => {
  const renderLink = (
    <Link to={to} onClick={onClick}>
      <NavigationMenuLink 
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white hover:shadow-md hover:scale-105", 
          isActive ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "text-gray-700"
        )}
      >
        <motion.span variants={menuItemVariants} whileHover="hover">
          {label}
        </motion.span>
      </NavigationMenuLink>
    </Link>
  );

  if (!tooltip) {
    return (
      <NavigationMenuItem>
        {renderLink}
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            {renderLink}
          </TooltipTrigger>
          <TooltipContent className="bg-white text-gray-800 border border-gray-200 shadow-md animate-in fade-in duration-300">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NavigationMenuItem>
  );
};

export default HeaderNavItem;
