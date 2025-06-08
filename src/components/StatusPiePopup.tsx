
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface StatusPiePopupProps {
  data?: { title: string; value: number; color: string }[];
  onClose: () => void;
}

const StatusPiePopup: React.FC<StatusPiePopupProps> = ({ data, onClose }) => {
  // Default data if none is provided
  const chartData = data || [
    { title: 'Applied', value: 48, color: '#9CA3AF' },
    { title: 'Interview', value: 20, color: '#60A5FA' },
    { title: 'Failed', value: 24, color: '#F87171' },
    { title: 'Offer', value: 8, color: '#34D399' },
  ];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(30, 41, 59, 0.3)' }}
      onClick={onClose}
    >
      <motion.div
        className="glassmorphism p-8 rounded-3xl max-w-2xl w-full mx-4 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Application Status</h2>
        
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 md:w-80 md:h-80 mb-8 relative">
            <PieChart
              data={chartData}
              lineWidth={40}
              paddingAngle={3}
              rounded
              animate
              animationDuration={800}
              animationEasing="ease-out"
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                fill: '#374151',
                fontWeight: 600,
              }}
              labelPosition={75}
              style={{ width: '100%', height: '100%' }}
              startAngle={-90}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            <TooltipProvider delayDuration={200}>
              {chartData.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-gray-600">{item.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-white/90 backdrop-blur-sm border-none shadow-lg px-3 py-2">
                    <p className="text-sm">
                      <span className="font-semibold">{item.title}:</span> {item.value}%
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
          
          <motion.button
            className="mt-10 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 font-medium transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatusPiePopup;
