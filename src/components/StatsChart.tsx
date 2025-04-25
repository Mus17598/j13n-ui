import React, { useState } from 'react';
import { BarChart3, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatData {
  label: string;
  value: number;
  color: string;
}

interface StatsChartProps {
  stats: StatData[];
}

const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);
  const radius = 100;
  let currentAngle = 0;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-[12px] bg-white/50 hover:bg-white/70 border-white/30 transition-all"
              onClick={() => setIsOpen(true)}
            >
              <BarChart3 className="h-4 w-4 text-gray-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-white/80 backdrop-blur-md border-white/20">
            View Statistics
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl mx-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-0 p-8 w-full">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
                      Application Statistics
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Overview of your job applications</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100/80"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="relative w-[250px] h-[250px] flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 250 250">
                      {stats.map((stat, index) => {
                        const percentage = stat.value / total;
                        const angle = percentage * 360;
                        const startAngle = currentAngle;
                        currentAngle += angle;

                        const x1 = 125 + radius * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 125 + radius * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 125 + radius * Math.cos(((startAngle + angle) * Math.PI) / 180);
                        const y2 = 125 + radius * Math.sin(((startAngle + angle) * Math.PI) / 180);

                        const largeArcFlag = angle > 180 ? 1 : 0;

                        return (
                          <path
                            key={index}
                            d={`M 125 125 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={stat.color}
                            className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                          />
                        );
                      })}
                      <circle cx="125" cy="125" r="40" fill="white" className="opacity-90" />
                      <text x="125" y="125" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-gray-600">
                        {total}
                      </text>
                      <text x="125" y="145" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-400">
                        Total
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: `${stat.color}15` }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: stat.color }}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-600">
                            {stat.label}
                          </div>
                          <div className="text-2xl font-bold" style={{ color: stat.color }}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-400">
                            {Math.round((stat.value / total) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StatsChart; 