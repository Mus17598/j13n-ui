import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from '@/components/LoginScreen';
import ResumeUpload from '@/components/ResumeUpload';
import JobFilters from '@/components/JobFilters';
import StatusDashboard from '@/components/StatusDashboard';
import QAEditor from '@/components/QAEditor';
import RecentApplications from '@/components/RecentApplications';
import AutoApplyAnimation from '@/components/AutoApplyAnimation';
import AIChatBubble from '@/components/AIChatBubble';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProfileMenu from '@/components/ProfileMenu';
import JobReviewModal from '@/components/JobReviewModal';

interface IndexProps {
  isLoggedIn: boolean;
}

// Mock job data - replace with actual API call
const mockJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    url: 'https://example.com/job1',
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Startup Inc',
    url: 'https://example.com/job2',
  },
  {
    id: '3',
    title: 'Frontend Engineer',
    company: 'Design Co',
    url: 'https://example.com/job3',
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'Cloud Systems Ltd',
    url: 'https://example.com/job4',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Infrastructure Solutions',
    url: 'https://example.com/job5',
  },
  {
    id: '6',
    title: 'React Developer',
    company: 'Web Innovations',
    url: 'https://example.com/job6',
  },
  {
    id: '7',
    title: 'Software Developer',
    company: 'Global Tech Solutions',
    url: 'https://example.com/job7',
  },
  {
    id: '8',
    title: 'Node.js Developer',
    company: 'Backend Systems Inc',
    url: 'https://example.com/job8',
  },
  {
    id: '9',
    title: 'Full Stack Engineer',
    company: 'Digital Products Co',
    url: 'https://example.com/job9',
  },
  {
    id: '10',
    title: 'Senior Frontend Developer',
    company: 'UX Masters',
    url: 'https://example.com/job10',
  },
  {
    id: '11',
    title: 'Software Engineer II',
    company: 'Enterprise Solutions',
    url: 'https://example.com/job11',
  },
  {
    id: '12',
    title: 'JavaScript Developer',
    company: 'Web Platform Inc',
    url: 'https://example.com/job12',
  },
  {
    id: '13',
    title: 'Full Stack JavaScript Developer',
    company: 'Modern Apps Co',
    url: 'https://example.com/job13',
  },
  {
    id: '14',
    title: 'Senior Backend Engineer',
    company: 'Data Systems Ltd',
    url: 'https://example.com/job14',
  },
  {
    id: '15',
    title: 'Cloud Engineer',
    company: 'Cloud Native Solutions',
    url: 'https://example.com/job15',
  },
  {
    id: '16',
    title: 'TypeScript Developer',
    company: 'Code Quality Inc',
    url: 'https://example.com/job16',
  },
  {
    id: '17',
    title: 'Software Architect',
    company: 'Architecture Solutions',
    url: 'https://example.com/job17',
  },
  {
    id: '18',
    title: 'API Developer',
    company: 'Integration Systems',
    url: 'https://example.com/job18',
  },
  {
    id: '19',
    title: 'Frontend Architect',
    company: 'UI Systems Co',
    url: 'https://example.com/job19',
  },
  {
    id: '20',
    title: 'Full Stack Team Lead',
    company: 'Tech Leadership Inc',
    url: 'https://example.com/job20',
  },
];

const Index = ({ isLoggedIn }: IndexProps) => {
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);
  const [showJobReview, setShowJobReview] = useState(false);
  const navigate = useNavigate();
  const [userEmail] = useState('user@example.com'); // This would come from your auth system
  const [accountType] = useState<'Free' | 'Premium'>('Free');
  const [userGender] = useState<'male' | 'female' | 'other' | 'prefer_not_to_say'>('prefer_not_to_say'); // This would come from user profile data
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const startAutoApplyFlow = () => {
    // Show the job review modal before starting auto-apply
    setShowJobReview(true);
  };

  const handleJobReviewConfirm = (confirmedJobs: typeof mockJobs) => {
    setShowJobReview(false);
    setAppliedCount(0);
    setIsAutoApplying(true);
    // TODO: Use the confirmedJobs array for the actual auto-apply process
    console.log('Starting auto-apply with jobs:', confirmedJobs);
  };
  
  const stopAutoApply = () => {
    setIsAutoApplying(false);
  };
  
  useEffect(() => {
    if (isAutoApplying) {
      const interval = setInterval(() => {
        setAppliedCount(count => {
          if (count >= 20) {
            clearInterval(interval);
            setIsAutoApplying(false);
            return count;
          }
          return count + 1;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isAutoApplying]);
  
  const applicationStats = {
    totalApplications: 156,
    responseRate: 68,
    interviewRate: 42,
    offerRate: 15
  };
  
  const disabledSectionStyle = "opacity-50 pointer-events-none cursor-not-allowed";
  const tooltipMessage = "This section is disabled while auto-applying is active";
  
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={startAutoApplyFlow}
              className="bg-primary-green hover:bg-primary-green/90"
              disabled={isAutoApplying}
            >
              Start Auto-Apply
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <ProfileMenu 
              userEmail={userEmail}
              accountType={accountType}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>
      
      {/* Auto Apply Animation - Positioned at the top */}
      <div className="container mx-auto px-4 mb-6">
        <AutoApplyAnimation 
          isActive={isAutoApplying} 
          onStop={stopAutoApply}
          appliedCount={appliedCount}
        />
      </div>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={isAutoApplying ? disabledSectionStyle : ''}>
                    <ResumeUpload />
                  </div>
                </TooltipTrigger>
                {isAutoApplying && <TooltipContent>{tooltipMessage}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={isAutoApplying ? disabledSectionStyle : ''}>
                    <JobFilters />
                  </div>
                </TooltipTrigger>
                {isAutoApplying && <TooltipContent>{tooltipMessage}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-6 lg:col-span-2">
            <StatusDashboard stats={applicationStats} />
            <QAEditor />
            <RecentApplications />
          </div>
        </div>
      </main>
      
      <AIChatBubble />
      
      {showJobReview && (
        <JobReviewModal
          jobs={mockJobs}
          onClose={() => setShowJobReview(false)}
          onConfirm={handleJobReviewConfirm}
        />
      )}
    </div>
  );
};

export default Index;
