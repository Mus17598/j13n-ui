
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import PersonalizedAvatar from '@/components/PersonalizedAvatar';
import { motion } from 'framer-motion';
import ImageUploader from '@/components/ImageUploader';
import { useToast } from "@/components/ui/use-toast";
import { UserSettingsDropdown } from '@/components/UserSettingsDropdown';
import { Button } from '@/components/ui/button';
import { Home, Upload } from 'lucide-react';

interface CandidateProfileProps {
  name?: string;
  email?: string;
  status?: 'applied' | 'pending' | 'rejected';
  avatarUrl?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  className?: string;
  bio?: string;
  location?: string;
  role?: string;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  name = 'Muskan Gupta',
  email = 'user@example.com',
  status = 'pending',
  avatarUrl,
  gender = 'prefer_not_to_say',
  className,
  bio = 'Always looking for new & innovative ways to share my art and design skills. I love nothing more than diving into a new project and getting my hands dirty.',
  location = 'San Francisco, CA',
  role = 'Likes Building Products'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | undefined>(avatarUrl);
  
  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setLocalAvatarUrl(url);
    
    toast({
      title: "Profile picture updated",
      description: "Your new profile picture has been set successfully.",
    });
  };

  const statusConfig = {
    applied: { color: '#8FE388', text: 'Applied', bg: 'bg-[#8FE388]/80' },
    pending: { color: '#74BBFB', text: 'Pending', bg: 'bg-[#74BBFB]/80' },
    rejected: { color: '#FF6B6B', text: 'Rejected', bg: 'bg-[#FF6B6B]/80' },
  };
  
  const getInitials = () => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const applicationStats = [
    { 
      label: 'Applied',
      value: '24',
      color: 'text-[#8FE388]',
      bgColor: 'bg-[#8FE388]/10',
      description: 'Total job applications submitted'
    },
    { 
      label: 'Interviews',
      value: '7',
      color: 'text-[#74BBFB]',
      bgColor: 'bg-[#74BBFB]/10',
      description: 'Interviews scheduled or completed'
    },
    { 
      label: 'Offers',
      value: '2',
      color: 'text-[#B487FB]',
      bgColor: 'bg-[#B487FB]/10',
      description: 'Job offers received'
    },
    { 
      label: 'Failed',
      value: '15',
      color: 'text-[#FF6B6B]',
      bgColor: 'bg-[#FF6B6B]/10',
      description: 'Applications rejected or expired'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center w-full px-8"
    >
      <div className="relative w-full">
        <div className="absolute top-0 right-0">
          <UserSettingsDropdown
            username={name}
            email={email}
            onLogout={() => navigate('/login')}
          />
        </div>
        
        <div className="flex flex-col items-center">
          <ImageUploader onImageSelect={handleImageSelect}>
            <div className="relative w-32 h-32">
              <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg">
                <AvatarImage src={localAvatarUrl} alt={name} />
                <AvatarFallback className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                  {!localAvatarUrl ? (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 leading-tight font-medium">Upload your picture</span>
                    </div>
                  ) : (
                    <PersonalizedAvatar gender={gender} />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
          </ImageUploader>

          <div className="mt-6 space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">{name}</h2>
            <p className="text-xl text-gray-500">{role}</p>
          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              {bio}
            </p>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <button 
              onClick={() => navigate('/profile')}
              className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              My Bento
            </button>
            
            <Button 
              onClick={() => navigate('/')}
              className="mt-4 bg-primary-green hover:bg-primary-green/90 text-white flex items-center justify-center gap-2"
              size="sm"
            >
              <Home size={16} />
              Landing Page
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateProfile;
