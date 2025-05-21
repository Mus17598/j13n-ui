
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { User, Upload, Zap, BarChart, CheckCircle2 } from 'lucide-react';

const EfficiencySection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const steps = [
    { icon: User, title: "Create Account", desc: "Sign up in seconds" },
    { icon: Upload, title: "Upload Details", desc: "Your info, stored securely" },
    { icon: Zap, title: "One-Click Apply", desc: "Apply to jobs instantly" },
    { icon: BarChart, title: "Track Progress", desc: "Monitor your success" }
  ];

  const points = [
    "Upload your details once, apply to jobs forever",
    "One-click applications to your dream companies",
    "More time to prepare for interviews",
    "Real-time tracking of your applications"
  ];

  return (
    <section className="py-32 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#15151f] z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          title="Focus on What Matters"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">
              Stop the Application Grind
            </h3>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Tired of spending hours on repetitive job applications? We get it. That's why we've built a smarter way to job hunt.
            </p>
            <motion.ul 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {points.map((point, i) => (
                <motion.li 
                  key={i}
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-purple mt-1 flex-shrink-0" />
                  <span className="text-lg text-white/80">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard 
              className="relative overflow-hidden"
              glowEffect
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-purple to-primary-blue"></div>
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-4 group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-purple/30 to-primary-blue/30 flex items-center justify-center group-hover:bg-primary-purple/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <p className="text-white/60">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EfficiencySection;
