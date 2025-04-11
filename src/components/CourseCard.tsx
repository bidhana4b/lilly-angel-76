
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  rating: number;
  students: number;
  duration: string;
  price: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  category,
  rating,
  students,
  duration,
  price
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-course card-hover">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1">{rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{title}</h3>
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{students} students</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-navy-dark">{price}</span>
          <Button variant="outline" className="text-orange-DEFAULT border-orange-DEFAULT hover:bg-orange-DEFAULT/10">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
