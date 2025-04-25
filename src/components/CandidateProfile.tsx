import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import PersonalizedAvatar from '@/components/PersonalizedAvatar';
import { motion } from 'framer-motion';

interface CandidateProfileProps {
  name?: string;
  email?: string;
  status?: 'applied' | 'pending' | 'rejected';
  avatarUrl?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  name = 'John Doe',
  email = 'user@example.com',
  status = 'pending',
  avatarUrl,
  gender = 'prefer_not_to_say',
}) => {
  const navigate = useNavigate();
  
  const statusConfig = {
    applied: { color: '#8FE388', text: 'Applied', bg: 'bg-primary-green/80' },
    pending: { color: '#FFD166', text: 'Pending', bg: 'bg-yellow-400/80' },
    rejected: { color: '#EF6F6C', text: 'Rejected', bg: 'bg-red-400/80' },
  };
  
  const getInitials = () => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-gray-200 text-gray-700 text-xl">
            {avatarUrl ? null : (
              <PersonalizedAvatar gender={gender} />
            )}
            {!avatarUrl && !gender && getInitials()}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mt-1">{email}</p>
        
        <Badge className={`mt-3 px-3 py-1 ${statusConfig[status].bg} text-white`}>
          {statusConfig[status].text}
        </Badge>
      </div>
      
      <div className="pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Application Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Applied</span>
            <span className="text-sm font-medium">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Interviews</span>
            <span className="text-sm font-medium">7</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Offers</span>
            <span className="text-sm font-medium">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Acceptance Rate</span>
            <span className="text-sm font-medium">28.5%</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/profile')}
        className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg text-sm text-gray-700 flex items-center justify-center"
      >
        Edit Profile
      </button>
    </motion.div>
  );
};

export default CandidateProfile;
