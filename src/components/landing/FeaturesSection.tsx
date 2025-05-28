
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
    <section id="features" className="sendpotion-section bg-gray-50/50">
      <div className="sendpotion-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Why Choose AplyGen?
          </h2>
          <p className="sendpotion-subheading mx-auto">
            Streamline your job search with our powerful automation tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="sendpotion-card sendpotion-hover-lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
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
