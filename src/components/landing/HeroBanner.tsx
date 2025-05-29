
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 2500;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.floor(progress * end));
      if (progress === 1) clearInterval(counter);
    }, frameRate);
    return () => clearInterval(counter);
  }, []);

  return (
    <section className="section min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <motion.div
            className="mb-8 badge mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-semibold text-blue-700">
              {count.toLocaleString()}+
            </span>
            jobs auto-applied this week
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-heading-xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Finding a job shouldn't be a 
            <span className="text-blue-600"> full-time job</span>
          </motion.h1>
          
          <motion.p
            className="text-body-lg max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're building the future of job search where AI agents do the heavy lifting for you. 
            Our smart system automatically finds relevant roles, tailors your applications, and tracks 
            every step—so you can focus on preparing, not searching.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary group text-base px-8 py-4"
            >
              Try it here
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              className="btn-secondary text-base px-8 py-4"
            >
              Watch Demo
            </button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>2-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>10,000+ users</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
