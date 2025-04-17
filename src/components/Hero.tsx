
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from './ui/optimized-image';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Track mouse position for parallax effect (only on desktop)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({
          x,
          y
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);
  
  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 min-h-[85vh] flex items-center perspective-1000"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-br from-orange-100/40 to-orange-200/40 rounded-full blur-3xl" 
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20
          }} 
          transition={{
            type: "spring",
            damping: 15
          }} 
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" 
          animate={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30
          }} 
          transition={{
            type: "spring",
            damping: 15
          }} 
        />
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[20%] h-[20%] bg-gradient-to-r from-green-100/20 to-teal-100/20 rounded-full blur-3xl" 
          animate={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -15
          }} 
          transition={{
            type: "spring",
            damping: 15
          }} 
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto relative z-10 px-4 py-8 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left" 
            initial={{
              opacity: 0,
              y: 50
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-gray-200 shadow-sm" 
              initial={{
                opacity: 0,
                scale: 0.8
              }} 
              animate={{
                opacity: 1,
                scale: 1
              }} 
              transition={{
                delay: 0.2,
                duration: 0.5
              }}
            >
              <Sparkles className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-800">Top-Quality & Affordable Training</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-navy-dark via-navy-DEFAULT to-navy-light" 
              initial={{
                opacity: 0,
                y: 30
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                delay: 0.3,
                duration: 0.8
              }}
            >
              Your Complete <span className="text-gradient">Vision</span> Towards Professional Education
            </motion.h1>
            
            {/* Features */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-8" 
              initial={{
                opacity: 0
              }} 
              animate={{
                opacity: 1
              }} 
              transition={{
                delay: 0.5,
                duration: 0.8
              }}
            >
              {[
                {
                  icon: <BookOpen className="h-4 w-4 text-orange-500" />,
                  text: "Expert-Led Courses"
                },
                {
                  icon: <Award className="h-4 w-4 text-orange-500" />,
                  text: "Accredited Certifications"
                },
                {
                  icon: <CheckCircle className="h-4 w-4 text-orange-500" />,
                  text: "Industry Recognized"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 shadow-sm border border-gray-100"
                >
                  {item.icon}
                  <span className="ml-1.5">{item.text}</span>
                </div>
              ))}
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" 
              initial={{
                opacity: 0,
                y: 20
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                delay: 0.6,
                duration: 0.8
              }}
            >
              <Button 
                variant="outline" 
                className="border-2 border-navy-light px-6 py-2.5 font-medium text-base transition-all duration-300 transform hover:-translate-y-1 text-left text-zinc-50 bg-orange-dark"
              >
                Find Your Courses
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            className="lg:col-span-5 relative mt-8 lg:mt-0" 
            initial={{
              opacity: 0,
              scale: 0.9
            }} 
            animate={{
              opacity: 1,
              scale: 1
            }} 
            transition={{
              delay: 0.3,
              duration: 0.8
            }}
          >
            <div className="relative">
              {/* Image with floating animation */}
              <motion.div 
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10" 
                animate={{
                  y: [0, -15, 0]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              >
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                  alt="Students learning" 
                  className="w-full h-full object-cover rounded-2xl" 
                  aspectRatio="aspect-[4/3]" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent mix-blend-overlay" />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-navy-light/10 rounded-full blur-lg" 
                animate={{
                  scale: [1, 1.2, 1]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }} 
              />
              <motion.div 
                className="absolute -top-8 -right-8 w-32 h-32 bg-orange-light/10 rounded-full blur-lg" 
                animate={{
                  scale: [1, 1.3, 1]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }} 
              />
              
              {/* Floating badges - only show on larger screens */}
              {!isMobile && (
                <>
                  <motion.div 
                    className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 border border-gray-100" 
                    animate={{
                      y: [0, -8, 0]
                    }} 
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </span>
                    <span className="font-medium text-gray-800">100+ Classes</span>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-5 -right-5 bg-white py-2 px-4 rounded-lg shadow-lg border border-gray-100" 
                    animate={{
                      y: [0, -10, 0]
                    }} 
                    transition={{
                      repeat: Infinity,
                      duration: 7,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="font-medium text-gray-800">4.9 ★★★★★</span>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
