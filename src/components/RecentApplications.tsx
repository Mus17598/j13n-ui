
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

interface Application {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  resumeVersion: string;
  coverLetterVersion: string;
  status: 'applied' | 'pending' | 'rejected';
}

const RecentApplications: React.FC = () => {
  const applications: Application[] = [
    {
      id: '1',
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      appliedDate: '2025-04-18T14:30:00Z',
      resumeVersion: 'Resume_v2.pdf',
      coverLetterVersion: 'CL_TechCorp_v1.pdf',
      status: 'applied'
    },
    {
      id: '2',
      company: 'DataSys Inc.',
      position: 'Full Stack Developer',
      appliedDate: '2025-04-15T09:45:00Z',
      resumeVersion: 'Resume_v2.pdf',
      coverLetterVersion: 'CL_DataSys_v1.pdf',
      status: 'pending'
    },
    {
      id: '3',
      company: 'CloudNet',
      position: 'React Developer',
      appliedDate: '2025-04-12T11:20:00Z',
      resumeVersion: 'Resume_v1.pdf',
      coverLetterVersion: 'CL_CloudNet_v1.pdf',
      status: 'rejected'
    },
    {
      id: '4',
      company: 'InnovateTech',
      position: 'UI/UX Developer',
      appliedDate: '2025-04-10T16:15:00Z',
      resumeVersion: 'Resume_v1.pdf',
      coverLetterVersion: 'CL_InnovateTech_v1.pdf',
      status: 'applied'
    },
    {
      id: '5',
      company: 'GlobalSoft',
      position: 'Frontend Engineer',
      appliedDate: '2025-04-08T13:40:00Z',
      resumeVersion: 'Resume_v1.pdf',
      coverLetterVersion: 'CL_GlobalSoft_v1.pdf',
      status: 'pending'
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue border border-primary-blue/30';
      case 'pending': return 'bg-primary-lavender/20 hover:bg-primary-lavender/30 text-primary-lavender border border-primary-lavender/30';
      case 'rejected': return 'bg-red-300/20 hover:bg-red-300/30 text-red-400 border border-red-300/30';
      default: return 'bg-white/10 hover:bg-white/20 text-foreground/70 border border-white/20';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {applications.map((app) => (
            <motion.div 
              key={app.id} 
              className="bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-colors border border-glass-border backdrop-blur-sm shadow-glass micro-hover"
              variants={itemVariants}
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <h3 className="font-medium text-foreground">{app.position}</h3>
                  <p className="text-sleek-gray text-sm">{app.company}</p>
                </div>
                <Badge className={`${getStatusColor(app.status)}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex flex-wrap justify-between items-center text-sm">
                <div className="text-sleek-gray flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-sleek-gray" />
                  Applied: {formatDate(app.appliedDate)}
                </div>
                
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button className="flex items-center text-sleek-gray hover:text-primary-blue transition-colors group">
                    <FileText className="h-4 w-4 mr-1 group-hover:text-primary-blue transition-colors" />
                    <span>Resume</span>
                    <Download className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-primary-blue" />
                  </button>
                  <button className="flex items-center text-sleek-gray hover:text-primary-blue transition-colors group">
                    <FileText className="h-4 w-4 mr-1 group-hover:text-primary-blue transition-colors" />
                    <span>Cover Letter</span>
                    <Download className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-primary-blue" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
