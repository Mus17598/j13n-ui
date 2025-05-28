
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '@/components/ui/animated-counter';
import { Sparkles, Zap, Shield } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.01;
      const y = (e.clientY - window.innerHeight / 2) * 0.01;
      springX.set(x);
      springY.set(y);
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.15,
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
        type: "spring",
        stiffness: 200
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      className="relative h-screen flex items-center overflow-hidden px-4"
      style={{ opacity: heroOpacity, y: heroY }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 blur-xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 12}%`,
              top: `${5 + i * 8}%`,
              x: springX,
              y: springY,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            className="mb-8 inline-block"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="glassmorphism px-6 py-3 inline-flex items-center gap-3 shadow-lg">
              <motion.div 
                className="h-2 w-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="text-sm font-medium text-gray-700">
                <AnimatedCounter value={2500} suffix="+ jobs auto-applied this week" />
              </span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 gradient-text leading-tight"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.span 
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              AplyGen
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-4xl font-medium text-gray-700 mb-4"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <span className="block">One-click job applications</span>
            <motion.span 
              className="block text-blue-600"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              across all platforms
            </motion.span>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Apply to jobs on LinkedIn, Indeed, and Naukri with a single click. 
            <br className="hidden md:block" />
            Streamline your job search with our intelligent automation system.
          </motion.p>
          
          {/* Action button */}
          <motion.div
            className="mb-12"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <GradientButton 
                size="xl" 
                showArrow 
                onClick={() => navigate('/signup')}
                className="rounded-2xl px-12 py-4 text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-500"
              >
                Get Started Free
              </GradientButton>
            </motion.div>
          </motion.div>
          
          {/* Platform logos */}
          <motion.div
            className="flex items-center justify-center gap-12 text-sm text-gray-500"
            custom={5}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {[
              { name: "LinkedIn", color: "#0077B5", icon: "💼" },
              { name: "Indeed", color: "#2557A7", icon: "🔍" },
              { name: "Naukri", color: "#4A90E2", icon: "💡" },
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                className="flex items-center gap-3 glassmorphism px-4 py-2"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `0 10px 25px ${platform.color}20`
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-lg">{platform.icon}</span>
                <span className="font-medium" style={{ color: platform.color }}>
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating features */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-8 glassmorphism p-4 shadow-lg"
              variants={floatingVariants}
              animate="animate"
            >
              <Zap className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-700">Lightning Fast</p>
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 right-8 glassmorphism p-4 shadow-lg"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 2 }}
            >
              <Shield className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-700">Secure & Private</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-[2px] h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
          <motion.span 
            className="text-gray-500 text-sm font-medium tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL
          </motion.span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
