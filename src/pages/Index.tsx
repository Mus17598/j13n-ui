import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobFilters from '@/components/JobFilters';
import QAEditor from '@/components/QAEditor';
import RecentApplications from '@/components/RecentApplications';
import AIChatBubble from '@/components/AIChatBubble';
import ProfileMenu from '@/components/ProfileMenu';
import JobReviewModal from '@/components/JobReviewModal';
import CandidateProfile from '@/components/CandidateProfile';
import FloatingActionBar from '@/components/FloatingActionBar';
import { useDocumentsStore } from '@/stores/useDocumentsStore';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import Profile from "@/components/Profile";

const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    url: 'https://example.com/job1',
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    url: 'https://example.com/job2',
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    url: 'https://example.com/job3',
  }
];

interface IndexProps {
  isLoggedIn: boolean;
}

const Index = ({ isLoggedIn }: IndexProps) => {
  const [isAutoApplying, setIsAutoApplying] = useState(false);
  const [appliedCount, setAppliedCount] = useState(0);
  const [showJobReview, setShowJobReview] = useState(false);
  const navigate = useNavigate();
  const [userEmail] = useState('user@example.com');
  const [accountType] = useState<'Free' | 'Premium'>('Free');
  const [userGender] = useState<'male' | 'female' | 'other' | 'prefer_not_to_say'>('prefer_not_to_say');
  const { uploadDocument } = useDocumentsStore();

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
    setShowJobReview(true);
  };

  const handleJobReviewConfirm = (confirmedJobs: typeof mockJobs) => {
    setShowJobReview(false);
    setAppliedCount(0);
    setIsAutoApplying(true);
  };
  
  const stopAutoApply = () => {
    setIsAutoApplying(false);
  };

  const handleUploadResume = () => {
    document.getElementById('resume-upload')?.click();
  };

  const handleUploadCoverLetter = () => {
    document.getElementById('cover-letter-upload')?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadDocument(type, files[0]);
    }
    e.target.value = '';
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 font-sans">
      <main className="container mx-auto h-full py-6 px-4">
        <motion.div 
          className="grid grid-cols-12 gap-6 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Left Column - Fixed, doesn't scroll */}
          <div className="col-span-12 md:col-span-3 h-full flex items-start pt-8">
            <div className="w-full">
              <Profile />
            </div>
          </div>
          
          {/* Right Column - Scrollable content */}
          <div className="col-span-12 md:col-span-9 h-full overflow-hidden">
            <ScrollArea className="h-full pr-2">
              <div className="grid grid-cols-1 gap-6 pb-6">
                <Card className="shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl p-5">
                  <ScrollArea className="max-h-[300px]">
                    <JobFilters />
                  </ScrollArea>
                </Card>
                
                <Card className="shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl p-5">
                  <ScrollArea className="max-h-[400px]">
                    <QAEditor />
                  </ScrollArea>
                </Card>
                
                <Card className="shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl p-5">
                  <ScrollArea className="max-h-[400px]">
                    <RecentApplications />
                  </ScrollArea>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      </main>

      <FloatingActionBar
        onUploadResume={handleUploadResume}
        onUploadCoverLetter={handleUploadCoverLetter}
        onAutoApply={startAutoApplyFlow}
        isAutoApplying={isAutoApplying}
        appliedCount={appliedCount}
      />
      
      <AIChatBubble />
      
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        accept=".pdf,.docx"
        onChange={(e) => handleFileChange(e, 'resume')}
      />
      <input
        type="file"
        id="cover-letter-upload"
        className="hidden"
        accept=".pdf,.docx"
        onChange={(e) => handleFileChange(e, 'coverLetter')}
      />
      
      {showJobReview && (
        <JobReviewModal
          initialJobs={mockJobs}
          isOpen={showJobReview}
          onClose={() => setShowJobReview(false)}
          onConfirm={handleJobReviewConfirm}
        />
      )}
    </div>
  );
};

export default Index;
