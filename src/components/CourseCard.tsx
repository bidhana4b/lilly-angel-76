
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import OptimizedImage from './ui/optimized-image';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  rating: number;
  reviewCount?: number;
  students: number;
  instructorName: string;
  isFeatured?: boolean;
  price: string;
  duration: string;
}

const CourseCard = ({ 
  id,
  image, 
  title, 
  category, 
  rating, 
  reviewCount = 0, 
  students, 
  instructorName, 
  isFeatured = false,
  price,
  duration
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg card-hover h-full border-none shadow-md">
      <Link to={`/courses/${id}`} className="block">
        <div className="relative">
          <OptimizedImage 
            src={image} 
            alt={title}
            aspectRatio="aspect-[16/9]"
            className="w-full object-cover"
            placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YxZjVmOSIgLz48dGV4dCB4PSIzMDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMwIiBmaWxsPSIjOTRhM2I4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2UgbG9hZGluZy4uLjwvdGV4dD48L3N2Zz4="
          />
          {isFeatured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700">
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold py-1 px-2 rounded backdrop-blur-sm flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </div>
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800">
            {category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold ml-1">{rating}</span>
            {reviewCount > 0 && <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>}
          </div>
        </div>
        
        <Link to={`/courses/${id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14 hover:text-blue-600 transition-colors">{title}</h3>
        </Link>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span>{students.toLocaleString()} students</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <span className="text-gray-700">By</span>
          <span className="font-medium ml-1 text-navy-dark">{instructorName}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <div className="text-gray-900 font-bold">
            ${price}
          </div>
          <Link to={`/courses/${id}`}>
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors">
              Enroll Now
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
