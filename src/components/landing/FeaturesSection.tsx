
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import SectionHeading from '@/components/ui/section-heading';
import { Clock, Zap, Shield, BarChart, MousePointer, Users } from 'lucide-react';

const features = [
  { icon: MousePointer, title: "One-Click Applications", desc: "Apply to multiple job platforms instantly with a single click." },
  { icon: Clock, title: "Save Hours Daily", desc: "Automate your job search and focus on interview preparation." },
  { icon: Zap, title: "Multi-Platform Support", desc: "Works seamlessly with LinkedIn, Indeed, Naukri, and more." },
  { icon: BarChart, title: "Application Tracking", desc: "Monitor your applications and success rates in real-time." },
  { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and protected with enterprise-grade security." },
  { icon: Users, title: "Trusted by Thousands", desc: "Join over 10,000+ job seekers who've found success with AplyGen." }
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
    <section className="py-24 px-4 relative bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Why Choose AplyGen?"
          subtitle="Streamline your job search with our powerful automation tools"
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
                className="h-full p-6"
              >
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
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
