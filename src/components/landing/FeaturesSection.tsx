
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import SectionHeading from '@/components/ui/section-heading';
import { Clock, CheckCircle2, Brain, Rocket, Shield, MessageCircle } from 'lucide-react';

const features = [
  { icon: Clock, title: "Saves 10+ hours/week", desc: "Focus on what matters while AutoApply handles the rest." },
  { icon: CheckCircle2, title: "Personalized applications", desc: "Every application is tailored to match the job requirements." },
  { icon: Brain, title: "Learns from you", desc: "Gets smarter with every application you approve or reject." },
  { icon: Rocket, title: "Real-time tracking", desc: "Monitor your applications status in real-time." },
  { icon: Shield, title: "Private & secure", desc: "Your data is encrypted and never shared without permission." },
  { icon: MessageCircle, title: "24/7 Support", desc: "Got questions? We've got answers. Our support team makes it super easy to get your problems solved — fast." }
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Why Users Love It"
          align="center"
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard 
                hoverEffect 
                className="h-full"
              >
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-primary-purple/30 to-primary-blue/30 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
