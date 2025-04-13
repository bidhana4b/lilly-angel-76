
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import ContactForm from '@/components/Contact';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const locations = [
    {
      name: 'Headquarters',
      address: '123 Education Avenue, Learning City, LC1 2AB',
      phone: '+44 1234 567890',
      email: 'info@lilly-angel.com',
      hours: 'Monday - Friday: 9am - 5pm'
    },
    {
      name: 'Training Center',
      address: '456 Training Street, Knowledge Town, KT3 4CD',
      phone: '+44 9876 543210',
      email: 'training@lilly-angel.com',
      hours: 'Monday - Saturday: 8am - 6pm'
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
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We're here to answer any questions you have about our courses, training programs, or services
            </motion.p>
          </div>
        </section>
        
        {/* Locations Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <motion.h2 
              className="text-2xl font-bold text-navy-dark mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Locations
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="h-64 bg-gray-300">
                    <iframe 
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4915.804194433983!2d-0.1250069332011502!3d51.50707335402645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c627!2sTrafalgar Square!5e0!3m2!1sen!2suk!4v1587123456789!5m2!1sen!2suk`} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      title={`Map - ${location.name}`}
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-navy-dark mb-4">{location.name}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{location.address}</span>
                      </li>
                      <li className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{location.phone}</span>
                      </li>
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{location.email}</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{location.hours}</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
