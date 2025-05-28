
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="potion-section potion-hero-bg min-h-screen flex items-center pt-16">
      <div className="potion-container">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            2,500+ jobs auto-applied this week
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            One-click job applications
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              across all platforms
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Apply to jobs on LinkedIn, Indeed, and Naukri with a single click. 
            Streamline your job search with our intelligent automation system.
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
              className="potion-btn-primary group text-base px-8 py-4"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="potion-btn-secondary group text-base px-8 py-4">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </button>
          </motion.div>
          
          {/* Platform badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
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
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: platform.color }}
                ></div>
                <span className="font-medium" style={{ color: platform.color }}>
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
