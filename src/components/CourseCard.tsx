
import React, { useState } from 'react';
import { Star, User, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  rating: number;
  students: number;
  instructorName: string;
  instructorAvatar?: string;
  price?: string;
  isFeatured?: boolean;
  reviewCount?: number;
  duration?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  category,
  rating,
  students,
  instructorName,
  instructorAvatar,
  price,
  isFeatured = false,
  reviewCount,
  duration
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generate rating stars
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  // Fallback image handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80';
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        className={`overflow-hidden h-full border border-gray-200 hover:border-primary/50 transition-all duration-300 ${
          isHovered ? 'shadow-lg' : 'shadow-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="h-48 overflow-hidden bg-gray-100">
            <img 
              src={image} 
              alt={title} 
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={handleImageError}
            />
          </div>
          <button 
            className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark 
              className={`h-4 w-4 ${isBookmarked ? 'text-primary fill-primary' : 'text-gray-500'}`} 
            />
          </button>
          {isFeatured && (
            <Badge 
              variant="default" 
              className="absolute bottom-3 left-3 bg-primary text-white px-2 py-1"
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          <Badge variant="outline" className="mb-3 text-xs font-normal bg-gray-50 text-blue-600">
            {category}
          </Badge>
          
          <div className="flex items-center gap-1 mb-2">
            {renderStars()}
            <span className="ml-1 font-semibold text-yellow-500">{rating.toFixed(1)}</span>
            {reviewCount && (
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            )}
          </div>
          
          <h3 className="font-semibold text-lg mb-4 line-clamp-2 h-14 text-navy-dark hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex flex-col space-y-3 mt-3">
            <div className="flex items-center text-gray-600 text-sm">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              <span>{students} students</span>
            </div>
            
            {duration && (
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{duration}</span>
              </div>
            )}
          </div>
          
          {price && (
            <div className="mt-4 text-2xl font-bold text-navy-dark">
              ${price}
            </div>
          )}
        </CardContent>

        <CardFooter className="px-5 py-4 border-t border-gray-100">
          <Button 
            className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
          >
            {price ? `Enroll Now` : 'View Details'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
