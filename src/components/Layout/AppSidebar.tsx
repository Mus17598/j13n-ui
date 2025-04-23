
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCheck, Calendar, MessageCircle, Award } from 'lucide-react';

interface AppSidebarProps {
  userName: string;
  avatarUrl?: string;
  stats: {
    applied: number;
    interviews: number;
    offers: number;
    rejected: number;
  }
}

const AppSidebar = ({ userName, avatarUrl, stats }: AppSidebarProps) => {
  return (
    <aside className="sticky top-6 left-0 max-w-xs bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="bg-gradient-to-br from-yellow-300 via-purple-300 to-blue-300 text-white text-2xl">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {userName}
        </h2>
      </div>
      
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
    </aside>
  );
};

export default AppSidebar;
