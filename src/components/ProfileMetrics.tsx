
import React from 'react';
import { ScrollArea } from "./ui/scroll-area";

const metrics = [
  { label: 'Applied', value: 12, color: '#9CA3AF' },
  { label: 'Interviews', value: 5, color: '#3B82F6' },
  { label: 'Offers', value: 2, color: '#10B981' },
];

const ProfileMetrics: React.FC = () => (
  <ScrollArea className="w-full">
    <div className="mt-6 grid grid-cols-3 gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="glassmorphism flex flex-col items-center justify-center p-3 rounded-2xl shadow-lg"
          style={{ borderColor: `${metric.color}40` }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: metric.color }}
          >
            {metric.value}
          </span>
          <span className="text-sm text-gray-600">{metric.label}</span>
        </div>
      ))}
    </div>
  </ScrollArea>
);

export default ProfileMetrics;
