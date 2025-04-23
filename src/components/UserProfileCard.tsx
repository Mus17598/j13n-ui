
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCheck, Calendar, MessageCircle, Award } from 'lucide-react';

interface UserProfileCardProps {
  userName: string;
  avatarUrl?: string;
  stats: {
    applied: number;
    interviews: number;
    offers: number;
    rejected: number;
  }
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userName, avatarUrl, stats }) => {
  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl h-full">
      <CardHeader className="flex flex-col items-center pb-2">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-gradient-to-br from-yellow-300 via-purple-300 to-blue-300 text-white text-xl">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-lg">{userName}</h2>
        <p className="text-sm text-gray-500">Job Seeker</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center bg-white/60 p-3 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-2 rounded-full mb-1">
              <FileCheck className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-lg font-semibold">{stats.applied}</span>
            <span className="text-xs text-gray-500">Applied</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/60 p-3 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-2 rounded-full mb-1">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-lg font-semibold">{stats.interviews}</span>
            <span className="text-xs text-gray-500">Interviews</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/60 p-3 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-2 rounded-full mb-1">
              <Award className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-lg font-semibold">{stats.offers}</span>
            <span className="text-xs text-gray-500">Offers</span>
          </div>
          
          <div className="flex flex-col items-center bg-white/60 p-3 rounded-xl hover:shadow-md transition-shadow">
            <div className="bg-red-100 p-2 rounded-full mb-1">
              <MessageCircle className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-lg font-semibold">{stats.rejected}</span>
            <span className="text-xs text-gray-500">Rejected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
