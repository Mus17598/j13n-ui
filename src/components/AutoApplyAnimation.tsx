
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import CircularConnections from './CircularConnections';

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
      <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <RefreshCw className="h-5 w-5 text-primary-green animate-spin" />
                <div className="absolute inset-0 rounded-full border border-primary-green/20 animate-pulse-ring" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">Auto-Applying...</span>
                <span className="text-sm px-2 py-0.5 bg-primary-green/10 text-primary-green rounded-full">
                  {appliedCount} jobs applied
                </span>
              </div>
            </div>
            
            <Button 
              onClick={onStop}
              variant="destructive"
              size="sm"
              className="bg-red-500/90 hover:bg-red-600/90 text-white shadow-sm hover:shadow-red-500/25 transition-all"
            >
              Stop Auto-Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoApplyAnimation;
