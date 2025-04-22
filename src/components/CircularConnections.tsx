
import React from 'react';
import { motion } from 'framer-motion';

interface CircularConnectionsProps {
  isActive: boolean;
}

const CircularConnections: React.FC<CircularConnectionsProps> = ({ isActive }) => {
  const platforms = [
    { icon: "🌐", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-24" },
    { icon: "💼", position: "top-8 right-8 -translate-y-12" },
    { icon: "📊", position: "bottom-8 right-8 translate-y-12" },
    { icon: "📝", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-24" },
    { icon: "💡", position: "bottom-8 left-8 translate-y-12" },
    { icon: "🔍", position: "top-8 left-8 -translate-y-12" },
  ];

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="relative w-64 h-64">
        {/* Center Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-neon-green/5 flex items-center justify-center shadow-neon">
            <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center text-2xl">
                ⚡️
              </div>
            </div>
          </div>
        </div>

        {/* Circular Paths */}
        <div className="absolute inset-0">
          <div className="absolute inset-4 rounded-full border border-neon-green/10 animate-[spin_8s_linear_infinite] shadow-neon" />
          <div className="absolute inset-8 rounded-full border border-neon-green/20 animate-[spin_12s_linear_infinite] shadow-neon" />
          <div className="absolute inset-12 rounded-full border border-neon-green/30 animate-[spin_16s_linear_infinite] shadow-neon" />
        </div>

        {/* Platform Icons */}
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={`absolute ${platform.position} animate-pulse`}
          >
            <div className="w-10 h-10 rounded-full bg-dark-card shadow-neon border border-dark-border flex items-center justify-center text-xl">
              {platform.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularConnections;
