
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Leaf, Globe, HandHeart, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialResponsibility = () => {
  const initiatives = [
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: "Environmental Sustainability",
      description: "Our commitment to reducing our carbon footprint through digital learning resources, energy-efficient facilities, and sustainable practices."
    },
    {
      icon: <HandHeart className="h-10 w-10 text-red-600" />,
      title: "Community Education",
      description: "Free training workshops and educational resources provided to underserved communities to promote skill development and employability."
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-600" />,
      title: "Global Partnerships",
      description: "Collaborations with international organizations to extend educational opportunities to developing regions worldwide."
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Diversity & Inclusion",
      description: "Creating an inclusive learning environment that celebrates diversity and ensures equal opportunities for all students and staff."
    }
  ];
  
  const impacts = [
    {
      metric: "5,000+",
      description: "Free training sessions provided to communities in need"
    },
    {
      metric: "£250,000+",
      description: "Donated to educational charities"
    },
    {
      metric: "30%",
      description: "Reduction in carbon emissions since 2020"
    },
    {
      metric: "15+",
      description: "Community partnerships established"
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
              Our Social Responsibility
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              At Lilly-Angel, we believe education is a powerful tool for creating positive change. Our commitment to social responsibility extends beyond the classroom to make a meaningful impact on communities and the environment.
            </motion.p>
          </div>
        </section>
        
        {/* Our Approach Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">Our Approach to Social Responsibility</h2>
                <p className="text-gray-600 mb-6">
                  We recognize that as an educational institution, we have a unique opportunity and responsibility to create positive change. Our approach to social responsibility is integrated into all aspects of our operations, from how we design our courses to how we engage with our communities.
                </p>
                <p className="text-gray-600 mb-6">
                  We focus on initiatives that leverage our core expertise in education and training, creating programs that empower individuals, support communities, and promote sustainable practices both within our organization and beyond.
                </p>
                <p className="text-gray-600">
                  Through strategic partnerships with nonprofits, community organizations, and businesses, we multiply our impact and address pressing social and environmental challenges.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Community outreach" 
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Key Initiatives Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Our Key Initiatives</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We focus on these core areas to maximize our positive impact on society and the environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {initiatives.map((initiative, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 flex-shrink-0">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-dark mb-2">{initiative.title}</h3>
                    <p className="text-gray-600">{initiative.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Impact Metrics */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Measuring the difference we're making through our social responsibility initiatives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {impacts.map((impact, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold mb-2">{impact.metric}</div>
                  <p className="text-blue-100">{impact.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Partners Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Our Community Partners</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We collaborate with these organizations to extend our reach and multiply our impact.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div 
                  key={item}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: item * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Building2 className="h-12 w-12 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Study Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Training workshop" 
                  className="rounded-lg shadow-lg"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">Case Study: Skills for Tomorrow Program</h2>
                <p className="text-gray-600 mb-4">
                  Our Skills for Tomorrow initiative provides free vocational training to unemployed young adults in underserved communities, equipping them with practical skills for the modern workforce.
                </p>
                <p className="text-gray-600 mb-4">
                  Since launching in 2018, the program has:
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <div className="bg-green-500 rounded-full h-2 w-2 mr-2"></div>
                    Trained over 1,200 participants
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-500 rounded-full h-2 w-2 mr-2"></div>
                    Achieved an 83% employment rate for graduates
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-500 rounded-full h-2 w-2 mr-2"></div>
                    Expanded to 5 locations across the UK
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Learn More About This Initiative
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-navy-dark text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Us In Making A Difference</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Whether you're a student, business, or community organization, there are many ways to participate in our social responsibility initiatives.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" className="bg-white text-navy-dark hover:bg-gray-100">
                Partner With Us
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Volunteer Opportunities
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialResponsibility;
