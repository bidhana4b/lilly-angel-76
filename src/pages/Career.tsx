import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Users, Clock, Building, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
const Career = () => {
  const careers = [{
    id: 1,
    title: "Instructor - First Aid",
    department: "Training",
    location: "London",
    type: "Full-time",
    description: "We're looking for an experienced First Aid instructor to join our team. You'll be responsible for delivering high-quality first aid training to various groups and organizations."
  }, {
    id: 2,
    title: "Security Training Specialist",
    department: "Training",
    location: "Manchester",
    type: "Full-time",
    description: "Join our security training team to develop and deliver specialized security training programs for corporate clients and individual professionals."
  }, {
    id: 3,
    title: "Health & Safety Consultant",
    department: "Consulting",
    location: "Birmingham",
    type: "Part-time",
    description: "Work with our clients to assess workplace safety, develop improvement plans, and ensure compliance with health and safety regulations."
  }, {
    id: 4,
    title: "Administrative Assistant",
    department: "Administration",
    location: "London",
    type: "Full-time",
    description: "Support our growing team with administrative tasks, schedule management, and client coordination for our busy training center."
  }];
  const benefits = [{
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    title: "Professional Development",
    description: "Continuous learning opportunities and career growth paths"
  }, {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "Flexible Working",
    description: "Work-life balance with flexible scheduling options"
  }, {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Collaborative Culture",
    description: "Supportive team environment focused on innovation"
  }, {
    icon: <BadgeCheck className="h-8 w-8 text-blue-600" />,
    title: "Industry Recognition",
    description: "Work with a leading name in professional training"
  }, {
    icon: <Building className="h-8 w-8 text-blue-600" />,
    title: "Modern Facilities",
    description: "State-of-the-art training centers and equipment"
  }, {
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    title: "Competitive Package",
    description: "Attractive salary and comprehensive benefits"
  }];
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto text-center">
            <motion.h1 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              Join Our Team
            </motion.h1>
            <motion.p className="text-gray-600 max-w-2xl mx-auto mb-8" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              Discover rewarding career opportunities with Lilly-Angel and be part of our mission to deliver exceptional training and education.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Current Openings
              </Button>
            </motion.div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Why Join Lilly-Angel?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We value our team members and offer a supportive environment where you can grow professionally while making a meaningful impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => <motion.div key={index} className="bg-white p-6 rounded-lg shadow-md" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }} viewport={{
              once: true
            }}>
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-navy-dark mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        {/* Current Openings Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Current Openings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our available positions and find the perfect fit for your skills and aspirations.
              </p>
            </div>
            
            <div className="space-y-6">
              {careers.map((job, index) => <motion.div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }} viewport={{
              once: true
            }}>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-navy-dark">{job.title}</h3>
                        <p className="text-gray-600">{job.department}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mr-2">{job.location}</span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">{job.type}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">View Details</Button>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        {/* Application Process Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} viewport={{
              once: true
            }}>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-6">Our Application Process</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-dark mb-2">Online Application</h3>
                      <p className="text-gray-600">Submit your CV and cover letter through our online portal.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-dark mb-2">Initial Screening</h3>
                      <p className="text-gray-600">Our hiring team reviews applications and conducts phone interviews.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-dark mb-2">In-Person Interview</h3>
                      <p className="text-gray-600">Meet with the team and showcase your skills through relevant exercises.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-dark mb-2">Offer & Onboarding</h3>
                      <p className="text-gray-600">Successful candidates receive an offer and comprehensive onboarding.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.5
            }} viewport={{
              once: true
            }} className="hidden md:block">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="rounded-lg shadow-lg" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        
      </main>
      <Footer />
    </div>;
};
export default Career;