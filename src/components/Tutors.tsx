
import React from 'react';
import { Star } from 'lucide-react';

interface TutorProps {
  image: string;
  name: string;
  specialty: string;
  rating: number;
  courses: number;
}

const TutorCard: React.FC<TutorProps> = ({ image, name, specialty, rating, courses }) => {
  return (
    <div className="text-center card-hover">
      <div className="relative w-40 h-40 mx-auto mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>
      <h3 className="text-xl font-semibold text-navy-dark">{name}</h3>
      <p className="text-gray-600 mb-2">{specialty}</p>
      <div className="flex justify-center items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        <span className="text-gray-700">{rating}</span>
        <span className="mx-2 text-gray-400">|</span>
        <span className="text-gray-700">{courses} courses</span>
      </div>
    </div>
  );
};

const Tutors = () => {
  const tutors = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80",
      name: "Amelia Smith",
      specialty: "UX/UI Design",
      rating: 4.9,
      courses: 15
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      name: "Edgar Williams",
      specialty: "Data Science",
      rating: 4.8,
      courses: 12
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      name: "Eliza Hart",
      specialty: "Marketing",
      rating: 4.9,
      courses: 18
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Experienced Tutors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from industry experts who are passionate about teaching and committed to your success in your educational journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutors.map(tutor => (
            <TutorCard
              key={tutor.id}
              image={tutor.image}
              name={tutor.name}
              specialty={tutor.specialty}
              rating={tutor.rating}
              courses={tutor.courses}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutors;
