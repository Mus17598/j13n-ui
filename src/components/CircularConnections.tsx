
import React from 'react';
import { motion } from 'framer-motion';

interface CircularConnectionsProps {
  isActive: boolean;
}

const CircularConnections: React.FC<CircularConnectionsProps> = ({ isActive }) => {
  const platforms = [
    { icon: "🌐", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-24", delay: 0 },
    { icon: "💼", position: "top-8 right-8 -translate-y-12", delay: 0.1 },
    { icon: "📊", position: "bottom-8 right-8 translate-y-12", delay: 0.2 },
    { icon: "📝", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-24", delay: 0.3 },
    { icon: "💡", position: "bottom-8 left-8 translate-y-12", delay: 0.4 },
    { icon: "🔍", position: "top-8 left-8 -translate-y-12", delay: 0.5 },
  ];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <motion.div 
        className="relative w-64 h-64"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Center Icon */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-primary-blue/5 flex items-center justify-center shadow-glass"
            animate={{ boxShadow: ["0 0 10px rgba(140, 158, 255, 0.2)", "0 0 20px rgba(140, 158, 255, 0.4)", "0 0 10px rgba(140, 158, 255, 0.2)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-8 h-8 rounded-full bg-primary-blue/20 flex items-center justify-center text-2xl"
                animate={{ rotateY: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ⚡️
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Circular Paths */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-4 rounded-full border border-primary-blue/10 shadow-glass"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-8 rounded-full border border-primary-blue/20 shadow-glass"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-12 rounded-full border border-primary-blue/30 shadow-glass"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Animated Particle Trails */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-primary-blue"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, Math.sin(index * 45 * (Math.PI / 180)) * 100, Math.sin(index * 45 * (Math.PI / 180)) * 100, 0],
                y: [0, Math.cos(index * 45 * (Math.PI / 180)) * 100, Math.cos(index * 45 * (Math.PI / 180)) * 100, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5]
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Platform Icons */}
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            className={`absolute ${platform.position}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: platform.delay }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-white shadow-glass border border-glass-border flex items-center justify-center text-xl"
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: index * 0.2
              }}
            >
              {platform.icon}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CircularConnections;
