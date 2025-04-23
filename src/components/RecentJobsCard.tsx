
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  date: string;
  status: 'applied' | 'pending' | 'rejected' | 'interview' | 'offer';
}

const RecentJobsCard: React.FC = () => {
  // Sample data
  const recentJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      date: 'Apr 18, 2025',
      status: 'applied'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'DataSys Inc.',
      date: 'Apr 15, 2025',
      status: 'pending'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'CloudNet',
      date: 'Apr 12, 2025',
      status: 'rejected'
    },
    {
      id: '4',
      title: 'UI/UX Developer',
      company: 'InnovateTech',
      date: 'Apr 10, 2025',
      status: 'interview'
    },
    {
      id: '5',
      title: 'Frontend Engineer',
      company: 'GlobalSoft',
      date: 'Apr 08, 2025',
      status: 'offer'
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-400 hover:bg-blue-500';
      case 'pending': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'rejected': return 'bg-red-400 hover:bg-red-500';
      case 'interview': return 'bg-purple-400 hover:bg-purple-500';
      case 'offer': return 'bg-green-400 hover:bg-green-500';
      default: return 'bg-gray-400 hover:bg-gray-500';
    }
  };

  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
          Recent Applications
        </CardTitle>
        <Button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex space-x-4" style={{ minWidth: '100%' }}>
            {recentJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white/70 p-4 rounded-xl shadow-sm flex flex-col w-72 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                  </div>
                  <Badge className={`${getStatusColor(job.status)} text-white`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="font-semibold mt-2">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <div className="text-xs text-gray-500 mt-2">Applied: {job.date}</div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="text-xs">View Resume</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Cover Letter</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Since we're using this button inside the component
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'ghost' | 'default'; size?: 'sm' | 'default' }> = ({ 
  children, 
  className, 
  variant = 'default',
  size = 'default',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";
  const variantClasses = variant === 'ghost' 
    ? "hover:bg-accent hover:text-accent-foreground" 
    : "bg-primary text-primary-foreground hover:bg-primary/90";
  const sizeClasses = size === 'sm' ? "h-8 px-3 text-xs" : "h-10 px-4 py-2";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default RecentJobsCard;
