import React, { useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ArrowRight, GripHorizontal } from "lucide-react";
import { motion, useMotionValue } from 'framer-motion';
import StatsChart from '@/components/StatsChart';

interface FloatingActionBarProps {
  onUploadResume: () => void;
  onUploadCoverLetter: () => void;
  onAutoApply: () => void;
  isAutoApplying: boolean;
  appliedCount?: number;
}

const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onUploadResume,
  onUploadCoverLetter,
  onAutoApply,
  isAutoApplying,
  appliedCount = 0,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const applicationStats = [
    { 
      label: 'Applied',
      value: 24,
      color: '#8FE388'
    },
    { 
      label: 'Interviews',
      value: 7,
      color: '#74BBFB'
    },
    { 
      label: 'Offers',
      value: 2,
      color: '#B487FB'
    },
    { 
      label: 'Failed',
      value: 15,
      color: '#FF6B6B'
    }
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      style={{ x, y }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 touch-none"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileDrag={{ scale: 1.02 }}
    >
      <div className={`flex items-center gap-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
        <div className="bg-white/90 backdrop-blur-xl rounded-[20px] shadow-lg px-4 py-2 flex items-center gap-3 border border-white/20">
          <div className="flex items-center pr-2 border-r border-gray-200/30">
            <GripHorizontal className="w-5 h-5 text-gray-400" />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-[12px] bg-white/50 hover:bg-white/70 border-white/30 transition-all"
                  onClick={onUploadResume}
                >
                  <FileText className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white/80 backdrop-blur-md border-white/20">
                Upload Resume
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-[12px] bg-white/50 hover:bg-white/70 border-white/30 transition-all"
                  onClick={onUploadCoverLetter}
                >
                  <BookOpen className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white/80 backdrop-blur-md border-white/20">
                Upload Cover Letter
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <StatsChart stats={applicationStats} />
        </div>

        <Button
          onClick={onAutoApply}
          className="bg-gradient-to-r from-[#88E7FC] to-[#8FE388] hover:opacity-90 text-gray-800 
                   shadow-lg hover:shadow-xl rounded-[24px] px-8 py-5 transition-all flex items-center gap-2
                   hover:scale-[1.02] active:scale-[0.98]"
          disabled={isAutoApplying}
        >
          {isAutoApplying ? (
            <span className="text-lg font-medium">Auto-Applying ({appliedCount})</span>
          ) : (
            <>
              <span className="text-lg font-medium">Start Auto-Apply</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default FloatingActionBar;
