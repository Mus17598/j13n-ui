
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
};

export default Landing;
