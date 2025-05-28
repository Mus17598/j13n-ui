
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 potion-gradient-soft">
        {/* Animated background elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="potion-blur-orb"
            style={{
              width: `${250 + i * 80}px`,
              height: `${250 + i * 80}px`,
              left: `${-15 + i * 18}%`,
              top: `${-15 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 25 + i * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 glassmorphism rounded-full border border-white/30 mb-12 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-base font-semibold text-slate-700">
              Join 10,000+ successful job seekers
            </span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-12 gradient-text leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            Ready to transform
            <br />
            <span className="text-slate-700">your job search?</span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl md:text-3xl text-slate-500 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Join thousands of job seekers who've streamlined their applications with AplyGen's 
            intelligent automation platform.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/signup')}
              className="potion-pill text-xl px-12 py-5 inline-flex items-center gap-4 group shadow-2xl shadow-purple-300/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative">Get started for free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>
          
          {/* Features list */}
          <motion.div
            className="flex flex-wrap justify-center gap-10 text-base text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              "No credit card required",
              "2-minute setup",
              "Cancel anytime",
              "24/7 support"
            ].map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-semibold">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-16 left-12 glassmorphism p-6 shadow-2xl border border-white/20"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 6, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-8 h-8 text-purple-500" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-24 right-12 glassmorphism p-6 shadow-2xl border border-white/20"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -4, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
