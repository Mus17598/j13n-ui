
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Shield, BarChart, MousePointer, Users } from 'lucide-react';

const features = [
  { 
    icon: MousePointer, 
    title: "One-Click Applications", 
    desc: "Apply to multiple job platforms instantly with a single click."
  },
  { 
    icon: Clock, 
    title: "Save Hours Daily", 
    desc: "Automate your job search and focus on interview preparation."
  },
  { 
    icon: Zap, 
    title: "Multi-Platform Support", 
    desc: "Works seamlessly with LinkedIn, Indeed, Naukri, and more."
  },
  { 
    icon: BarChart, 
    title: "Application Tracking", 
    desc: "Monitor your applications and success rates in real-time."
  },
  { 
    icon: Shield, 
    title: "Secure & Private", 
    desc: "Your data is encrypted and protected with enterprise-grade security."
  },
  { 
    icon: Users, 
    title: "Trusted by Thousands", 
    desc: "Join over 10,000+ job seekers who've found success with AplyGen."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="potion-section bg-white">
      <div className="potion-container">
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-sm font-medium text-purple-800 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Features
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose AplyGen?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Streamline your job search with our powerful automation tools
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="potion-card group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="w-7 h-7 text-purple-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
