import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

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
      case 'applied': return 'bg-primary-green/90 hover:bg-primary-green';
      case 'pending': return 'bg-yellow-400/90 hover:bg-yellow-400';
      case 'rejected': return 'bg-red-500/90 hover:bg-red-500';
      default: return 'bg-gray-500/90 hover:bg-gray-500';
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {applications.map((app) => (
            <div 
              key={app.id} 
              className="bg-white/70 rounded-lg p-4 hover:bg-white/90 transition-colors"
            >
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <h3 className="font-medium text-gray-800">{app.position}</h3>
                  <p className="text-gray-600 text-sm">{app.company}</p>
                </div>
                <Badge className={`${getStatusColor(app.status)} text-white`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex flex-wrap justify-between items-center text-sm">
                <div className="text-gray-500">
                  Applied: {formatDate(app.appliedDate)}
                </div>
                
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button className="flex items-center text-gray-600 hover:text-gray-900 group">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Resume</span>
                    <Download className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="flex items-center text-gray-600 hover:text-gray-900 group">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Cover Letter</span>
                    <Download className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
