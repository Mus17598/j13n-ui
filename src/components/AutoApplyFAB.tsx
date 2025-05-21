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
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-full
                 bg-[#0CAA41] hover:bg-[#0CAA41]/90
                 shadow-lg hover:shadow-xl transition-all duration-300 ease-out
                 hover:scale-105 active:scale-95"
      >
        <span>Start Auto-Apply</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default AutoApplyFAB;