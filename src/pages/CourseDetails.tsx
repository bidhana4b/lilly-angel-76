
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, Calendar, BookOpen, CheckCircle, DownloadCloud, Play } from 'lucide-react';

// Import mock course data - in a real app, this would come from an API
const coursesData = [{
  id: "business-management",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "Business Management & Leadership Skills for 2024",
  category: "Business",
  rating: 4.6,
  students: 4532,
  instructorName: "Kafi",
  instructorTitle: "Business Management Expert",
  instructorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "Kafi has over 15 years of experience in business leadership and management training. He specializes in helping professionals develop the skills needed to excel in today's competitive business environment.",
  price: "99.99",
  duration: "10 weeks",
  isFeatured: true,
  lessons: 24,
  description: "Develop essential leadership and management skills needed to succeed in today's competitive business environment. This comprehensive course covers strategic planning, team management, effective communication, and more.",
  objectives: [
    "Understand key management principles and their practical applications",
    "Develop effective leadership styles and approaches",
    "Master strategic planning and execution techniques",
    "Build high-performing teams and manage workplace conflicts",
    "Enhance business communication and negotiation skills"
  ],
  requirements: [
    "Basic understanding of business concepts",
    "Willingness to participate in practical exercises",
    "Access to a computer with internet connection",
    "Recommended: Some prior experience in a workplace setting"
  ],
  curriculum: [
    {
      title: "Foundations of Business Management",
      lessons: [
        "Introduction to Management Principles",
        "The Evolution of Management Theories",
        "Understanding Organizational Structures"
      ]
    },
    {
      title: "Strategic Leadership",
      lessons: [
        "Defining Leadership vs. Management",
        "Leadership Styles and Their Impact",
        "Developing Your Personal Leadership Brand"
      ]
    },
    {
      title: "Team Building and Management",
      lessons: [
        "Creating High-Performing Teams",
        "Managing Team Dynamics and Conflicts",
        "Delegating Effectively for Team Growth"
      ]
    },
    {
      title: "Business Communication",
      lessons: [
        "Effective Business Communication Strategies",
        "Negotiation and Persuasion Techniques",
        "Public Speaking and Presentation Skills"
      ]
    },
    {
      title: "Strategic Planning and Execution",
      lessons: [
        "Business Strategy Development",
        "Setting and Achieving Organizational Goals",
        "Change Management and Implementation"
      ]
    }
  ],
  reviews: [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "March 15, 2024",
      comment: "This course transformed my approach to management. The practical exercises were particularly valuable in helping me apply what I learned to real-world situations."
    },
    {
      name: "John Smith",
      rating: 4,
      date: "February 22, 2024",
      comment: "Very comprehensive coverage of management topics. The instructor was knowledgeable and engaging. Would have liked more case studies, but overall excellent."
    },
    {
      name: "Emily Wong",
      rating: 5,
      date: "January 7, 2024",
      comment: "As someone new to leadership positions, this course gave me the confidence and tools I needed to excel. The section on team management was especially helpful."
    }
  ],
  materials: [
    "Business Management Handbook (PDF)",
    "Leadership Assessment Tools (Excel)",
    "Team Building Exercise Guide (PDF)",
    "Strategic Planning Templates (Word)",
    "Communication Skills Cheat Sheet (PDF)"
  ]
}, {
  id: "english-test-b1",
  image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "B1 ENGLISH TEST INTEGRATED SKILLS (ISE I)",
  category: "English",
  rating: 4.8,
  students: 978,
  instructorName: "Sarah Johnson",
  instructorTitle: "TEFL Certified English Instructor",
  instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "Sarah Johnson has been teaching English for over 10 years. She specializes in preparing students for English proficiency exams and holds a master's degree in TESOL.",
  price: "89.99",
  duration: "8 weeks",
  lessons: 20,
  description: "Comprehensive preparation for the B1 English Test (ISE I) covering all four language skills: reading, writing, listening, and speaking. This course is designed to help you achieve success in your B1 English examination.",
  objectives: [
    "Master B1 level reading comprehension strategies",
    "Develop clear and coherent writing skills for the exam",
    "Enhance listening abilities for understanding spoken English",
    "Build confidence and fluency in speaking tasks",
    "Practice with authentic exam materials and formats"
  ],
  requirements: [
    "A2 level English proficiency",
    "Dedication to regular study and practice",
    "Access to a computer with internet connection",
    "Headphones or speakers for listening exercises"
  ],
  curriculum: [
    {
      title: "Reading Skills Development",
      lessons: [
        "Understanding B1 Reading Tasks",
        "Skimming and Scanning Techniques",
        "Interpreting and Analyzing Texts"
      ]
    },
    {
      title: "Writing Skills Enhancement",
      lessons: [
        "Writing Correspondence at B1 Level",
        "Constructing Short Essays and Reports",
        "Grammar and Vocabulary for Writing"
      ]
    },
    {
      title: "Listening Comprehension",
      lessons: [
        "Identifying Main Ideas in Spoken English",
        "Understanding Details and Specific Information",
        "Note-taking During Listening Tasks"
      ]
    },
    {
      title: "Speaking Practice",
      lessons: [
        "Topic Development for the Conversation Task",
        "Expressing Opinions and Preferences",
        "Interactive Communication Strategies"
      ]
    },
    {
      title: "Exam Strategies and Practice",
      lessons: [
        "Understanding the ISE I Exam Format",
        "Time Management Techniques",
        "Full Practice Tests and Feedback"
      ]
    }
  ],
  reviews: [
    {
      name: "Miguel Rodriguez",
      rating: 5,
      date: "April 3, 2024",
      comment: "Excellent course! I passed my B1 exam with confidence. The speaking practice was especially helpful."
    },
    {
      name: "Anna Kowalski",
      rating: 4,
      date: "March 19, 2024",
      comment: "Very well-structured lessons. The practice tests were almost identical to the actual exam, which really helped me prepare properly."
    },
    {
      name: "Takashi Yamamoto",
      rating: 5,
      date: "February 12, 2024",
      comment: "The instructor explains everything clearly and the course materials are very comprehensive. I improved my English significantly."
    }
  ],
  materials: [
    "B1 Vocabulary List (PDF)",
    "Grammar Reference Guide (PDF)",
    "Writing Templates and Examples (PDF)",
    "Audio Files for Listening Practice (MP3)",
    "ISE I Practice Tests (PDF)"
  ]
}, {
  id: "gese-grade-2",
  image: "https://images.unsplash.com/photo-1540563341684-995b61dbb925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "A1 SELT | GESE GRADE 2 | ENGLISH TEST FOR FAMILY",
  category: "English",
  rating: 4.7,
  students: 821,
  instructorName: "John Smith",
  instructorTitle: "SELT Preparation Expert",
  instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "John Smith specializes in preparing candidates for SELT exams. With 8 years of dedicated experience in this field, he has helped hundreds of students successfully pass their A1 GESE exam for family visas.",
  price: "79.99",
  duration: "6 weeks",
  lessons: 15,
  description: "Specialized preparation for the A1 SELT GESE Grade 2 English test required for UK family visa applications. This focused course will prepare you for all aspects of the speaking and listening examination.",
  objectives: [
    "Understand the GESE Grade 2 exam format and requirements",
    "Develop the necessary speaking skills for the A1 level test",
    "Build essential vocabulary for family visa interview topics",
    "Practice answering common examiner questions with confidence",
    "Master strategies for success in the examination"
  ],
  requirements: [
    "Basic understanding of English alphabet and simple words",
    "Commitment to regular practice sessions",
    "Access to a computer with internet connection and microphone",
    "Willingness to participate in role-play exercises"
  ],
  curriculum: [
    {
      title: "Introduction to GESE Grade 2",
      lessons: [
        "Understanding the Exam Structure",
        "Assessment Criteria and Scoring",
        "Building Confidence for the Test"
      ]
    },
    {
      title: "Core Vocabulary Development",
      lessons: [
        "Family and Personal Information",
        "Daily Routines and Activities",
        "Simple Descriptions of People and Places"
      ]
    },
    {
      title: "Conversation Practice",
      lessons: [
        "Answering Basic Questions",
        "Asking Simple Questions",
        "Turn-taking in Conversation"
      ]
    },
    {
      title: "Topic Preparation",
      lessons: [
        "Preparing Your Topic Discussion",
        "Using Visual Materials Effectively",
        "Responding to Questions About Your Topic"
      ]
    },
    {
      title: "Mock Exams and Feedback",
      lessons: [
        "Full Practice Test Simulations",
        "Personalized Feedback on Performance",
        "Final Preparation Strategies"
      ]
    }
  ],
  reviews: [
    {
      name: "Fatima Al-Hassan",
      rating: 5,
      date: "March 28, 2024",
      comment: "I passed my GESE Grade 2 exam on the first try! This course prepared me perfectly for what to expect in the real test."
    },
    {
      name: "Raj Patel",
      rating: 4,
      date: "February 5, 2024",
      comment: "The mock exams were extremely helpful. The instructor gave detailed feedback that helped me improve my weak areas."
    },
    {
      name: "Maria Sanchez",
      rating: 5,
      date: "January 17, 2024",
      comment: "Very practical course focused exactly on what's needed for the visa application. The vocabulary sections were especially valuable."
    }
  ],
  materials: [
    "A1 GESE Grade 2 Vocabulary Guide (PDF)",
    "Conversation Practice Flashcards (PDF)",
    "Topic Preparation Worksheet (PDF)",
    "Sample Conversations Audio (MP3)",
    "Visual Materials Template (PDF)"
  ]
}, {
  id: "life-in-the-uk",
  image: "https://images.unsplash.com/photo-1519677751400-f2aa896a161e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "LIFE IN THE UK PREPARATION COURSE",
  category: "British Culture",
  rating: 4.9,
  students: 1120,
  instructorName: "Emily Wilson",
  instructorTitle: "British Citizenship Expert",
  instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "Emily Wilson is a specialist in UK immigration and citizenship requirements. She has helped over 1,000 students successfully pass their Life in the UK test and has authored several study guides on the subject.",
  price: "129.99",
  duration: "12 weeks",
  lessons: 30,
  description: "Comprehensive preparation for the Life in the UK test required for settlement or citizenship applications. This course covers all the essential historical, cultural, and practical knowledge needed to pass the test with confidence.",
  objectives: [
    "Master all topics covered in the official Life in the UK handbook",
    "Understand key moments in British history and their significance",
    "Learn about British culture, traditions, and values",
    "Familiarize yourself with UK laws, government, and public services",
    "Practice with authentic test questions and mock exams"
  ],
  requirements: [
    "English language ability at B1 level or higher",
    "Access to a computer with internet connection",
    "Recommended: Official Life in the UK handbook (but not required)",
    "Time commitment of at least 4-5 hours per week"
  ],
  curriculum: [
    {
      title: "The Values and Principles of the UK",
      lessons: [
        "British Democracy and the Rule of Law",
        "Freedom and Tolerance in British Society",
        "Responsibilities and Privileges of UK Residents"
      ]
    },
    {
      title: "UK History Essentials",
      lessons: [
        "Early Britain and the Middle Ages",
        "The Tudors and Stuarts",
        "The Industrial Revolution and Empire",
        "Britain in the 20th Century",
        "Recent UK History and Brexit"
      ]
    },
    {
      title: "UK Government and Politics",
      lessons: [
        "The British Constitution",
        "The UK Parliament and Elections",
        "Devolved Governments and Local Councils",
        "The Role of Citizens in Democracy"
      ]
    },
    {
      title: "Everyday Life in the UK",
      lessons: [
        "British Culture and Traditions",
        "Religion and Multiculturalism",
        "Sports, Arts, and Leisure",
        "Education, Healthcare, and Public Services"
      ]
    },
    {
      title: "Test Preparation",
      lessons: [
        "Understanding Test Format and Requirements",
        "Practice Test Sessions with Feedback",
        "Final Revision and Exam Strategies"
      ]
    }
  ],
  reviews: [
    {
      name: "Omar Al-Farsi",
      rating: 5,
      date: "April 12, 2024",
      comment: "Passed my test with 24/24! This course covers everything in great detail but also makes it easy to remember the key facts."
    },
    {
      name: "Priya Sharma",
      rating: 5,
      date: "March 30, 2024",
      comment: "The practice questions were very similar to the actual test. The historical sections were particularly well explained with helpful memory aids."
    },
    {
      name: "Carlos Mendes",
      rating: 4,
      date: "February 28, 2024",
      comment: "Very comprehensive course that goes beyond just test preparation. I gained a much deeper understanding of British culture and history."
    }
  ],
  materials: [
    "Complete Study Guide (PDF)",
    "Historical Timeline Chart (PDF)",
    "Key Dates and Facts Flashcards (PDF)",
    "Practice Test Question Bank (Interactive)",
    "UK Government Structure Guide (PDF)"
  ]
}, {
  id: "english-preparation",
  image: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "A1, A2, B1 ENGLISH LANGUAGE PREPARATION COURSES",
  category: "English",
  rating: 4.5,
  reviewCount: 156,
  students: 2340,
  instructorName: "David Thompson",
  instructorTitle: "Senior English Language Instructor",
  instructorImage: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "David Thompson has 20 years of experience teaching English to speakers of other languages. He specializes in preparing students for all levels of language proficiency exams and holds a PhD in Applied Linguistics.",
  price: "109.99",
  duration: "15 weeks",
  isFeatured: true,
  lessons: 45,
  description: "Complete English language preparation covering A1 (beginner), A2 (elementary), and B1 (intermediate) levels. This comprehensive course develops all language skills and prepares you for a range of English proficiency exams.",
  objectives: [
    "Progress from basic to intermediate English language proficiency",
    "Develop reading, writing, listening, and speaking skills systematically",
    "Build vocabulary and grammar knowledge across all three levels",
    "Prepare for a variety of English language tests and exams",
    "Gain confidence in using English for everyday and professional purposes"
  ],
  requirements: [
    "No prior knowledge required for complete beginners",
    "Regular commitment to study and practice",
    "Access to a computer with internet connection and audio capabilities",
    "Willingness to participate in language practice activities"
  ],
  curriculum: [
    {
      title: "A1 Level - Beginner",
      lessons: [
        "Introducing Yourself and Basic Conversations",
        "Essential Vocabulary and Simple Phrases",
        "Basic Grammar and Sentence Structure",
        "Simple Reading and Listening Tasks",
        "A1 Level Assessment Preparation"
      ]
    },
    {
      title: "A2 Level - Elementary",
      lessons: [
        "Everyday Situations and Extended Conversations",
        "Building Vocabulary for Common Topics",
        "Developing Grammar and Tenses",
        "Reading Short Texts and Basic Writing",
        "A2 Level Assessment Preparation"
      ]
    },
    {
      title: "B1 Level - Intermediate",
      lessons: [
        "Complex Conversations and Discussions",
        "Expanded Vocabulary for Various Contexts",
        "Advanced Grammar and Sentence Formation",
        "Longer Texts and Structured Writing Tasks",
        "B1 Level Assessment Preparation"
      ]
    },
    {
      title: "Integrated Skills Development",
      lessons: [
        "Multi-skill Practice Activities",
        "Real-world Language Applications",
        "Communication Strategies and Fluency Building"
      ]
    },
    {
      title: "Exam Preparation",
      lessons: [
        "Understanding Different Exam Formats",
        "Test-taking Strategies",
        "Full Practice Tests for Each Level"
      ]
    }
  ],
  reviews: [
    {
      name: "Hassan Al-Mahmood",
      rating: 5,
      date: "April 8, 2024",
      comment: "I started as a complete beginner and now I'm comfortable having conversations in English. The progression through the levels is very well structured."
    },
    {
      name: "Olga Petrova",
      rating: 4,
      date: "March 22, 2024",
      comment: "The course materials are excellent and the grammar explanations are very clear. I would have liked more speaking practice opportunities."
    },
    {
      name: "Liu Wei",
      rating: 5,
      date: "February 15, 2024",
      comment: "Very comprehensive coverage of all skills. I especially appreciated the detailed feedback on my writing assignments."
    }
  ],
  materials: [
    "Complete Grammar Reference Guide (PDF)",
    "Vocabulary Lists by Level and Topic (PDF)",
    "Pronunciation Audio Files (MP3)",
    "Reading and Listening Practice Materials (PDF/MP3)",
    "Writing Templates and Examples (PDF)"
  ]
}, {
  id: "functional-skills",
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  title: "FUNCTIONAL SKILLS IN ENGLISH AND MATH",
  category: "Skills",
  rating: 4.7,
  students: 1587,
  instructorName: "Michael Brown",
  instructorTitle: "Functional Skills Specialist",
  instructorImage: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  instructorBio: "Michael Brown has been teaching Functional Skills for over 12 years. He specializes in preparing adult learners for Functional Skills qualifications and has extensive experience working with students from diverse backgrounds.",
  price: "119.99",
  duration: "9 weeks",
  lessons: 27,
  description: "Comprehensive preparation for Functional Skills qualifications in both English and Mathematics. This practical course focuses on the essential skills needed for work, education, and everyday life.",
  objectives: [
    "Develop essential English skills for reading, writing, and communication",
    "Build fundamental mathematical abilities for everyday and work situations",
    "Prepare for Functional Skills examinations at Entry Level through Level 2",
    "Apply practical skills to real-world contexts and scenarios",
    "Gain confidence in using English and Math in daily situations"
  ],
  requirements: [
    "Basic literacy and numeracy abilities",
    "Regular commitment to practice and assignments",
    "Access to a computer with internet connection",
    "Calculator for math components (physical or digital)"
  ],
  curriculum: [
    {
      title: "Functional English - Reading",
      lessons: [
        "Understanding Various Text Types",
        "Extracting Information and Details",
        "Analyzing Language and Purpose"
      ]
    },
    {
      title: "Functional English - Writing",
      lessons: [
        "Formal and Informal Communication",
        "Structure and Organization",
        "Grammar, Punctuation, and Spelling"
      ]
    },
    {
      title: "Functional English - Speaking & Listening",
      lessons: [
        "Effective Communication Techniques",
        "Discussion and Presentation Skills",
        "Active Listening and Response"
      ]
    },
    {
      title: "Functional Mathematics - Number",
      lessons: [
        "Working with Whole Numbers and Fractions",
        "Percentages and Proportions",
        "Calculations in Context"
      ]
    },
    {
      title: "Functional Mathematics - Measure, Shape & Space",
      lessons: [
        "Units of Measurement and Conversion",
        "Area, Perimeter, and Volume",
        "Practical Spatial Problems"
      ]
    },
    {
      title: "Functional Mathematics - Data & Statistics",
      lessons: [
        "Interpreting Charts and Graphs",
        "Collecting and Organizing Data",
        "Probability and Statistical Analysis"
      ]
    }
  ],
  reviews: [
    {
      name: "Thomas Wilson",
      rating: 5,
      date: "April 5, 2024",
      comment: "This course helped me pass my Functional Skills exams and get into the training program I wanted. The real-life examples made the math much easier to understand."
    },
    {
      name: "Amina Hassan",
      rating: 4,
      date: "March 14, 2024",
      comment: "Very practical approach that helped me apply skills to everyday situations. The English writing section was particularly helpful for my job applications."
    },
    {
      name: "Gary Peters",
      rating: 5,
      date: "February 20, 2024",
      comment: "I struggled with math for years, but the way it's explained here finally made sense to me. Passed my Level 2 exam with confidence!"
    }
  ],
  materials: [
    "English Skills Workbook (PDF)",
    "Mathematics Formula Sheet (PDF)",
    "Practice Exam Papers (PDF)",
    "Real-world Application Guides (PDF)",
    "Calculation Methods Reference (PDF)"
  ]
}];

const CourseDetails = () => {
  // Get the course ID from the URL
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);

  // Fetch the course details based on the ID
  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const foundCourse = coursesData.find(c => c.id === courseId);
      setCourse(foundCourse || null);
      
      // Get related courses from the same category or fall back to other courses
      if (foundCourse) {
        const related = coursesData
          .filter(c => c.id !== courseId && c.category === foundCourse.category)
          .slice(0, 3);
        
        // If we don't have enough related courses in the same category, add others
        if (related.length < 3) {
          const others = coursesData
            .filter(c => c.id !== courseId && c.category !== foundCourse.category)
            .slice(0, 3 - related.length);
          setRelatedCourses([...related, ...others]);
        } else {
          setRelatedCourses(related);
        }
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-8">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6">The course you are looking for does not exist or has been removed.</p>
            <Link to="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-navy-dark to-navy-light text-white py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="text-sm mb-6 flex items-center text-gray-200">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/courses" className="hover:text-white">Courses</Link>
              <span className="mx-2">/</span>
              <span className="text-orange-300">{course.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-3 bg-orange-500">{course.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-gray-200 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-gray-300 ml-1">({course.reviewCount || course.reviews?.length || 0} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructorName}
                    className="w-10 h-10 rounded-full object-cover mr-3" 
                  />
                  <div>
                    <p className="text-sm">Created by</p>
                    <p className="font-medium">{course.instructorName}</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 cursor-pointer hover:bg-opacity-100 transition-all">
                        <Play className="h-8 w-8 text-orange-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">${course.price}</span>
                    </div>
                    
                    <Button className="w-full mb-4 bg-orange-500 hover:bg-orange-600">
                      Enroll Now
                    </Button>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Access on mobile and desktop</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{course.materials?.length || 0} downloadable resources</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Tabs */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                    <p className="text-gray-700 mb-8">{course.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                      {course.objectives?.map((objective: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-8">
                      {course.requirements?.map((requirement: string, index: number) => (
                        <li key={index} className="text-gray-700">{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum?.map((section: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">{section.title}</h3>
                        <span className="text-sm text-gray-500">{section.lessons.length} lessons</span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {section.lessons.map((lesson: string, lessonIndex: number) => (
                          <div key={lessonIndex} className="p-4 flex justify-between items-center hover:bg-gray-50">
                            <div className="flex items-center">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-3">
                                {lessonIndex + 1}
                              </span>
                              <span>{lesson}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Instructor Tab */}
              <TabsContent value="instructor" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <img 
                    src={course.instructorImage} 
                    alt={course.instructorName}
                    className="w-24 h-24 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{course.instructorName}</h3>
                    <p className="text-gray-600 mb-3">{course.instructorTitle}</p>
                    <p className="text-gray-700">{course.instructorBio}</p>
                  </div>
                </div>
              </TabsContent>
              
              {/* Resources Tab */}
              <TabsContent value="resources" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">Course Resources</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Downloadable Materials</h3>
                  <div className="space-y-3">
                    {course.materials?.map((material: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <DownloadCloud className="h-5 w-5 text-blue-500 mr-2" />
                          <span>{material}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="text-5xl font-bold text-navy-dark mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{course.reviewCount || course.reviews?.length || 0} reviews</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="space-y-6">
                      {course.reviews?.map((review: any, index: number) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{review.name}</h3>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related Courses */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <CourseCard
                  key={relatedCourse.id}
                  id={relatedCourse.id}
                  image={relatedCourse.image}
                  title={relatedCourse.title}
                  category={relatedCourse.category}
                  rating={relatedCourse.rating}
                  students={relatedCourse.students}
                  instructorName={relatedCourse.instructorName}
                  price={relatedCourse.price}
                  duration={relatedCourse.duration}
                  isFeatured={relatedCourse.isFeatured}
                  reviewCount={relatedCourse.reviewCount}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
