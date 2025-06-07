
import React from 'react';
import { motion } from 'framer-motion';
import { User, Upload, Zap, BarChart3 } from 'lucide-react';

const FocusSection: React.FC = () => {
  const steps = [
    {
      icon: User,
      title: "Create Account",
      description: "Sign up in seconds",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: Upload,
      title: "Upload Details",
      description: "Your info, stored securely",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "One-Click Apply",
      description: "Apply to jobs instantly",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your success",
      color: "from-blue-700 to-blue-800"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Focus on What Matters
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>Tired of the application grind?</p>
              <p>Stop wasting time on repetitive job applications? We get it.</p>
              <p>There's a smarter way to job hunt.</p>
              <p>Set up once, apply to jobs forever</p>
              <p>Focus on landing your dream companies</p>
              <p>More interviews</p>
              <p>Better applications</p>
            </div>
          </motion.div>

          {/* Right side - Animated steps */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Connecting line */}
            <motion.div
              className="absolute left-8 top-16 bottom-16 w-0.5 bg-blue-200"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Icon container */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-semibold text-gray-900 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + index * 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>

                  {/* Step number */}
                  <motion.div
                    className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 1.4 + index * 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Floating elements for extra animation */}
            <motion.div
              className="absolute -top-4 -right-4 w-6 h-6 bg-blue-300 rounded-full opacity-30"
              animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-4 -left-4 w-4 h-4 bg-blue-400 rounded-full opacity-40"
              animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FocusSection;
