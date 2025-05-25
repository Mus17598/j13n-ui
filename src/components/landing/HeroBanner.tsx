
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '@/components/ui/animated-counter';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <motion.section
      className="relative h-screen flex items-center overflow-hidden px-4"
      style={{ opacity: heroOpacity, y: heroY }}
    >
      {/* Background gradient effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-green-500/20 to-transparent"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent"
        style={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
          left: '70%',
          top: '30%'
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="mb-6 inline-block"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <div className="px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-200 shadow-inner">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-soft"></div>
                <span className="text-sm font-medium text-gray-700">
                  <AnimatedCounter value={1250} suffix="+ jobs auto-applied this week" />
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text leading-tight"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            AutoApply
            <motion.span 
              className="block text-4xl md:text-5xl mt-4"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Your personal job-seeking engine
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Harness AI to search, filter, and apply for jobs that match you best — all on autopilot.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <GradientButton 
              size="xl" 
              showArrow 
              onClick={() => navigate('/signup')}
              className="rounded-full"
            >
              Try it Free
            </GradientButton>
            <GradientButton 
              variant="outline" 
              size="xl"
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </GradientButton>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-gray-400/0 to-gray-400/50"></div>
          <span className="text-gray-500 text-sm">Scroll</span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
