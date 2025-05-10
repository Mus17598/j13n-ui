
import React from 'react';
import { Button } from "@/components/ui/button";

interface SocialSignUpButtonsProps {
  isLoading: boolean;
}

const SocialSignUpButtons: React.FC<SocialSignUpButtonsProps> = ({ isLoading }) => {
  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLinkedInSignUp = () => {
    window.location.href = 'http://localhost:3000/auth/linkedin';
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
        onClick={handleLinkedInSignUp}
        disabled={isLoading}
      >
        <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
        Continue with LinkedIn
      </Button>
    </div>
  );
};

export default SocialSignUpButtons;
