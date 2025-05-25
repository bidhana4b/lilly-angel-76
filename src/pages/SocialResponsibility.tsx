import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Leaf, Globe, HandHeart, Building2, Users, Scale, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/ui/optimized-image';

const SocialResponsibility = () => {
  const initiatives = [{
    icon: <Leaf className="h-10 w-10 text-green-600" />,
    title: "Environmental Sustainability",
    description: "Our commitment to reducing our carbon footprint through digital learning resources, energy-efficient facilities, and sustainable practices."
  }, {
    icon: <HandHeart className="h-10 w-10 text-red-600" />,
    title: "Community Education",
    description: "Free training workshops and educational resources provided to underserved communities to promote skill development and employability."
  }, {
    icon: <Globe className="h-10 w-10 text-blue-600" />,
    title: "Global Partnerships",
    description: "Collaborations with international organizations to extend educational opportunities to developing regions worldwide."
  }, {
    icon: <Users className="h-10 w-10 text-purple-600" />,
    title: "Diversity & Inclusion",
    description: "Creating an inclusive learning environment that celebrates diversity and ensures equal opportunities for all students and staff."
  }];
  const impacts = [{
    metric: "5,000+",
    description: "Free training sessions provided to communities in need"
  }, {
    metric: "£250,000+",
    description: "Donated to educational charities"
  }, {
    metric: "30%",
    description: "Reduction in carbon emissions since 2020"
  }, {
    metric: "15+",
    description: "Community partnerships established"
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
              Our Social Responsibility
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
              At Lilly-Angel, we believe education is a powerful tool for creating positive change. Our commitment to social responsibility extends beyond the classroom to make a meaningful impact on communities and the environment.
            </motion.p>
          </div>
        </section>
        
        {/* Our Approach Section */}
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
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Community outreach" className="rounded-lg shadow-lg" loading="lazy" />
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
              {initiatives.map((initiative, index) => <motion.div key={index} className="bg-white p-6 rounded-lg shadow-md flex" initial={{
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
                  <div className="mr-4 flex-shrink-0">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-dark mb-2">{initiative.title}</h3>
                    <p className="text-gray-600">{initiative.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* CalmMinds-UK Legal Partnership Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Free Legal Consultation Partnership
              </motion.h2>
              <motion.p 
                className="text-gray-700 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                In partnership with CalmMinds-UK, we're providing free legal consultation by experienced solicitors as part of our Social Responsibility to the local community.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div 
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/lovable-uploads/922ff83d-92bb-4f7e-83c6-f9d55a3b8687.png" 
                  alt="CalmMinds-UK and Lilly Angel Free Legal Consultation Partnership" 
                  className="w-full h-auto"
                />
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Scale className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-navy-dark">Areas of Expertise</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Immigration & Asylum</h4>
                      <ul className="space-y-1">
                        <li>• Human rights & protection</li>
                        <li>• Asylum applications & appeals</li>
                        <li>• Naturalization & British passport</li>
                        <li>• UK Sponsorship & Work Permits</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Housing & Property</h4>
                      <ul className="space-y-1">
                        <li>• Commercial & Residential Leasing</li>
                        <li>• Tenant rights & Landlord disputes</li>
                        <li>• Lease agreements & renewals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Employment Law</h4>
                      <ul className="space-y-1">
                        <li>• Unlawful dismissal</li>
                        <li>• Workplace rights & disputes</li>
                        <li>• Universal Credit (Welfare Benefits)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Family Law</h4>
                      <ul className="space-y-1">
                        <li>• Divorce & separation</li>
                        <li>• Child arrangements & custody</li>
                        <li>• Debt management & advice</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-lg font-bold text-navy-dark">Contact for Booking</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-600">07448 186 998</span>
                      <span className="mx-2">|</span>
                      <span className="font-semibold text-blue-600">07940 078 447</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-2" />
                      <a href="mailto:info@lilly-angel.co.uk" className="text-blue-600 hover:underline">info@lilly-angel.co.uk</a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-blue-600 mr-2" />
                      <a href="mailto:info@calmmindsuk.org.uk" className="text-blue-600 hover:underline">info@calmmindsuk.org.uk</a>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500">
                      <p className="text-sm text-red-700 font-medium">
                        *FREE LEGAL ADVICE IS AVAILABLE FOR PRE-BOOKED APPOINTMENTS ONLY.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-navy-dark mb-2">Location:</h4>
                  <p className="text-gray-700 text-sm">
                    The WELLcome Hub, 1st floor<br />
                    35 Vicarage Lane, East Ham, E6 6DQ
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Bonny Downs Partnership Section */}
        <section className="py-16 bg-green-100 overflow-hidden">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Community Partnership
              </motion.h2>
              <motion.p 
                className="text-gray-700 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                We're proud to support Bonny Downs Community Association in their mission to serve the local community and create positive change.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <motion.div 
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="/lovable-uploads/fe07de65-07a9-4c55-b709-d0fd58761e3c.png" 
                  alt="Join as Friends of Bonny Downs" 
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-dark mb-3">Support Bonny Downs</h3>
                  <p className="text-gray-600 mb-4">
                    For less than the price of a Netflix subscription, your support can change local lives. 
                    Join 600 Friends who donate just £10 monthly to help deliver vital community services.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-xl overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="/lovable-uploads/95c9c31a-8c7c-4114-a127-f147a9e3d0dc.png" 
                  alt="BDCA Community Support" 
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-dark mb-3">Community Impact</h3>
                  <p className="text-gray-600 mb-4">
                    At BDCA, they help people of all backgrounds in the local community, including families on 
                    low income, those experiencing homelessness, young people, and lonely elders.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Visit bonnydowns.org
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600">
                Bonny Downs Community Association is a registered charity no 1071625<br />
                Registered Office: The Well Community Centre, 49 Vicarage Lane, London E6 6DQ
              </p>
            </motion.div>
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
              <Button variant="outline" className="border-white text-gray-50 bg-orange-dark">
                Volunteer Opportunities
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default SocialResponsibility;
