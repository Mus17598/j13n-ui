
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

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
            2,500+ jobs auto-applied this week
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            One-click job applications
            <br />
            <span className="sp-gradient-text">
              across all platforms
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Apply to jobs on LinkedIn, Indeed, and Naukri with a single click. 
            Streamline your job search with our intelligent automation system.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="sp-btn-primary group text-base px-8 py-4 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="sp-btn-secondary group text-base px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </motion.div>
          
          {/* Platform badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { name: "LinkedIn", color: "#0077B5" },
              { name: "Indeed", color: "#2557A7" },
              { name: "Naukri", color: "#4A90E2" }
            ].map((platform) => (
              <div 
                key={platform.name}
                className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: platform.color }}
                ></div>
                <span className="font-semibold text-slate-700">
                  {platform.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
