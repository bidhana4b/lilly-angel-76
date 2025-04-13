
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Founder & CEO',
      bio: 'With over 20 years of experience in education and training, Dr. Johnson founded Lilly-Angel with a vision to make quality training accessible to all.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Michael Chen',
      position: 'Chief Academic Officer',
      bio: 'Michael oversees our curriculum development and ensures all courses meet the highest standards of educational excellence.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Amara Okafor',
      position: 'Head of Training',
      bio: 'Amara leads our instructor training programs and is dedicated to creating engaging, practical learning experiences.',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'David Wilson',
      position: 'Chief Technology Officer',
      bio: 'David is responsible for developing and maintaining our digital learning platforms and technology infrastructure.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our training programs and services.'
    },
    {
      title: 'Accessibility',
      description: 'We believe quality education should be accessible to everyone, regardless of background or circumstances.'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate our teaching methods and curriculum to meet evolving industry needs.'
    },
    {
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and the highest ethical standards.'
    }
  ];

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
              About Lilly-Angel
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Empowering individuals and organizations through quality education and training
            </motion.p>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Lilly-Angel was founded in 2010 with a simple mission: to provide accessible, high-quality training that empowers individuals and organizations to reach their full potential.
                </p>
                <p className="text-gray-600 mb-6">
                  What began as a small training center has grown into a leading education provider, offering a comprehensive range of courses across multiple disciplines. Throughout our journey, we've remained committed to our core values of excellence, integrity, innovation, and student success.
                </p>
                <p className="text-gray-600">
                  Today, we're proud to have helped thousands of students gain valuable skills, certifications, and knowledge that have advanced their careers and improved their lives.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="Lilly-Angel Team" 
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Mission & Vision
              </motion.h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-navy-dark mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide accessible, industry-relevant training and education that empowers individuals to achieve their career goals and helps organizations build capable, confident teams.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-navy-dark mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading provider of professional training worldwide, recognized for our excellence, innovation, and positive impact on individuals, organizations, and communities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Values
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                These core principles guide everything we do
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-navy-dark mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Meet Our Leadership Team
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                The passionate professionals behind Lilly-Angel
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-navy-dark">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/about/team">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Full Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
