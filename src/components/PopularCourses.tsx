
import React from 'react';
import CourseCard from './CourseCard';
import { Button } from '@/components/ui/button';

const PopularCourses = () => {
  const courses = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1237&q=80",
      title: "Digital Marketing Strategy & Social Media Marketing",
      category: "Marketing",
      rating: 4.8,
      students: 3254,
      duration: "12 weeks",
      price: "$89.99"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      title: "The Complete 2024 Web Development Bootcamp",
      category: "Development",
      rating: 4.9,
      students: 8765,
      duration: "24 weeks",
      price: "$149.99"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1237&q=80",
      title: "Photography Masterclass: A Complete Guide to Photography",
      category: "Photography",
      rating: 4.7,
      students: 2143,
      duration: "8 weeks",
      price: "$69.99"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      title: "Business Management & Leadership Skills for 2024",
      category: "Business",
      rating: 4.6,
      students: 4532,
      duration: "10 weeks",
      price: "$99.99"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      title: "Advanced Data Science and Machine Learning Bootcamp",
      category: "Data Science",
      rating: 4.9,
      students: 3876,
      duration: "16 weeks",
      price: "$199.99"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      title: "Public Speaking and Communication Skills Masterclass",
      category: "Communication",
      rating: 4.7,
      students: 5243,
      duration: "6 weeks",
      price: "$79.99"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark">Popular Courses</h2>
          <a href="#" className="text-orange-DEFAULT hover:text-orange-dark font-medium">View All</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              category={course.category}
              rating={course.rating}
              students={course.students}
              duration={course.duration}
              price={course.price}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button className="bg-orange-DEFAULT hover:bg-orange-dark">
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
