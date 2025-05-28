
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Check } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    "No credit card required",
    "2-minute setup", 
    "Cancel anytime",
    "24/7 support"
  ];

  return (
    <section className="potion-section bg-gray-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="potion-container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 fill-current" />
            Join 10,000+ successful job seekers
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to transform
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              your job search?
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of job seekers who've streamlined their applications with AplyGen's 
            intelligent automation platform.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group"
            >
              Get started for free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="font-medium text-gray-300">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
