
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Download, BookOpen, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingState } from '@/components/ui/loading-state/LoadingState';
import OptimizedImage from '@/components/ui/optimized-image';

// Mock course data - in a real app this would come from an API
const coursesData = [{
  id: "business-management",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "Business Management & Leadership Skills for 2025",
  category: "Business",
  rating: 4.6,
  students: 4532,
  instructorName: "Kafi",
  price: "99.99",
  duration: "10 weeks",
  isFeatured: true,
  description: "Master essential business management and leadership skills needed for today's fast-paced corporate environment. Learn how to lead teams effectively, manage resources, and drive organizational success.",
  objectives: [
    "Develop effective leadership strategies for modern business environments",
    "Learn key management techniques to optimize team performance",
    "Master resource allocation and budget management",
    "Understand organizational behavior and culture development",
    "Implement strategic planning and execution methodologies"
  ],
  curriculum: [
    {
      title: "Introduction to Business Management",
      lessons: [
        { title: "The Evolution of Management Theory", duration: "45 min" },
        { title: "Modern Business Challenges", duration: "50 min" },
        { title: "Management vs. Leadership", duration: "55 min" }
      ]
    },
    {
      title: "Leadership Fundamentals",
      lessons: [
        { title: "Leadership Styles and Their Impact", duration: "60 min" },
        { title: "Emotional Intelligence in Leadership", duration: "55 min" },
        { title: "Building High-Performance Teams", duration: "65 min" },
        { title: "Conflict Resolution Strategies", duration: "50 min" }
      ]
    },
    {
      title: "Strategic Planning & Execution",
      lessons: [
        { title: "Vision, Mission and Goal Setting", duration: "45 min" },
        { title: "SWOT Analysis and Competitive Positioning", duration: "65 min" },
        { title: "Implementing Change Management", duration: "60 min" }
      ]
    },
    {
      title: "Financial Management for Leaders",
      lessons: [
        { title: "Understanding Financial Statements", duration: "55 min" },
        { title: "Budget Planning and Control", duration: "50 min" },
        { title: "Investment Decision Making", duration: "60 min" }
      ]
    }
  ],
  requirements: [
    "Basic understanding of business concepts",
    "Professional work experience (1+ years recommended)",
    "Access to a computer with internet connection",
    "Willingness to participate in group activities and discussions"
  ],
  materials: [
    { name: "Leadership Assessment Toolkit", type: "PDF", size: "2.4 MB" },
    { name: "Strategic Planning Templates", type: "XLSX", size: "1.8 MB" },
    { name: "Team Performance Metrics Dashboard", type: "XLSX", size: "3.2 MB" },
    { name: "Case Studies Compilation", type: "PDF", size: "5.7 MB" }
  ],
  instructor: {
    name: "Kafi Johnson",
    title: "MBA, Business Consultant",
    bio: "With over 15 years of experience in corporate leadership and strategy consulting, Kafi has helped hundreds of businesses transform their management approach. She holds an MBA from Harvard Business School and has authored three books on modern business leadership.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  },
  reviews: [
    {
      name: "Sarah T.",
      rating: 5,
      comment: "This course completely transformed my approach to team leadership. The practical examples and exercises were incredibly valuable.",
      date: "March 15, 2024"
    },
    {
      name: "Michael R.",
      rating: 4,
      comment: "Comprehensive and well-structured content. I particularly enjoyed the strategic planning modules and the downloadable templates.",
      date: "February 28, 2024"
    },
    {
      name: "Jennifer K.",
      rating: 5,
      comment: "Kafi is an exceptional instructor who brings real-world experience to every lesson. Highly recommend for aspiring managers!",
      date: "January 5, 2024"
    }
  ]
}, {
  id: "english-test-b1",
  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "B1 ENGLISH TEST INTEGRATED SKILLS (ISE I)",
  category: "English",
  rating: 4.8,
  students: 978,
  instructorName: "Sarah Johnson",
  price: "89.99",
  duration: "8 weeks",
  description: "Prepare for the B1 English Test (ISE I) with our comprehensive course designed to develop integrated language skills. Master reading, writing, speaking and listening through practical exercises and mock exams.",
  objectives: [
    "Develop comprehensive skills in reading, writing, listening and speaking at B1 level",
    "Learn effective strategies for each section of the ISE I exam",
    "Build vocabulary and grammar knowledge appropriate for B1 level",
    "Practice with authentic exam materials and mock tests",
    "Gain confidence in English communication for everyday situations"
  ],
  curriculum: [
    {
      title: "Introduction to the B1 ISE I Exam",
      lessons: [
        { title: "Exam Format and Requirements", duration: "40 min" },
        { title: "Assessment Criteria", duration: "35 min" },
        { title: "Study Planning and Preparation Strategies", duration: "45 min" }
      ]
    },
    {
      title: "Reading & Writing Skills",
      lessons: [
        { title: "Reading for Gist and Detail", duration: "50 min" },
        { title: "Understanding Text Organization", duration: "45 min" },
        { title: "Writing Correspondence", duration: "60 min" },
        { title: "Descriptive and Discursive Writing", duration: "65 min" }
      ]
    },
    {
      title: "Speaking & Listening Development",
      lessons: [
        { title: "Topic Preparation and Presentation", duration: "55 min" },
        { title: "Conversation Skills and Interactive Tasks", duration: "60 min" },
        { title: "Listening for Specific Information", duration: "50 min" },
        { title: "Note-taking Strategies", duration: "45 min" }
      ]
    },
    {
      title: "Grammar & Vocabulary Focus",
      lessons: [
        { title: "Present, Past and Future Tenses", duration: "55 min" },
        { title: "Modal Verbs and Conditionals", duration: "50 min" },
        { title: "Topic-based Vocabulary Development", duration: "45 min" }
      ]
    },
    {
      title: "Exam Practice",
      lessons: [
        { title: "Mock Reading & Writing Exam", duration: "120 min" },
        { title: "Mock Speaking & Listening Exam", duration: "20 min" },
        { title: "Feedback and Final Preparation", duration: "60 min" }
      ]
    }
  ],
  requirements: [
    "A2 level English ability (elementary to pre-intermediate)",
    "Computer with audio and video capabilities",
    "Microphone and webcam for speaking practice",
    "Notebook and writing materials",
    "Approximately 4-6 hours per week for study"
  ],
  materials: [
    { name: "B1 Vocabulary List", type: "PDF", size: "1.2 MB" },
    { name: "Grammar Reference Guide", type: "PDF", size: "3.5 MB" },
    { name: "Practice Reading Texts", type: "PDF", size: "2.8 MB" },
    { name: "Writing Templates", type: "DOCX", size: "0.9 MB" },
    { name: "Audio Listening Exercises", type: "MP3", size: "45.3 MB" }
  ],
  instructor: {
    name: "Sarah Johnson",
    title: "CELTA, DELTA, MA TESOL",
    bio: "Sarah is a certified English language teacher with over 10 years of experience preparing students for English proficiency exams. She specializes in the ISE exams and has helped hundreds of students achieve their target scores.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
  },
  reviews: [
    {
      name: "Ahmed M.",
      rating: 5,
      comment: "Excellent preparation for the B1 exam. I passed with distinction thanks to Sarah's clear explanations and helpful feedback.",
      date: "April 2, 2024"
    },
    {
      name: "Patricia L.",
      rating: 4,
      comment: "Great course structure and very useful practice materials. The mock exams were particularly helpful.",
      date: "March 18, 2024"
    },
    {
      name: "Daniel K.",
      rating: 5,
      comment: "Sarah is a fantastic teacher who tailors her approach to address individual weaknesses. Highly recommended!",
      date: "February 22, 2024"
    }
  ]
}, {
  id: "gese-grade-2",
  image: "https://images.unsplash.com/photo-1540563341684-995b61dbb925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "A1 SELT | GESE GRADE 2 | ENGLISH TEST FOR FAMILY",
  category: "English",
  rating: 4.7,
  students: 821,
  instructorName: "John Smith",
  price: "79.99",
  duration: "6 weeks"
}, {
  id: "life-in-the-uk",
  image: "https://images.unsplash.com/photo-1519677751400-f2aa896a161e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "LIFE IN THE UK PREPARATION COURSE",
  category: "British Culture",
  rating: 4.9,
  students: 1120,
  instructorName: "Emily Wilson",
  price: "129.99",
  duration: "12 weeks"
}, {
  id: "english-preparation",
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
  id: "functional-skills",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "FUNCTIONAL SKILLS IN ENGLISH AND MATH",
  category: "Skills",
  rating: 4.7,
  students: 1587,
  instructorName: "Michael Brown",
  price: "119.99",
  duration: "9 weeks"
}];

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const course = coursesData.find(c => c.id === courseId);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto py-12">
          <LoadingState />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate average rating from reviews if they exist
  const avgRating = course.reviews 
    ? course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length 
    : course.rating;
    
  // Format currency
  const formattedPrice = parseFloat(course.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/courses">Courses</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {course.title}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        
        {/* Course Hero */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-blue-500 hover:bg-blue-600">{course.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${star <= Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-white">{avgRating.toFixed(1)}</span>
                  <span className="ml-1 text-gray-200">({course.students} students)</span>
                </div>
                
                <p className="text-lg mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    <span>Instructor: <strong>{course.instructorName}</strong></span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <span>Duration: <strong>{course.duration}</strong></span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Last updated: <strong>April 2024</strong></span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:justify-self-end w-full lg:max-w-md"
              >
                <Card className="overflow-hidden shadow-xl border-0">
                  <div className="relative">
                    <OptimizedImage
                      src={course.image}
                      alt={course.title}
                      className="w-full object-cover h-48"
                      aspectRatio="aspect-[16/9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900">{formattedPrice}</div>
                    </div>
                    
                    <Button className="w-full mb-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-12 text-lg">
                      Enroll Now
                    </Button>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Access on mobile and TV</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>30-day money-back guarantee</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                      <p className="mb-4">{course.description}</p>
                      
                      {course.objectives && (
                        <>
                          <h3 className="text-xl font-semibold mb-4 mt-8">What You'll Learn</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {course.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {course.requirements && (
                        <>
                          <h3 className="text-xl font-semibold mb-4 mt-8">Requirements</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {course.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {course.materials && (
                        <>
                          <h3 className="text-xl font-semibold mb-4 mt-8">Course Materials</h3>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <ul className="divide-y">
                              {course.materials.map((material, index) => (
                                <li key={index} className="py-3 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Download className="h-5 w-5 mr-3 text-gray-500" />
                                    <span>{material.name}</span>
                                    <Badge variant="outline" className="ml-2">{material.type}</Badge>
                                  </div>
                                  <span className="text-sm text-gray-500">{material.size}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum" className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Course Content</h3>
                    
                    {course.curriculum ? (
                      <>
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons • {course.duration}
                          </p>
                          <Button variant="link" className="p-0 h-auto text-blue-600">Expand All Sections</Button>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                          {course.curriculum.map((section, index) => (
                            <AccordionItem key={index} value={`section-${index}`} className="border border-gray-200 rounded-lg mb-3">
                              <AccordionTrigger className="px-4 hover:bg-gray-50">
                                <div className="flex justify-between items-center w-full pr-4">
                                  <div>
                                    <h4 className="font-medium text-left">{section.title}</h4>
                                    <p className="text-sm text-gray-500 text-left">{section.lessons.length} lessons</p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-0">
                                <ul className="divide-y border-t">
                                  {section.lessons.map((lesson, lessonIndex) => (
                                    <li key={lessonIndex} className="flex justify-between items-center p-4 hover:bg-gray-50">
                                      <div className="flex items-center">
                                        <BookOpen className="h-5 w-5 mr-3 text-gray-400" />
                                        <span>{lesson.title}</span>
                                      </div>
                                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </>
                    ) : (
                      <p>Curriculum information coming soon.</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="instructor">
                    {course.instructor ? (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          <img 
                            src={course.instructor.image} 
                            alt={course.instructor.name}
                            className="w-24 h-24 object-cover rounded-full"
                          />
                          <div>
                            <h3 className="text-xl font-bold mb-1">{course.instructor.name}</h3>
                            <p className="text-blue-600 mb-3">{course.instructor.title}</p>
                            <p className="text-gray-600">{course.instructor.bio}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>Instructor information coming soon.</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    {course.reviews ? (
                      <div className="space-y-6">
                        <div className="flex items-center mb-6">
                          <div className="mr-4">
                            <div className="text-5xl font-bold">{avgRating.toFixed(1)}</div>
                            <div className="flex mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-5 w-5 ${star <= Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{course.reviews.length} reviews</div>
                          </div>
                          
                          <div className="flex-grow">
                            {/* Rating distribution bars would go here */}
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {course.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-6">
                              <div className="flex items-center mb-2">
                                <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-medium mr-3">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-medium">{review.name}</h4>
                                  <div className="flex items-center">
                                    <div className="flex mr-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                          key={star} 
                                          className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                        
                        <Button variant="outline" className="mt-4">Show More Reviews</Button>
                      </div>
                    ) : (
                      <p>No reviews yet for this course.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <h3 className="text-xl font-semibold mb-4">Related Courses</h3>
                  <div className="space-y-4">
                    {coursesData
                      .filter(c => c.category === course.category && c.id !== course.id)
                      .slice(0, 3)
                      .map((relatedCourse) => (
                        <Link to={`/courses/${relatedCourse.id}`} key={relatedCourse.id}>
                          <Card className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="flex">
                              <OptimizedImage
                                src={relatedCourse.image}
                                alt={relatedCourse.title}
                                className="w-24 h-24 object-cover"
                                aspectRatio="aspect-square"
                              />
                              <CardContent className="py-3 px-4">
                                <h4 className="font-medium line-clamp-2 text-sm">{relatedCourse.title}</h4>
                                <div className="flex items-center mt-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-xs">{relatedCourse.rating}</span>
                                  <span className="text-xs text-gray-500 ml-1">({relatedCourse.students} students)</span>
                                </div>
                                <p className="text-sm font-semibold mt-1">${relatedCourse.price}</p>
                              </CardContent>
                            </div>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
