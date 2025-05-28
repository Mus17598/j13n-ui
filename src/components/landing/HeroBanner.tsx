
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="sendpotion-section sendpotion-bg min-h-screen flex items-center">
      <div className="sendpotion-container">
        <div className="text-center">
          {/* Status badge */}
          <motion.div
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm font-medium text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            2,500+ jobs auto-applied this week
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="sendpotion-heading mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            One-click job applications
            <br />
            <span className="text-gray-600">across all platforms</span>
          </motion.h1>
          
          <motion.p
            className="sendpotion-subheading mx-auto mb-10"
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
              className="sendpotion-btn-primary group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button className="sendpotion-btn-secondary">
              Watch Demo
            </button>
          </motion.div>
          
          {/* Platform badges */}
          <motion.div
            className="flex items-center justify-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
              <span className="font-medium text-[#0077B5]">LinkedIn</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
              <span className="font-medium text-[#2557A7]">Indeed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
              <span className="font-medium text-[#4A90E2]">Naukri</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
