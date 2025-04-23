
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from '@/components/LoginScreen';
import JobFilters from '@/components/JobFilters';
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
import UserProfileCard from '@/components/UserProfileCard';
import QACard from '@/components/QACard';
import StatusDashboard from '@/components/StatusDashboard';
import ResumeUploadCard from '@/components/ResumeUploadCard';
import RecentJobsCard from '@/components/RecentJobsCard';

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

// Sample QA data
const mockQuestions = [
  {
    id: '1',
    question: 'What makes you a good fit for this position?',
    answer: 'My experience in building scalable web applications and my strong problem-solving skills make me well-suited for this role. I have a track record of delivering projects on time and collaborating effectively with cross-functional teams.',
    status: 'answered' as const
  },
  {
    id: '2',
    question: 'Describe a challenging project you worked on and how you overcame obstacles.',
    answer: 'In my previous role, I led the migration of a legacy system to a modern architecture. We faced numerous technical challenges, but by breaking the project into manageable phases and maintaining clear communication, we successfully completed the migration ahead of schedule.',
    status: 'answered' as const
  },
  {
    id: '3',
    question: 'How would you handle a situation where project requirements change mid-development?',
    answer: '',
    status: 'failed' as const
  },
  {
    id: '4',
    question: 'What are your salary expectations?',
    answer: '',
    status: 'failed' as const
  }
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

  // Application stats for visualization
  const applicationStats = {
    applied: 156,
    pending: 68,
    rejected: 42
  };
  
  // User profile stats
  const profileStats = {
    applied: 156,
    interviews: 24,
    offers: 8,
    rejected: 42
  };
  
  const disabledSectionStyle = "opacity-50 pointer-events-none cursor-not-allowed";
  const tooltipMessage = "This section is disabled while auto-applying is active";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={startAutoApplyFlow}
              className="bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 text-white"
              disabled={isAutoApplying}
            >
              Start Auto-Apply
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <ProfileMenu 
              userEmail={userEmail}
              accountType={accountType}
              onLogout={handleLogout}
              gender={userGender}
            />
          </div>
        </div>
      </header>
      
      {/* Auto Apply Animation - Positioned at the top */}
      <div className="container mx-auto px-4 mb-6 pt-6">
        <AutoApplyAnimation 
          isActive={isAutoApplying} 
          onStop={stopAutoApply}
          appliedCount={appliedCount}
        />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Top Row: Profile and QA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <UserProfileCard 
            userName="John Doe"
            stats={profileStats}
          />
          <QACard questions={mockQuestions} />
        </div>
        
        {/* Middle Row: Stats and Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`col-span-1 ${isAutoApplying ? disabledSectionStyle : ''}`}>
                  <JobFilters />
                </div>
              </TooltipTrigger>
              {isAutoApplying && <TooltipContent>{tooltipMessage}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
          
          <div className="col-span-2">
            <StatusDashboard stats={applicationStats} />
          </div>
        </div>
        
        {/* Bottom Row: Resume Upload */}
        <div className="mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={isAutoApplying ? disabledSectionStyle : ''}>
                  <ResumeUploadCard />
                </div>
              </TooltipTrigger>
              {isAutoApplying && <TooltipContent>{tooltipMessage}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Recent Jobs (Scrollable) */}
        <div>
          <RecentJobsCard />
        </div>
      </main>
      
      <AIChatBubble />
      
      {showJobReview && (
        <JobReviewModal
          initialJobs={mockJobs}
          onClose={() => setShowJobReview(false)}
          onConfirm={handleJobReviewConfirm}
        />
      )}
    </div>
  );
};

export default Index;
