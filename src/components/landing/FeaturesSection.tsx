
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import { Clock, Zap, Shield, BarChart, MousePointer, Users, ArrowRight } from 'lucide-react';

const features = [
  { 
    icon: MousePointer, 
    title: "One-Click Applications", 
    desc: "Apply to multiple job platforms instantly with a single click.",
    color: "from-purple-500 to-blue-600"
  },
  { 
    icon: Clock, 
    title: "Save Hours Daily", 
    desc: "Automate your job search and focus on interview preparation.",
    color: "from-green-500 to-emerald-600"
  },
  { 
    icon: Zap, 
    title: "Multi-Platform Support", 
    desc: "Works seamlessly with LinkedIn, Indeed, Naukri, and more.",
    color: "from-purple-500 to-pink-600"
  },
  { 
    icon: BarChart, 
    title: "Application Tracking", 
    desc: "Monitor your applications and success rates in real-time.",
    color: "from-orange-500 to-red-500"
  },
  { 
    icon: Shield, 
    title: "Secure & Private", 
    desc: "Your data is encrypted and protected with enterprise-grade security.",
    color: "from-teal-500 to-cyan-600"
  },
  { 
    icon: Users, 
    title: "Trusted by Thousands", 
    desc: "Join over 10,000+ job seekers who've found success with AplyGen.",
    color: "from-indigo-500 to-purple-600"
  }
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="potion-blur-orb"
            animate={{
              x: [0, 150, 0],
              y: [0, -120, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 30 + i * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${15 + i * 20}%`,
              top: `${5 + i * 15}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionHeading 
            title="Why Choose AplyGen?"
            subtitle="Streamline your job search with our powerful automation tools"
            align="center"
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="glassmorphism h-full p-10 group hover:shadow-2xl hover:shadow-purple-200/30 transition-all duration-700 hover:bg-white/80 border border-white/30">
                {/* Icon with gradient background */}
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-110 transition-transform duration-700 shadow-lg`}
                >
                  <feature.icon className="w-10 h-10 text-white relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-6 text-slate-800 group-hover:text-purple-600 transition-colors duration-500">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  {feature.desc}
                </p>
                
                {/* Hover arrow */}
                <motion.div
                  className="flex items-center text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500"
                  initial={{ x: -15 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom floating element */}
        <motion.div
          className="flex justify-center mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glassmorphism px-10 py-6 inline-flex items-center gap-4 border border-white/30 shadow-xl"
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700 font-semibold text-lg">All features included in free tier</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
