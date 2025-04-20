
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AutoApplyAnimationProps {
  isActive: boolean;
  onStop: () => void;
}

const AutoApplyAnimation: React.FC<AutoApplyAnimationProps> = ({ isActive, onStop }) => {
  const [progress, setProgress] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  
  // Simulate progress and application counts
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="frosted-panel max-w-md w-full p-8 space-y-6 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-primary-green/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-8 h-8 bg-primary-green/30 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/2 right-20 w-6 h-6 bg-primary-mint rounded-full animate-bounce-soft"></div>
        
        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-2xl font-bold text-gray-800">Auto-Applying...</h2>
          <p className="text-gray-600">
            Sit back while we apply to jobs matching your criteria
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
            <div className="text-3xl font-bold text-primary-green">{appliedCount}</div>
            <div className="text-sm text-gray-600">Jobs Applied</div>
          </div>
        </div>
        
        <div className="flex justify-center relative z-10">
          <Button 
            onClick={onStop}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Stop Auto-Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoApplyAnimation;
