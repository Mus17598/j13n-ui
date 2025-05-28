
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import SectionHeading from '@/components/ui/section-heading';
import { Clock, Zap, Shield, BarChart, MousePointer, Users, ArrowRight } from 'lucide-react';

const features = [
  { 
    icon: MousePointer, 
    title: "One-Click Applications", 
    desc: "Apply to multiple job platforms instantly with a single click.",
    color: "from-blue-500 to-blue-600"
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
    color: "from-purple-500 to-purple-600"
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
    color: "from-indigo-500 to-blue-600"
  }
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <section className="py-32 px-4 relative bg-gradient-to-b from-gray-50/50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 25}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeading 
            title="Why Choose AplyGen?"
            subtitle="Streamline your job search with our powerful automation tools"
            align="center"
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlassCard 
                className="h-full p-8 group hover:shadow-2xl transition-all duration-500 hover:bg-white/80"
              >
                {/* Icon with gradient background */}
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}
                >
                  <feature.icon className="w-8 h-8 text-white relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.desc}
                </p>
                
                {/* Hover arrow */}
                <motion.div
                  className="flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom floating element */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glassmorphism px-8 py-4 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">All features included in free tier</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
