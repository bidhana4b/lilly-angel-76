
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([initialCategory !== 'all' ? initialCategory : '']);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [level, setLevel] = useState<string[]>([]);
  
  const categories = [
    { id: 'health', name: 'Health and Safety' },
    { id: 'first-aid', name: 'First Aid' },
    { id: 'security', name: 'Security Training' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'teaching', name: 'Teaching & Academics' },
  ];
  
  const levels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];
  
  const courses = [
    {
      id: 1,
      title: 'First Aid Certification',
      category: 'first-aid',
      level: 'beginner',
      price: 79,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Learn essential first aid techniques to handle emergencies with confidence.',
      rating: 4.8,
      students: 1245,
    },
    {
      id: 2,
      title: 'Workplace Health & Safety',
      category: 'health',
      level: 'intermediate',
      price: 99,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Comprehensive course on maintaining a safe and healthy workplace environment.',
      rating: 4.7,
      students: 987,
    },
    {
      id: 3,
      title: 'Security Guard Certification',
      category: 'security',
      level: 'beginner',
      price: 120,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Get certified as a professional security guard with this comprehensive program.',
      rating: 4.9,
      students: 1560,
    },
    {
      id: 4,
      title: 'Hotel Management Essentials',
      category: 'hospitality',
      level: 'intermediate',
      price: 149,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Master the fundamentals of hotel operations and guest service excellence.',
      rating: 4.6,
      students: 753,
    },
    {
      id: 5,
      title: 'Teaching Certification Program',
      category: 'teaching',
      level: 'advanced',
      price: 199,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Comprehensive teaching certification program for aspiring educators.',
      rating: 4.9,
      students: 1230,
    },
    {
      id: 6,
      title: 'Advanced Security Operations',
      category: 'security',
      level: 'advanced',
      price: 180,
      image: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Advanced security protocols and operations for security professionals.',
      rating: 4.8,
      students: 625,
    },
  ];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleLevelChange = (level: string) => {
    setLevel(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };
  
  // Filter courses based on the selected filters
  const filteredCourses = courses.filter(course => {
    // Filter by search term
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
      return false;
    }
    
    // Filter by price range
    if (course.price < priceRange[0] || course.price > priceRange[1]) {
      return false;
    }
    
    // Filter by level
    if (level.length > 0 && !level.includes(course.level)) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-12">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-navy-dark mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Our Courses
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Browse through our comprehensive range of professional training courses designed to help you achieve your career goals.
            </motion.p>
            <motion.div 
              className="max-w-md mx-auto relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-4 pr-10 py-3 w-full rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                className="absolute right-0 top-0 bottom-0 rounded-l-none bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </motion.div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox 
                            id={`category-${category.id}`} 
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryChange(category.id)}
                          />
                          <Label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 100]} 
                        max={200} 
                        step={10}
                        onValueChange={(value) => setPriceRange(value as number[])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Level Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Level</h4>
                    <div className="space-y-2">
                      {levels.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox 
                            id={`level-${item.id}`} 
                            checked={level.includes(item.id)}
                            onCheckedChange={() => handleLevelChange(item.id)}
                          />
                          <Label htmlFor={`level-${item.id}`} className="ml-2 text-sm">
                            {item.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategories([]);
                      setPriceRange([0, 100]);
                      setLevel([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              {/* Course List */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
                  </h3>
                  <select className="border rounded-md px-3 py-2 text-sm">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                    <option>Newest</option>
                  </select>
                </div>
                
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {filteredCourses.map((course, index) => (
                      <motion.div 
                        key={course.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-navy-dark">{course.title}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              ${course.price}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-yellow-400 mr-1">★</div>
                              <span className="text-sm font-medium">{course.rating}</span>
                              <span className="text-gray-500 text-sm ml-2">({course.students} students)</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              View Course
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-10 text-center">
                    <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategories([]);
                        setPriceRange([0, 100]);
                        setLevel([]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
