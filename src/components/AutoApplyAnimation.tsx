
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import CircularConnections from './CircularConnections';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoApplyAnimationProps {
  isActive: boolean;
  onStop: () => void;
  appliedCount: number;
}

const AutoApplyAnimation: React.FC<AutoApplyAnimationProps> = ({ isActive, onStop, appliedCount }) => {
  if (!isActive) return null;
  
  return (
    <>
      <CircularConnections isActive={isActive} />
      <AnimatePresence>
        {isActive && (
          <motion.div 
            className="fixed top-0 left-0 right-0 z-50 py-2 bg-glass-background/95 backdrop-blur-xl border-b border-glass-border shadow-glass"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <RefreshCw className="h-5 w-5 text-primary-blue animate-spin" />
                    <div className="absolute inset-0 rounded-full border border-primary-blue/20 animate-pulse-ring" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Auto-Applying...</span>
                    <motion.span 
                      className="text-sm px-2 py-0.5 bg-primary-blue/10 text-primary-blue rounded-full border border-primary-blue/30"
                      key={appliedCount}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {appliedCount} jobs applied
                    </motion.span>
                  </div>
                </div>
                
                <Button 
                  onClick={onStop}
                  variant="destructive"
                  size="sm"
                  className="bg-destructive/10 hover:bg-destructive/20 text-destructive shadow-sm hover:shadow-destructive/10 border border-destructive/30 transition-all micro-hover"
                >
                  Stop Auto-Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AutoApplyAnimation;
