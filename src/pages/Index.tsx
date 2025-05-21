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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 font-sans">
      <main className="container mx-auto px-4 py-6 h-[calc(100vh)]">
        <motion.div 
          className="grid grid-cols-12 gap-6 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col-span-12 md:col-span-3 sticky top-6">
            <CandidateProfile 
              name="John Doe"
              email={userEmail}
              status="applied"
              gender={userGender}
              className="bg-transparent text-2xl"
            />
          </div>
          
          <div className="col-span-12 md:col-span-9 space-y-6 overflow-y-auto pr-4 max-h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 gap-6">
              <JobFilters />
              <QAEditor />
              <RecentApplications />
            </div>
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
