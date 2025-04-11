
import React, { useState } from 'react';
import { Star, User, Bookmark } from 'lucide-react';
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
  reviewCount
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generate rating stars
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
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
          <div className="h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
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
          <div className="flex items-center gap-1 mb-2">
            {renderStars()}
            {reviewCount && (
              <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
            )}
          </div>
          
          <Badge variant="outline" className="mb-2 text-xs font-normal bg-gray-50">
            {category}
          </Badge>
          
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 h-14 text-navy-dark">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              {instructorAvatar ? (
                <img src={instructorAvatar} alt={instructorName} className="h-8 w-8 rounded-full" />
              ) : (
                instructorName.charAt(0)
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">By {instructorName}</span>
              <span className="text-xs text-gray-500">{students} students</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-5 py-4 border-t border-gray-100">
          <Button 
            className="w-full bg-white text-primary border-primary hover:bg-primary/5 transition-colors"
            variant="outline"
          >
            {price ? `Enroll Course - ${price}` : 'Enroll Course'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
