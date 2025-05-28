
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/landing/Navigation';
import HeroBanner from '@/components/landing/HeroBanner';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AISection from '@/components/landing/AISection';
import EfficiencySection from '@/components/landing/EfficiencySection';
import CTASection from '@/components/landing/CTASection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FooterSection from '@/components/landing/FooterSection';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <main>
        <HeroBanner />
        <FeaturesSection />
        <AISection />
        <EfficiencySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Landing;
