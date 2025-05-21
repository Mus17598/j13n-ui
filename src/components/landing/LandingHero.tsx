
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function LandingHero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <div className="absolute top-40 -left-10 w-40 h-40 bg-primary-green/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-10 w-60 h-60 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-primary-purple/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-primary-green/10 text-primary-green text-sm font-medium inline-block mb-6">
              Automate your job search
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your personal
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-blue ml-3">job-seeking</span>
            <br />engine
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Harness AI to search, filter, and apply for jobs that match you best — all on autopilot.
            Save time and land your dream job faster.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="text-base px-8 py-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full w-full sm:w-auto"
                onClick={() => navigate('/signup')}
              >
                Get started free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className="text-base px-8 py-6 border-gray-300 text-gray-700 rounded-full w-full sm:w-auto"
                onClick={() => navigate('/login')}
              >
                See how it works
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <motion.div 
          className="mt-16 sm:mt-24 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green/5 to-primary-blue/5 mix-blend-overlay"></div>
            <img 
              src="https://source.unsplash.com/random/1200x800/?dashboard,productivity" 
              alt="AutoApply Dashboard" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
        
        {/* Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <h3 className="text-4xl font-bold text-gray-900">3,000+</h3>
            <p className="text-gray-600 mt-2">Job applications automated</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-900">98%</h3>
            <p className="text-gray-600 mt-2">Time saved on job search</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-gray-900">87%</h3>
            <p className="text-gray-600 mt-2">Higher interview rates</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
