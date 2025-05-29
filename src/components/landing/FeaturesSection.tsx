
import React from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Shield, BarChart, MousePointer, Users } from "lucide-react";

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
    <section className="section bg-gray-50" id="features">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-heading-lg mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Everything you need to <span className="text-blue-600">land your dream job</span>
          </motion.h2>
          <motion.p 
            className="text-body-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our AI-powered platform automates the entire job application process, 
            from finding opportunities to tracking your progress.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-body">
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
