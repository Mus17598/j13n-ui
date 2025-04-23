import React from 'react';
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";

type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

interface PersonalizedAvatarProps {
  gender?: Gender;
  className?: string;
}

const PersonalizedAvatar: React.FC<PersonalizedAvatarProps> = ({ gender, className }) => {
  // SVG markup for different avatar types
  const renderAvatar = () => {
    switch (gender) {
      case 'male':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-full w-full", className)}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
              fill="currentColor"
            />
            <path
              d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z"
              fill="currentColor"
            />
          </svg>
        );
      
      case 'female':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-full w-full", className)}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
              fill="currentColor"
            />
            <path
              d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z"
              fill="currentColor"
            />
            <path
              d="M12 4C11.5 4 11 4.1 10.5 4.3C11.3 4.8 11.9 5.6 12 6.5C12.1 5.6 12.7 4.8 13.5 4.3C13 4.1 12.5 4 12 4Z"
              fill="currentColor"
            />
          </svg>
        );
      
      case 'other':
      case 'prefer_not_to_say':
      default:
        return <User className={cn("h-full w-full", className)} />;
    }
  };

  return (
    <div className="relative h-full w-full">
      {renderAvatar()}
    </div>
  );
};

export default PersonalizedAvatar; 