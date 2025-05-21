import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

interface Stat {
  label: string;
  value: string;
  color: string;
  bgColor: string;
  description?: string;
}

interface StatsDropdownProps {
  stats: Stat[];
}

export const StatsDropdown: React.FC<StatsDropdownProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-gray-100/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BarChart3 className="h-4 w-4" />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50"
            >
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Application Statistics</h3>
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div key={index} className={`${stat.bgColor} rounded-lg p-3`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                        <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                      {stat.description && (
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 