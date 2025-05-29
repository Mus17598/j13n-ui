import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

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
    <section className="sp-section sp-hero-bg min-h-screen flex items-center pt-16">
      <div className="sp-container">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            className="mb-10 sp-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono font-bold text-slate-900">
              {count.toLocaleString()}+
            </span>
            {' jobs auto-applied this week'}
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Finding a job shouldn't be a full-time job
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're building the future of job search where AI agents do the heavy lifting for you. Our smart system automatically finds relevant roles, tailors your applications, and tracks every step—so you can focus on preparing, not searching. Whether you're starting out or switching careers, we are here to make applying effortless, fast, and intelligent.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              className="sp-btn-primary group text-base px-8 py-4 text-lg"
            >
              Try it here.
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
