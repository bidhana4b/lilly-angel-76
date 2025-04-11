import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CourseCard from './CourseCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
const PopularCourses = () => {
  const [activePage, setActivePage] = useState(1);
  const coursesData = [{
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "Business Management & Leadership Skills for 2024",
    category: "Business",
    rating: 4.6,
    students: 4532,
    instructorName: "Kafi",
    price: "99.99",
    duration: "10 weeks",
    isFeatured: true
  }, {
    id: 2,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "B1 ENGLISH TEST INTEGRATED SKILLS (ISE I)",
    category: "English",
    rating: 4.8,
    students: 978,
    instructorName: "Sarah Johnson",
    price: "89.99",
    duration: "8 weeks"
  }, {
    id: 3,
    image: "https://images.unsplash.com/photo-1540563341684-995b61dbb925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "A1 SELT | GESE GRADE 2 | ENGLISH TEST FOR FAMILY",
    category: "English",
    rating: 4.7,
    students: 821,
    instructorName: "John Smith",
    price: "79.99",
    duration: "6 weeks"
  }, {
    id: 4,
    image: "https://images.unsplash.com/photo-1519677751400-f2aa896a161e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "LIFE IN THE UK PREPARATION COURSE",
    category: "British Culture",
    rating: 4.9,
    students: 1120,
    instructorName: "Emily Wilson",
    price: "129.99",
    duration: "12 weeks"
  }, {
    id: 5,
    image: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "A1, A2, B1 ENGLISH LANGUAGE PREPARATION COURSES",
    category: "English",
    rating: 4.5,
    reviewCount: 156,
    students: 2340,
    instructorName: "David Thompson",
    price: "109.99",
    duration: "15 weeks",
    isFeatured: true
  }, {
    id: 6,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "FUNCTIONAL SKILLS IN ENGLISH AND MATH",
    category: "Skills",
    rating: 4.7,
    students: 1587,
    instructorName: "Michael Brown",
    price: "119.99",
    duration: "9 weeks"
  }];

  // Courses per page
  const pageSize = 3;
  const totalPages = Math.ceil(coursesData.length / pageSize);

  // Get current page courses
  const getCurrentPageCourses = () => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return coursesData.slice(startIndex, endIndex);
  };
  return <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark relative">
            <span className="relative z-10">Popular Courses</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-DEFAULT/20 -z-10 transform -rotate-1"></span>
          </h2>
          <Button variant="outline" className="text-orange-DEFAULT border-orange-DEFAULT hover:bg-orange-DEFAULT hover:text-white group">
            VIEW ALL
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {getCurrentPageCourses().map(course => <CourseCard key={course.id} image={course.image} title={course.title} category={course.category} rating={course.rating} students={course.students} instructorName={course.instructorName} isFeatured={course.isFeatured} reviewCount={course.reviewCount} price={course.price} duration={course.duration} />)}
        </div>
        
        <Pagination className="mt-10">
          <PaginationContent>
            {Array.from({
            length: totalPages
          }).map((_, i) => <PaginationItem key={i}>
                <PaginationLink className={activePage === i + 1 ? "bg-primary text-white" : ""} onClick={() => setActivePage(i + 1)} isActive={activePage === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>)}
          </PaginationContent>
        </Pagination>

        
      </div>
    </section>;
};
export default PopularCourses;