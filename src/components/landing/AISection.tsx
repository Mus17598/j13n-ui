
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Target, FileText, Search } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2 } from 'lucide-react';

const AISection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Intelligent Job Matching",
      description: "AI analyzes your skills and preferences to find perfect job matches",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      title: "Automated Cover Letter Generation",
      description: "Generate personalized cover letters for each application automatically",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Search,
      title: "Resume Keyword Optimization",
      description: "Optimize your resume with relevant keywords for better ATS compatibility",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden px-4 bg-white">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"
        style={{
          x: mousePosition.x * 15,
          y: mousePosition.y * 15,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title="AI-Powered Job Search Revolution"
              subtitle="Experience the future of job hunting with intelligent automation that works for you 24/7"
              align="center"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <GlassCard className="h-full p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-white/80 backdrop-blur-sm">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated progress indicator */}
                <motion.div 
                  className="mt-6 w-full bg-gray-100 h-2 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{
                      duration: 1.5,
                      delay: 0.8 + i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Central Brain Animation */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }} 
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <GlassCard className="relative w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </GlassCard>
            
            {/* Orbiting elements */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-lg"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  rotate: angle + 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                initial={{
                  x: 80,
                  y: -8,
                  rotate: angle,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISection;
