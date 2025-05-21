
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function LandingCTA() {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-24 md:p-16 lg:px-24 lg:py-20 relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-blue/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Ready to automate your job search?
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create your free account today and start applying to jobs in minutes, not hours
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-primary-green text-gray-900 hover:bg-primary-green/90 px-8 py-6 rounded-full text-lg w-full sm:w-auto"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg w-full sm:w-auto"
                    onClick={() => navigate('/login')}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Contact sales
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="mt-6 text-sm text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                No credit card required • Free 14-day trial
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
