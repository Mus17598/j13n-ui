
import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-gray-50/80 hover:bg-gray-100/80"
                onClick={onUploadResume}
              >
                <FileText className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Upload Resume</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-gray-50/80 hover:bg-gray-100/80"
                onClick={onUploadCoverLetter}
              >
                <BookOpen className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Upload Cover Letter</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          onClick={onAutoApply}
          className="bg-white hover:bg-white/90 text-gray-800 shadow-sm rounded-full px-8 transition-all flex items-center gap-2"
          disabled={isAutoApplying}
        >
          {isAutoApplying ? (
            <span>Auto-Applying ({appliedCount})</span>
          ) : (
            <>
              <span>Start Auto-Apply</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default FloatingActionBar;
