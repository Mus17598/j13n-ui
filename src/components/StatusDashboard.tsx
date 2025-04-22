
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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
    { name: 'Applied', value: stats.applied, color: '#4AFF8F' }, // Neon green
    { name: 'Pending', value: stats.pending, color: '#FFE600' }, // Neon yellow
    { name: 'Rejected', value: stats.rejected, color: '#FF4A4A' }, // Neon red
  ];
  
  const total = stats.applied + stats.pending + stats.rejected;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Application Status</CardTitle>
        <CardDescription className="text-white/60">Overview of your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((item) => (
            <motion.div 
              key={item.name} 
              className="bg-dark-card/40 rounded-lg p-4 text-center border border-dark-border/50 backdrop-blur-sm"
              variants={itemVariants}
            >
              <motion.div 
                className="text-2xl font-bold" 
                style={{ color: item.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {item.value}
              </motion.div>
              <div className="text-sm text-white/70">{item.name}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.8}
                    stroke={entry.color}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} (${Math.round((value / total) * 100)}%)`, 'Applications']}
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  background: 'rgba(26, 26, 26, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
                itemStyle={{
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        
        <motion.div 
          className="flex justify-center space-x-6 mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.map((item) => (
            <motion.div 
              key={item.name} 
              className="flex items-center"
              variants={itemVariants}
            >
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}></div>
              <span className="text-sm text-white/70">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default StatusDashboard;
