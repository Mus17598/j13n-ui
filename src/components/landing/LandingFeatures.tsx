
import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, Search, Filter, ArrowRight } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      title: "AI-Powered Job Matching",
      description: "Our intelligent algorithm finds jobs that perfectly match your skills, preferences, and career goals.",
      icon: Search,
      color: "bg-primary-green/10",
      textColor: "text-primary-green"
    },
    {
      title: "Automated Applications",
      description: "Apply to multiple job postings with a single click, saving hours of repetitive work.",
      icon: Filter,
      color: "bg-primary-blue/10",
      textColor: "text-primary-blue"
    },
    {
      title: "Smart Cover Letters",
      description: "Generate personalized cover letters tailored to each job posting and company culture.",
      icon: ArrowRight,
      color: "bg-primary-purple/10",
      textColor: "text-primary-purple"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How AutoApply Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use artificial intelligence to streamline your job search process from start to finish
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature spotlight */}
        <div className="mt-24">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Save 10+ hours per week on your job search
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Focus on preparing for interviews while AutoApply handles the tedious application process for you.
              </p>
              <ul className="space-y-4">
                {[
                  "Upload your resume just once",
                  "Let AI tailor applications for each job",
                  "Track application status in one dashboard",
                  "Receive interview notifications instantly"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    <CheckCircle2 className="text-primary-green mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 p-4">
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-xl">AutoApply Dashboard Demo</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
