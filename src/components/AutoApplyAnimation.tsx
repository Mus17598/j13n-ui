import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface AutoApplyAnimationProps {
  isActive: boolean;
  appliedCount: number;
  onStop: () => void;
}

const AutoApplyAnimation: React.FC<AutoApplyAnimationProps> = ({ isActive, appliedCount, onStop }) => {
  if (!isActive) return null;
  
  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <RefreshCw className="h-5 w-5 text-primary-green animate-spin" />
            <div className="absolute inset-0 rounded-full border border-primary-green/20 animate-pulse-ring" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-800">Auto-Applying...</span>
            <span className="text-sm px-2 py-0.5 bg-primary-green/10 text-primary-green rounded-full w-fit">
              {appliedCount} jobs applied
            </span>
          </div>
        </div>
        
        <Button 
          onClick={onStop}
          variant="destructive"
          size="sm"
          className="bg-red-500/90 hover:bg-red-600/90 text-white shadow-sm hover:shadow-red-500/25 transition-all w-full"
        >
          Stop Auto-Apply
        </Button>
      </div>
    </div>
  );
};

export default AutoApplyAnimation;
