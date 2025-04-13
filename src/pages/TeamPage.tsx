
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const TeamPage = () => {
  const executiveTeam = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Founder & CEO',
      bio: 'With over 20 years of experience in education and training, Dr. Johnson founded Lilly-Angel with a vision to make quality training accessible to all.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      name: 'Michael Chen',
      position: 'Chief Academic Officer',
      bio: 'Michael oversees our curriculum development and ensures all courses meet the highest standards of educational excellence.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    }
  ];

  const departmentHeads = [
    {
      name: 'Amara Okafor',
      position: 'Head of Training',
      bio: 'Amara leads our instructor training programs and is dedicated to creating engaging, practical learning experiences.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Wilson',
      position: 'Chief Technology Officer',
      bio: 'David is responsible for developing and maintaining our digital learning platforms and technology infrastructure.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Jennifer Lopez',
      position: 'Director of Operations',
      bio: 'Jennifer ensures the smooth running of all operational aspects of our training centers and online programs.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Robert Kim',
      position: 'Finance Director',
      bio: 'Robert oversees our financial planning and ensures we maintain a sustainable business model while offering accessible education.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#'
      }
    }
  ];

  const instructors = [
    {
      name: 'Emma Thompson',
      position: 'Lead Health & Safety Instructor',
      bio: 'Emma specializes in health and safety training with over 15 years of industry experience.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#'
      }
    },
    {
      name: 'James Rodriguez',
      position: 'Security Training Specialist',
      bio: 'Former security professional with expertise in training security personnel for various industries.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#'
      }
    },
    {
      name: 'Lisa Chen',
      position: 'First Aid Instructor',
      bio: 'Certified paramedic who brings real-world emergency response experience to her first aid courses.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#'
      }
    },
    {
      name: 'Mark Davies',
      position: 'Hospitality Training Lead',
      bio: 'Former hotel manager with extensive experience in all aspects of hospitality management and service.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      social: {
        linkedin: '#'
      }
    }
  ];

  // Helper function to render team members
  const renderTeamMembers = (members) => {
    return members.map((member, index) => (
      <motion.div 
        key={index}
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-lg font-semibold text-navy-dark">{member.name}</h3>
          <p className="text-blue-600 mb-3">{member.position}</p>
          <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
          
          <div className="flex space-x-3">
            {member.social.linkedin && (
              <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {member.social.twitter && (
              <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {member.social.facebook && (
              <a href={member.social.facebook} className="text-gray-400 hover:text-blue-800 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-navy-dark mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Team
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Meet the dedicated professionals who make Lilly-Angel a leading training provider
            </motion.p>
          </div>
        </section>
        
        {/* Executive Team Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <motion.h2 
              className="text-2xl font-bold text-navy-dark mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Executive Leadership
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {renderTeamMembers(executiveTeam)}
            </div>
          </div>
        </section>
        
        {/* Department Heads Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <motion.h2 
              className="text-2xl font-bold text-navy-dark mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Department Heads
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {renderTeamMembers(departmentHeads)}
            </div>
          </div>
        </section>
        
        {/* Lead Instructors Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <motion.h2 
              className="text-2xl font-bold text-navy-dark mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Lead Instructors
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {renderTeamMembers(instructors)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
