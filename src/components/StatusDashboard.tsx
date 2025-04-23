
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
    { name: 'Pending', value: stats.pending, color: '#FFD166' },
    { name: 'Rejected', value: stats.rejected, color: '#EF6F6C' },
  ];
  
  const total = stats.applied + stats.pending + stats.rejected;
  
  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">Application Status</CardTitle>
        <CardDescription>Overview of your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.map((item) => (
            <div key={item.name} className="bg-white/60 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.name}</div>
            </div>
          ))}
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} (${Math.round((value / total) * 100)}%)`, 'Applications']}
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center space-x-6 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDashboard;
