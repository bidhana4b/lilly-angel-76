
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import Features from '@/components/Features';
import PopularCourses from '@/components/PopularCourses';
import CareerSection from '@/components/CareerSection';
import Tutors from '@/components/Tutors';
import TeamTraining from '@/components/TeamTraining';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="space-y-12 md:space-y-16"> {/* Consistent spacing between sections */}
          <CategorySection />
          <Features />
          <PopularCourses />
          <CareerSection />
          <Tutors />
          <TeamTraining />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
