
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Book, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseFormData } from './CourseFormWizard';

interface CoursePreviewProps {
  course: CourseFormData;
}

const CoursePreview = ({ course }: CoursePreviewProps) => {
  // Calculate the number of students (mock value for preview)
  const studentCount = 32;
  
  // Calculate the number of ratings (mock value for preview)
  const ratingCount = 12;
  
  // Calculate total number of lessons
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  
  return (
    <div>
      <div className="aspect-[16/9] bg-gray-200 rounded-t-lg overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-100">
            <span className="text-gray-400">Course thumbnail</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800">
            {course.category || 'Category'}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold ml-1">4.8</span>
            <span className="text-xs text-gray-500 ml-1">({ratingCount})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
          {course.title || 'Course Title'}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span>{studentCount} students</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <span className="text-gray-700">By</span>
          <span className="font-medium ml-1 text-navy-dark">
            {course.teachers?.length > 0 
              ? teacherNames(course.teachers) 
              : 'Instructor Name'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs flex items-center">
            <Book className="h-3 w-3 mr-1" />
            <span>{totalLessons} lessons</span>
          </div>
          
          <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{course.duration} {course.durationUnit}</span>
          </div>
          
          <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs flex items-center">
            <span>{getLevelBadge(course.level)}</span>
          </div>
        </div>
        
        {course.objectives.length > 0 && (
          <div className="mt-4 mb-4">
            <h4 className="font-medium text-sm mb-2">What you'll learn:</h4>
            <ul className="space-y-1">
              {course.objectives.slice(0, 3).map((objective, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{objective.text || `Learning objective ${index + 1}`}</span>
                </li>
              ))}
              {course.objectives.length > 3 && (
                <li className="text-sm text-blue-600">+ {course.objectives.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
        
        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
          <div className="text-gray-900 font-bold">
            {course.discountPrice ? (
              <div className="flex items-baseline gap-2">
                <span>${course.discountPrice}</span>
                <span className="text-gray-500 line-through text-sm">${course.price}</span>
              </div>
            ) : (
              <div>${course.price || '99.99'}</div>
            )}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to format teacher names
function teacherNames(teacherIds: string[]): string {
  const teacherMap: Record<string, string> = {
    "1": "John Smith",
    "2": "Emma Wilson",
    "3": "Robert Johnson",
    "4": "Sarah Parker",
    "5": "Michael Brown",
  };
  
  if (teacherIds.length === 0) return "Instructor Name";
  if (teacherIds.length === 1) return teacherMap[teacherIds[0]] || "Instructor Name";
  
  return teacherMap[teacherIds[0]] + ` +${teacherIds.length - 1} more`;
}

// Helper function to get level badge text
function getLevelBadge(level: string): string {
  switch (level) {
    case "beginner":
      return "Beginner Level";
    case "intermediate":
      return "Intermediate Level";
    case "advanced":
      return "Advanced Level";
    default:
      return "All Levels";
  }
}

export default CoursePreview;
