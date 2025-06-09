
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from 'lucide-react';
import PersonalizedAvatar from '@/components/PersonalizedAvatar';
import ImageUploader from '@/components/ImageUploader';
import { useToast } from "@/components/ui/use-toast";
import ProfileMetrics from '@/components/ProfileMetrics';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | undefined>();
  
  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setLocalAvatarUrl(url);
    
    toast({
      title: "Profile picture updated",
      description: "Your new profile picture has been set successfully.",
    });
  };

  return (
    <div className="flex flex-col items-center text-center w-full">
      <ImageUploader onImageSelect={handleImageSelect}>
        <div className="relative w-24 h-24 mb-4">
          <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
            <AvatarImage src={localAvatarUrl} alt="Muskan Gupta" />
            <AvatarFallback className="bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              {!localAvatarUrl ? (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-[10px] text-gray-500 leading-tight font-medium">Upload</span>
                </div>
              ) : (
                <PersonalizedAvatar gender="prefer_not_to_say" />
              )}
            </AvatarFallback>
          </Avatar>
        </div>
      </ImageUploader>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900">Muskan Gupta</h2>
        <p className="text-sm text-gray-500">Likes Building Products</p>
      </div>

      <ProfileMetrics />
    </div>
  );
};

export default Profile;
