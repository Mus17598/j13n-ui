
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AutoApplyFAB from '@/components/AutoApplyFAB';
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
  
  const handleAutoApplyClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
      <AutoApplyFAB onClick={handleAutoApplyClick} />
    </div>
  );
};

export default Landing;
