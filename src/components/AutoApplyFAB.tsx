
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AutoApplyFABProps {
  onClick: () => void;
}

const AutoApplyFAB: React.FC<AutoApplyFABProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.5
      }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <motion.button
        onClick={onClick}
        className="flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-full
                 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90
                 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ease-out
                 hover:scale-105 active:scale-95 relative overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <span>Start with AplyGen</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        </span>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute -inset-px bg-gradient-to-r from-blue-600/50 to-blue-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
      </motion.button>
    </motion.div>
  );
};

export default AutoApplyFAB;
