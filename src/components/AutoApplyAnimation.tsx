
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
        {/* Pulsing Rings Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] relative">
            {/* Pulsing Rings */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-primary-green/20"
                style={{
                  animation: `pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite ${i * 0.5}s`,
                }}
              />
            ))}
            
            {/* Company Icons */}
            <div className="absolute inset-0">
              {/* Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-16 h-16 bg-white rounded-2xl shadow-lg p-2 animate-float">
                <img src="/lovable-uploads/f51f73a2-2f39-49a6-b6e3-a80b6b34c300.png" alt="Company 1" className="w-full h-full object-contain opacity-20" />
              </div>
              {/* Right */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-8 w-16 h-16 bg-white rounded-2xl shadow-lg p-2 animate-float delay-100">
                <img src="/lovable-uploads/f51f73a2-2f39-49a6-b6e3-a80b6b34c300.png" alt="Company 2" className="w-full h-full object-contain opacity-20" />
              </div>
              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-16 h-16 bg-white rounded-2xl shadow-lg p-2 animate-float delay-200">
                <img src="/lovable-uploads/f51f73a2-2f39-49a6-b6e3-a80b6b34c300.png" alt="Company 3" className="w-full h-full object-contain opacity-20" />
              </div>
              {/* Left */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-8 w-16 h-16 bg-white rounded-2xl shadow-lg p-2 animate-float delay-300">
                <img src="/lovable-uploads/f51f73a2-2f39-49a6-b6e3-a80b6b34c300.png" alt="Company 4" className="w-full h-full object-contain opacity-20" />
              </div>
            </div>
            
            {/* Center Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary-green rounded-2xl shadow-lg p-4 animate-pulse">
              <img src="/lovable-uploads/f51f73a2-2f39-49a6-b6e3-a80b6b34c300.png" alt="Main Icon" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        
        {/* Content */}
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
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AutoApplyAnimation;
