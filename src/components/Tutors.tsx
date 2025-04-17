
import React from 'react';
import { Star, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

interface TutorProps {
  image: string;
  name: string;
  specialty: string;
  rating?: number;
  courses?: number;
  bgColor: string;
  socialLinks?: boolean;
}

const TutorCard: React.FC<TutorProps> = ({
  image,
  name,
  specialty,
  rating,
  courses,
  bgColor,
  socialLinks = true
}) => {
  return (
    <motion.div 
      className="relative group" 
      initial={{
        opacity: 0,
        y: 20
      }} 
      whileInView={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.5
      }} 
      viewport={{
        once: true
      }}
    >
      <Card className={`relative rounded-xl overflow-hidden shadow-lg ${bgColor} p-5 z-10 border-t-4 border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md transform transition-transform duration-300 group-hover:scale-105">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={e => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
                }}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
            <p className="text-gray-600 text-sm mb-3 text-center">{specialty}</p>
            
            {socialLinks && (
              <div className="flex space-x-2 mb-2">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }} 
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-colors hover:bg-blue-200"
                >
                  <Facebook size={16} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }} 
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-colors hover:bg-blue-200"
                >
                  <Twitter size={16} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.1 }} 
                  className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-colors hover:bg-blue-200"
                >
                  <Linkedin size={16} />
                </motion.a>
              </div>
            )}
            
            {rating !== undefined && courses !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-700">{rating}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-700">{courses} courses</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-800 rounded-xl -z-10"></div>
    </motion.div>
  );
};

const Tutors = () => {
  const tutors = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
      name: "Rosalie Ruth",
      specialty: "Professional Film Creator | Cinematographer",
      bgColor: "bg-blue-50",
      rating: 4.9,
      courses: 15
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      name: "Mathew Anderson",
      specialty: "Innovative Developer & Programming Expert",
      bgColor: "bg-blue-50",
      rating: 4.8,
      courses: 12
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      name: "Kasia Jarco",
      specialty: "Health & Safety Training Specialist",
      bgColor: "bg-blue-50",
      rating: 4.7,
      courses: 8
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "John Doe",
      specialty: "First Aid & Security Instructor",
      bgColor: "bg-blue-50",
      rating: 4.9,
      courses: 10
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark relative inline-block">
            <span className="relative z-10">Meet Our Expert Tutors</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-DEFAULT/20 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Learn from industry professionals with years of practical experience
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutors.map((tutor) => (
            <TutorCard 
              key={tutor.id}
              image={tutor.image}
              name={tutor.name}
              specialty={tutor.specialty}
              rating={tutor.rating}
              courses={tutor.courses}
              bgColor={tutor.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutors;
