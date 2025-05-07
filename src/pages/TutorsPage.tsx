
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeacherProps {
  name: string;
  designation: string;
  photo: string;
  expertise: string;
  email: string;
  phone: string;
}

interface DepartmentProps {
  name: string;
  teachers: TeacherProps[];
}

const TeacherCard: React.FC<TeacherProps> = ({ 
  name, 
  designation, 
  photo, 
  expertise, 
  email, 
  phone 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 
                    hover:-translate-y-2 hover:shadow-xl border border-gray-100">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-16 w-16 rounded-full border-2 border-blue-100 mr-4">
              <AvatarImage src={photo} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-navy-dark">{name}</h3>
              <p className="text-sm text-gray-600">{designation}</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 text-sm line-clamp-3">{expertise}</p>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                <Mail className="h-4 w-4 mr-1" />
                <span className="truncate">{email}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">
              <p className="text-sm">{email}</p>
            </HoverCardContent>
          </HoverCard>
          
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <Phone className="h-4 w-4 mr-1" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Department: React.FC<DepartmentProps> = ({ name, teachers }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold relative inline-block">
            {name}
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-orange-500"></span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={index}
              name={teacher.name}
              designation={teacher.designation}
              photo={teacher.photo}
              expertise={teacher.expertise}
              email={teacher.email}
              phone={teacher.phone}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TutorsPage: React.FC = () => {
  const departments: DepartmentProps[] = [
    {
      name: "Computer Science",
      teachers: [
        {
          name: "Dr. James Wilson",
          designation: "Professor",
          photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          expertise: "Dr. Wilson specializes in artificial intelligence and machine learning, with over 15 years of academic and industry experience. His research focuses on neural networks and deep learning applications.",
          email: "james.wilson@lillyangel.edu",
          phone: "+44 20 1234 5678"
        },
        {
          name: "Sarah Johnson",
          designation: "Associate Professor",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
          expertise: "Sarah specializes in cybersecurity and cryptography, leading several research projects on secure information systems. She is a certified ethical hacker and security consultant.",
          email: "sarah.johnson@lillyangel.edu",
          phone: "+44 20 1234 5679"
        },
        {
          name: "Michael Chen",
          designation: "Lecturer",
          photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
          expertise: "Michael teaches web development and software engineering. With a background in Silicon Valley startups, he brings practical industry knowledge to the classroom.",
          email: "michael.chen@lillyangel.edu",
          phone: "+44 20 1234 5680"
        }
      ]
    },
    {
      name: "Health and Safety",
      teachers: [
        {
          name: "Dr. Emily Rodriguez",
          designation: "Department Head",
          photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
          expertise: "Dr. Rodriguez leads our Health and Safety department with expertise in occupational health and workplace safety protocols. She has consulted for the NHS and major corporations.",
          email: "emily.rodriguez@lillyangel.edu",
          phone: "+44 20 1234 5681"
        },
        {
          name: "Robert Thompson",
          designation: "Senior Instructor",
          photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          expertise: "Robert is a certified safety professional with extensive field experience in industrial settings. He specializes in emergency response training and risk assessment.",
          email: "robert.thompson@lillyangel.edu",
          phone: "+44 20 1234 5682"
        },
        {
          name: "Kasia Novak",
          designation: "Lecturer",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
          expertise: "Kasia specializes in first aid training and health protocols. She previously worked with the Red Cross and brings practical emergency medical knowledge to her courses.",
          email: "kasia.novak@lillyangel.edu",
          phone: "+44 20 1234 5683"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-navy-dark mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Tutors
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team of experienced professionals is dedicated to providing high-quality education
              and mentorship to help you achieve your educational and career goals.
            </motion.p>
          </div>
        </section>
        
        {/* Departments */}
        {departments.map((dept, index) => (
          <Department key={index} name={dept.name} teachers={dept.teachers} />
        ))}
      </main>
      
      <Footer />
    </div>
  );
};

export default TutorsPage;
