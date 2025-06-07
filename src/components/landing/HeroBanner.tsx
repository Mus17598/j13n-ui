
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
    <section className="section-lg min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container">
        <div className="text-center container-sm">
          {/* Status badge */}
          <motion.div
            className="mb-10 badge mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono font-semibold text-gray-900">
              {count.toLocaleString()}+
            </span>
            {' jobs auto-applied this week'}
            <Sparkles className="w-4 h-4 text-primary-600" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-display mb-8 gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Finding a job shouldn't be a full-time job
          </motion.h1>
          
          <motion.p
            className="text-subheading max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're building the future of job search where AI agents do the heavy lifting for you. Our smart system automatically finds relevant roles, tailors your applications, and tracks every step—so you can focus on preparing, not searching.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              className="btn-primary text-lg px-8 py-4"
              onClick={() => navigate('/signup')}
            >
              Try it here
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
