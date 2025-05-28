
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '@/components/ui/animated-counter';
import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  
  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.008;
      const y = (e.clientY - window.innerHeight / 2) * 0.008;
      springX.set(x);
      springY.set(y);
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  const textVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.2,
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1],
        type: "spring",
        stiffness: 100
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-15, 15, -15],
      rotate: [-3, 3, -3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-20"
      style={{ opacity: heroOpacity, y: heroY }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="potion-blur-orb"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${5 + i * 10}%`,
              x: springX,
              y: springY,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            className="mb-12 inline-block"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="glassmorphism px-8 py-4 inline-flex items-center gap-4 shadow-2xl border border-white/30">
              <motion.div 
                className="h-2.5 w-2.5 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="text-sm font-medium text-slate-700">
                <AnimatedCounter value={2500} suffix="+ jobs auto-applied this week" />
              </span>
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 gradient-text leading-[0.9] tracking-tight"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.span 
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 40px rgba(102, 126, 234, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              AplyGen
            </motion.span>
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-600 mb-6 leading-relaxed"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <span className="block mb-2">One-click job applications</span>
            <motion.span 
              className="block text-purple-600 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              across all platforms
            </motion.span>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-500 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Apply to jobs on LinkedIn, Indeed, and Naukri with a single click. 
            <br className="hidden md:block" />
            Streamline your job search with our intelligent automation system.
          </motion.p>
          
          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.button
              onClick={() => navigate('/signup')}
              className="potion-pill text-lg px-10 py-4 inline-flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            
            <motion.button
              className="potion-pill-outline text-lg px-10 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
          
          {/* Platform logos */}
          <motion.div
            className="flex items-center justify-center gap-8 md:gap-16 text-sm text-slate-400"
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
                className="flex items-center gap-3 glassmorphism px-6 py-3 border border-white/20"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `0 20px 40px ${platform.color}15`
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-xl">{platform.icon}</span>
                <span className="font-medium text-slate-600" style={{ color: platform.color }}>
                  {platform.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating features */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-8 glassmorphism p-6 shadow-2xl border border-white/20"
              variants={floatingVariants}
              animate="animate"
            >
              <Zap className="w-8 h-8 text-purple-500 mb-3" />
              <p className="text-sm font-medium text-slate-700">Lightning Fast</p>
              <p className="text-xs text-slate-500">Instant applications</p>
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 right-8 glassmorphism p-6 shadow-2xl border border-white/20"
              variants={floatingVariants}
              animate="animate"
              transition={{ delay: 3 }}
            >
              <Shield className="w-8 h-8 text-green-500 mb-3" />
              <p className="text-sm font-medium text-slate-700">Secure & Private</p>
              <p className="text-xs text-slate-500">Enterprise-grade security</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
          <motion.span 
            className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
