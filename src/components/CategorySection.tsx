import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
  const activeItem = categories.find(cat => cat.id === activeCategory) || categories[0];
  return <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-4 text-center">Lilly Angel Training Courses &amp; Qualifications</h2>
          <p className="text-gray-600">
            {activeItem.tagline}
          </p>
        </div>

        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          {categories.map(category => <button key={category.id} className={`px-5 py-3 text-lg font-medium transition-colors ${activeCategory === category.id ? 'text-navy-dark border-b-2 border-orange-DEFAULT' : 'text-gray-500 hover:text-navy-dark'}`} onClick={() => setActiveCategory(category.id)}>
              {category.name}
            </button>)}
        </div>

        <div className="grid grid-cols-1">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <div className="bg-gradient-to-r from-white to-transparent absolute inset-0 z-10"></div>
            <div className="relative z-20 flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-navy-dark mb-2">
                  {activeItem.name}
                </h3>
                <p className="text-orange-DEFAULT font-medium mb-4">
                  {activeItem.description}
                </p>
                <Button className="bg-navy-dark hover:bg-navy-light text-white px-6 py-2 mt-4 w-fit flex items-center gap-2">
                  {activeItem.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img src={activeItem.image} alt={activeItem.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CategorySection;