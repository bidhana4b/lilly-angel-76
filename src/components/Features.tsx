
import React from 'react';
import { BadgeDollarSign, MapPin, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <BadgeDollarSign className="h-8 w-8 text-teal-500" />,
      title: "Price Match Guarantee",
      description: "Browse with confidence we'll meet or beat any of our competitor's prices",
      bgColor: "bg-teal-50",
      iconBg: "bg-teal-100"
    },
    {
      icon: <MapPin className="h-8 w-8 text-indigo-500" />,
      title: "Nationwide Coverage",
      description: "Local and nationwide coverage so that you can get trained no matter where you are",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100"
    },
    {
      icon: <Rocket className="h-8 w-8 text-sky-500" />,
      title: "Same Day Results",
      description: "Benefit from instant results for most of our courses",
      bgColor: "bg-sky-50",
      iconBg: "bg-sky-100"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark relative inline-block">
            <span className="relative z-10">Why Choose Us</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-DEFAULT/20 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We offer comprehensive training solutions with these key benefits
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card className={`h-full border-none shadow-lg ${feature.bgColor} overflow-hidden transition-all duration-300`}>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`rounded-full ${feature.iconBg} p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
