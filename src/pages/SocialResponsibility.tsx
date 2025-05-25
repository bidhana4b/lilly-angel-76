
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialHeroSection from '@/components/social-responsibility/SocialHeroSection';
import ApproachSection from '@/components/social-responsibility/ApproachSection';
import KeyInitiativesSection from '@/components/social-responsibility/KeyInitiativesSection';
import LegalPartnershipSection from '@/components/social-responsibility/LegalPartnershipSection';
import CommunityPartnershipSection from '@/components/social-responsibility/CommunityPartnershipSection';
import CTASection from '@/components/social-responsibility/CTASection';

const SocialResponsibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SocialHeroSection />
        <ApproachSection />
        <KeyInitiativesSection />
        <LegalPartnershipSection />
        <CommunityPartnershipSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default SocialResponsibility;
