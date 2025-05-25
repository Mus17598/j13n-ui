
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain } from 'lucide-react';
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
    "Intelligent job matching",
    "Automated cover letter generation",
    "Resume keyword optimization"
  ];

  return (
    <section className="py-32 relative overflow-hidden px-4">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.2),transparent)]"
        style={{
          x: mousePosition.x * 15,
          y: mousePosition.y * 15,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title="Smarter than your average job board."
              subtitle="Our AI refines your preferences and tailors every application with surgical precision."
              align="left"
            />
            
            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center space-x-4 group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(34, 197, 94, 0.3)" }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-lg text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="relative aspect-square"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-[40px] transform rotate-6 transition-transform group-hover:rotate-12"
              style={{
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tl from-emerald-500/30 to-transparent rounded-[40px] transform -rotate-6 transition-transform group-hover:-rotate-12"
              style={{
                x: mousePosition.x * -10,
                y: mousePosition.y * -10,
              }}
            />
            <GlassCard 
              className="h-full rounded-[40px] flex flex-col items-center justify-center text-center p-12"
              hoverEffect
              glowEffect
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.9, 1]
                }} 
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Brain className="w-16 h-16 text-green-600 mb-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered</h3>
              <p className="text-gray-600">Smart matching and automated applications to find your perfect job match in seconds.</p>
              
              <motion.div 
                className="mt-8 w-full bg-gray-200 h-2 rounded-full overflow-hidden" 
                whileInView={{ opacity: 1 }} 
                initial={{ opacity: 0.5 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
