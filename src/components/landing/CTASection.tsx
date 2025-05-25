
import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-20"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            Let AutoApply work for you
          </motion.h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who've simplified their job search with AutoApply.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            <GradientButton 
              size="xl"
              showArrow
              onClick={() => navigate('/signup')}
              className="rounded-full px-12"
            >
              Sign up free
            </GradientButton>
          </motion.div>
          
          <p className="mt-4 text-sm text-gray-500">No credit card needed. Instant start.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
