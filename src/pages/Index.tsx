
import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import ResumeUpload from '@/components/ResumeUpload';
import JobFilters from '@/components/JobFilters';
import StatusDashboard from '@/components/StatusDashboard';
import QAEditor from '@/components/QAEditor';
import RecentApplications from '@/components/RecentApplications';
import AutoApplyAnimation from '@/components/AutoApplyAnimation';
import AIChatBubble from '@/components/AIChatBubble';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const toggleAutoApply = () => {
    setIsAutoApplying(!isAutoApplying);
  };
  
  // Mock data for the status dashboard
  const applicationStats = {
    applied: 42,
    pending: 15,
    rejected: 8
  };
  
  if (!isLoggedIn) {
    return <LoginScreen onLoggedIn={handleLogin} />;
  }
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="frosted-panel m-4 p-6 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Job Apply Flow</h1>
            <p className="text-gray-600">Automated job applications for India & Canada</p>
          </div>
          <Button 
            onClick={toggleAutoApply}
            className={`${isAutoApplying ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-green hover:bg-primary-green/90'} text-white`}
          >
            {isAutoApplying ? 'Stop Auto-Apply' : 'Start Auto-Apply'}
            {!isAutoApplying && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ResumeUpload />
            <JobFilters />
            <QAEditor />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <StatusDashboard stats={applicationStats} />
            <RecentApplications />
          </div>
        </div>
      </main>
      
      {/* Auto Apply Animation */}
      {isAutoApplying && (
        <AutoApplyAnimation 
          isActive={isAutoApplying} 
          onStop={toggleAutoApply} 
        />
      )}
      
      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
};

export default Index;
