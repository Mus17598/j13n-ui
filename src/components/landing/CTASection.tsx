
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="sendpotion-section">
      <div className="sendpotion-container">
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-sm font-medium text-yellow-800 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 fill-current" />
            Join 10,000+ successful job seekers
          </motion.div>
          
          <motion.h2 
            className="sendpotion-heading mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to transform
            <br />
            your job search?
          </motion.h2>
          
          <motion.p 
            className="sendpotion-subheading mx-auto mb-10"
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
              className="sendpotion-btn-primary group text-base px-8 py-4"
            >
              Get started for free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[
              "No credit card required",
              "2-minute setup",
              "Cancel anytime",
              "24/7 support"
            ].map((feature, i) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
