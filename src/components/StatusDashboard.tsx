
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from 'framer-motion';

interface StatusDashboardProps {
  stats: {
    applied: number;
    pending: number;
    rejected: number;
  };
}

const StatusDashboard: React.FC<StatusDashboardProps> = ({ stats }) => {
  const data = [
    { name: 'Applied', value: stats.applied, color: '#8FE388' },
    { name: 'In Progress', value: stats.pending, color: '#74BBFB' },
    { name: 'Failed', value: stats.rejected, color: '#FF6B6B' },
    { name: 'Success', value: Math.round(stats.applied * 0.3), color: '#B487FB' },
  ];
  
  const applicationData = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interviews', value: 7 },
    { name: 'Offers', value: 2 },
  ];
  
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="frosted-panel h-full overflow-hidden border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-urbanist font-semibold text-gray-800">Application Status</CardTitle>
          <CardDescription className="text-gray-500 font-urbanist">Real-time application insights</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {data.map((item) => (
              <div key={item.name} className="bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-sm">
                <div className="text-xl sm:text-2xl font-bold" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 sm:h-56">
              <p className="text-sm text-gray-500 mb-2 font-medium">Application Distribution</p>
              <ChartContainer
                config={{
                  Applied: { color: '#8FE388' },
                  'In Progress': { color: '#74BBFB' },
                  Failed: { color: '#FF6B6B' },
                  Success: { color: '#B487FB' },
                }}
                className="h-full"
              >
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="rgba(255, 255, 255, 0.5)"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            
            <div className="h-48 sm:h-56">
              <p className="text-sm text-gray-500 mb-2 font-medium">Application Journey</p>
              <ChartContainer
                config={{
                  Applied: { color: '#8FE388' },
                  Interviews: { color: '#74BBFB' },
                  Offers: { color: '#B487FB' },
                }}
                className="h-full"
              >
                <BarChart data={applicationData} margin={{ top: 10, right: 10, bottom: 10, left: -15 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis hide={true} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {applicationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#8FE388' : index === 1 ? '#74BBFB' : '#B487FB'} />
                    ))}
                  </Bar>
                  <Tooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatusDashboard;
