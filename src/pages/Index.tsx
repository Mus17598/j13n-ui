import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobFilters from '@/components/JobFilters';
import AutoApplyAnimation from '@/components/AutoApplyAnimation';
import AIChatBubble from '@/components/AIChatBubble';
import JobReviewModal from '@/components/JobReviewModal';
import StatusDashboard from '@/components/StatusDashboard';
import RecentJobsCard from '@/components/RecentJobsCard';
import AppSidebar from '@/components/Layout/AppSidebar';
import FloatingActionBanner from '@/components/Layout/FloatingActionBanner';

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

  const handleResumeUpload = () => {
    document.getElementById('resume-upload')?.click();
  };
  
  const handleCoverLetterUpload = () => {
    document.getElementById('cover-letter-upload')?.click();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <AppSidebar
            userName="John Doe"
            stats={profileStats}
          />
          
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Top Filters Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6">
              <JobFilters />
            </div>
            
            {/* Auto Apply Animation */}
            <AutoApplyAnimation 
              isActive={isAutoApplying} 
              onStop={stopAutoApply}
              appliedCount={appliedCount}
            />
            
            {/* Stats Dashboard */}
            <StatusDashboard stats={applicationStats} />
            
            {/* Recent Jobs */}
            <RecentJobsCard />
          </div>
        </div>
      </div>
      
      {/* Hidden File Inputs */}
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      <input
        type="file"
        id="cover-letter-upload"
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
      
      {/* Floating Action Banner */}
      <FloatingActionBanner
        onAutoApplyClick={startAutoApplyFlow}
        onResumeUpload={handleResumeUpload}
        onCoverLetterUpload={handleCoverLetterUpload}
      />
      
      {/* Chat Bubble */}
      <AIChatBubble />
      
      {/* Job Review Modal */}
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
