
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Category {
  id: string;
  name: string;
  description: string;
  tagline: string;
  cta: string;
  image: string;
}

const categories: Category[] = [{
  id: 'health-safety',
  name: 'Health and Safety',
  description: '#1 Most popular topic on Hurak',
  tagline: 'With over 100,000 customers, from individuals to some of the most respected global brands',
  cta: 'Explore Health And Safety Courses',
  image: '/lovable-uploads/b6830540-4fd4-4909-8e65-53d63367223e.png'
}, {
  id: 'first-aid',
  name: 'First Aid',
  description: 'Essential life-saving skills',
  tagline: 'Learn how to respond effectively in emergency situations with our certified courses',
  cta: 'Explore First Aid Courses',
  image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1470&auto=format&fit=crop'
}, {
  id: 'security',
  name: 'Security',
  description: 'Professional security training',
  tagline: 'Comprehensive security courses designed for individuals and organizations',
  cta: 'Explore Security Courses',
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1531&auto=format&fit=crop'
}, {
  id: 'hospitality',
  name: 'Hospitality',
  description: 'Excellence in service',
  tagline: 'Develop the skills needed to excel in the competitive hospitality industry',
  cta: 'Explore Hospitality Courses',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop'
}, {
  id: 'teaching-academics',
  name: 'Teaching & Academics',
  description: 'Elevate your teaching career',
  tagline: 'Professional development courses for educators at all levels',
  cta: 'Explore Teaching & Academic Courses',
  image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1632&auto=format&fit=crop'
}, {
  id: 'construction',
  name: 'Construction',
  description: 'Build your expertise',
  tagline: 'Industry-recognized qualifications for construction professionals',
  cta: 'Explore Construction Courses',
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1531&auto=format&fit=crop'
}];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeItem = categories.find(cat => cat.id === activeCategory) || categories[0];
  
  // Animation effect when changing categories
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4 relative inline-block">
            <span className="relative z-10">Lilly Angel Training Courses & Qualifications</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-DEFAULT/20 -z-10 transform -rotate-1"></span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            {activeItem.tagline}
          </p>
        </div>

        <div className="flex flex-wrap justify-center border-b border-gray-200 mb-12 overflow-x-auto scrollbar-none">
          <div className="inline-flex space-x-2 pb-2 px-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-5 py-3 text-lg font-medium transition-all duration-300 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-navy-dark text-white shadow-lg transform -translate-y-1'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-navy-dark'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div 
            className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <span className="bg-orange-DEFAULT/10 text-orange-DEFAULT font-medium px-4 py-1 rounded-full text-sm mb-6 w-fit">
                  {activeItem.description}
                </span>
                <h3 className="text-3xl font-bold text-navy-dark mb-4">
                  {activeItem.name}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {activeItem.tagline}
                </p>
                <Button 
                  className="bg-navy-dark hover:bg-navy-light text-white px-6 py-6 mt-4 w-fit group transition-all duration-300"
                >
                  <span>{activeItem.cta}</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
              
              <div className="order-1 md:order-2 h-64 md:h-auto overflow-hidden">
                <div className="h-full w-full">
                  <AspectRatio ratio={16/9} className="h-full">
                    <img 
                      src={activeItem.image} 
                      alt={activeItem.name} 
                      className={`w-full h-full object-cover object-center transition-all duration-700 transform hover:scale-110 ${
                        isAnimating ? 'blur-sm' : 'blur-0'
                      }`}
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {categories.map((category, index) => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-orange-DEFAULT w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to ${category.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
