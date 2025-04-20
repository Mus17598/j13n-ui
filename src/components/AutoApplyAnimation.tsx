
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AutoApplyAnimationProps {
  isActive: boolean;
  onStop: () => void;
}

const AutoApplyAnimation: React.FC<AutoApplyAnimationProps> = ({ isActive, onStop }) => {
  const [progress, setProgress] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
        
        if (progress % 20 === 0 && progress > 0) {
          setAppliedCount(prev => prev + 1);
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isActive, progress]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
      <div className="frosted-panel max-w-sm w-full p-6 space-y-6 pointer-events-auto shadow-xl">
        {/* Pulsing Rings Animation */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[400px] h-[400px] relative">
            {/* Pulsing Rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-primary-green/20 animate-pulse-ring"
                style={{
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-xl font-semibold text-gray-800">Auto-Applying...</h2>
          <p className="text-sm text-gray-600">
            Applications are being submitted automatically
          </p>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="bg-secondary-gray/40 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary-green animate-pulse-soft">{appliedCount}</div>
            <div className="text-sm text-gray-600">Jobs Applied</div>
          </div>
        </div>
        
        <div className="flex justify-center relative z-10">
          <Button 
            onClick={onStop}
            variant="destructive"
            className="bg-red-500/90 hover:bg-red-600/90 text-white shadow-lg hover:shadow-red-500/25 transition-all"
          >
            Stop Auto-Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoApplyAnimation;
