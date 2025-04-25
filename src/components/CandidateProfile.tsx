
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import PersonalizedAvatar from '@/components/PersonalizedAvatar';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="frosted-panel border-none overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Avatar className="w-20 h-20 ring-4 ring-white/30 shadow-lg">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-gradient-to-br from-[#D6BCFA] to-[#9b87f5] text-white text-xl">
                  {avatarUrl ? null : (
                    <PersonalizedAvatar gender={gender} />
                  )}
                  {!avatarUrl && !gender && getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <Badge className={`${statusConfig[status].bg} text-white px-2 text-xs font-medium`}>
                  {statusConfig[status].text}
                </Badge>
              </div>
            </div>
            
            <h2 className="text-xl font-urbanist font-semibold text-gray-800 mt-3">{name}</h2>
            <p className="text-sm text-gray-500 font-urbanist">{email}</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 font-urbanist">Application Stats</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Applied</span>
                  <span className="text-sm font-medium bg-[#8FE388]/10 text-[#8FE388] px-2 py-0.5 rounded">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Interviews</span>
                  <span className="text-sm font-medium bg-[#74BBFB]/10 text-[#74BBFB] px-2 py-0.5 rounded">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Offers</span>
                  <span className="text-sm font-medium bg-[#B487FB]/10 text-[#B487FB] px-2 py-0.5 rounded">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Acceptance Rate</span>
                  <span className="text-sm font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded">28.5%</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/profile')}
            className="w-full py-2 px-3 bg-white/50 hover:bg-white/70 transition-colors rounded-xl text-sm text-gray-700 font-medium flex items-center justify-center border border-white/30 backdrop-blur-sm"
          >
            Edit Profile
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CandidateProfile;
