import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from '@/components/LoginScreen';
import ResumeUpload from '@/components/ResumeUpload';
import JobFilters from '@/components/JobFilters';
import StatusDashboard from '@/components/StatusDashboard';
import QAEditor from '@/components/QAEditor';
import RecentApplications from '@/components/RecentApplications';
import AutoApplyAnimation from '@/components/AutoApplyAnimation';
import AIChatBubble from '@/components/AIChatBubble';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const toggleAutoApply = () => {
    if (!isAutoApplying) {
      setAppliedCount(0);
    }
    setIsAutoApplying(!isAutoApplying);
  };
  
  useEffect(() => {
    if (isAutoApplying) {
      const interval = setInterval(() => {
        setAppliedCount(prev => prev + 1);
      }, 5000); // Increment counter every 5 seconds for demo
      
      return () => clearInterval(interval);
    }
  }, [isAutoApplying]);
  
  // Mock data for the status dashboard
  const applicationStats = {
    applied: 42,
    pending: 15,
    rejected: 8
  };
  
  const disabledSectionStyle = "pointer-events-none opacity-50 filter blur-[2px] transition-all duration-300";
  const tooltipMessage = "Auto-Applying in progress. Stop to edit.";
  
  if (!isLoggedIn) {
    return <LoginScreen onLoggedIn={handleLogin} />;
  }
  
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-b from-[#f0f2f5] to-white pb-32">
        <motion.header 
          className="frosted-panel m-4 p-6 rounded-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-blue">Job Apply Flow</h1>
              <p className="text-sleek-gray">Automated job applications for India & Canada</p>
            </div>
            <Button 
              onClick={toggleAutoApply}
              className={`micro-hover ${isAutoApplying 
                ? 'bg-destructive/10 hover:bg-destructive/20 text-destructive shadow-sm hover:shadow-destructive/10 border border-destructive/30' 
                : 'bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue border border-primary-blue/30 shadow-glass'}`}
            >
              {isAutoApplying ? 'Stop Auto-Apply' : 'Start Auto-Apply'}
              {!isAutoApplying ? <Zap className="ml-2 h-4 w-4" /> : null}
            </Button>
          </div>
        </motion.header>
        
        {/* Auto Apply Animation */}
        <AutoApplyAnimation 
          isActive={isAutoApplying} 
          onStop={toggleAutoApply}
          appliedCount={appliedCount}
        />
      </div>
      
      <main className="container mx-auto px-4 -mt-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className={isAutoApplying ? disabledSectionStyle : ""}
                    variants={sectionVariants}
                  >
                    <ResumeUpload />
                  </motion.div>
                </TooltipTrigger>
                {isAutoApplying && (
                  <TooltipContent className="bg-glass-background/90 backdrop-blur-sm border border-glass-border">
                    <p className="text-foreground/90">{tooltipMessage}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    className={isAutoApplying ? disabledSectionStyle : ""}
                    variants={sectionVariants}
                  >
                    <JobFilters />
                  </motion.div>
                </TooltipTrigger>
                {isAutoApplying && (
                  <TooltipContent className="bg-glass-background/90 backdrop-blur-sm border border-glass-border">
                    <p className="text-foreground/90">{tooltipMessage}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            <motion.div variants={sectionVariants}>
              <QAEditor />
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <motion.div variants={sectionVariants}>
              <StatusDashboard stats={applicationStats} />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <RecentApplications />
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
};

export default Index;
