
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Mail, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center gap-4">
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

        <div className="bg-white/90 backdrop-blur-xl rounded-[20px] shadow-lg px-4 py-2 flex items-center gap-3 border border-white/20">
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
                  <Mail className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white/80 backdrop-blur-md border-white/20">
                Upload Cover Letter
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
                >
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white/80 backdrop-blur-md border-white/20">
                Insights
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingActionBar;
