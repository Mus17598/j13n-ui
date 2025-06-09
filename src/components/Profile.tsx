import React, { useRef, useState } from 'react';
import ProfileMetrics from './ProfileMetrics';

interface ProfileProps {
  profileImage?: string;
}

const insights = [
  { label: 'Applied', color: 'bg-gray-200 text-gray-700 hover:bg-gray-300' },
  { label: 'Interviews', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { label: 'Offers', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
];

const Profile: React.FC<ProfileProps> = ({ profileImage = '/default-avatar.png' }) => {
  const [image, setImage] = useState<string>(profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36 group mb-4">
        <img
          src={image || "/default-avatar.png"}
          alt="Profile"
          className="rounded-full w-36 h-36 object-cover border-4 border-gray-200 shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-avatar.png";
          }}
        />
        <button
          type="button"
          onClick={handleUploadClick}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Upload profile picture"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3m-6-6h.01M12 6v6" />
          </svg>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <h1 className="text-3xl font-bold mt-2">John Doe</h1>
      <p className="text-lg text-gray-600">Visual Designer at NALA Money</p>
      <div className="w-full mt-6 flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700 mb-2">Insights</span>
        <div className="flex flex-row gap-3 justify-center">
          {insights.map((item) => (
            <button
              key={item.label}
              className={`px-4 py-1 rounded-full font-medium shadow-sm transition ${item.color} focus:outline-none`}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <ProfileMetrics />
    </div>
  );
};

export default Profile;