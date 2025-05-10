import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/sonner';
import { storeAuthToken } from '@/utils/auth';

interface OAuthLoginButtonsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const OAuthLoginButtons: React.FC<OAuthLoginButtonsProps> = ({ 
  isLoading, 
  setIsLoading, 
  onSuccess 
}) => {
  const [oauthError, setOauthError] = useState<string | null>(null);

  const handleOAuthResponse = async (email: string, name: string, provider: string) => {
    setIsLoading(true);
    setOauthError(null);
    
    try {
      const response = await fetch('/api/auth/verify-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, provider }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Successful signup
        toast.success("Sign up successful!");
        if (data.token) {
          storeAuthToken(data.token);
          onSuccess();
        }
      } else if (response.status === 409) {
        // Email already in use
        setOauthError("Email already in use");
        toast.error("Email already in use");
      } else {
        // Other errors
        setOauthError(data.message || "Authentication failed");
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("OAuth verification error:", error);
      setOauthError("Authentication request failed");
      toast.error("Authentication request failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // For now, we'll keep the redirect approach as a fallback
    const googleAuth = window.open('http://localhost:3000/auth/google', '_blank', 'width=500,height=600');
    
    if (googleAuth) {
      const checkClosed = setInterval(() => {
        if (googleAuth.closed) {
          clearInterval(checkClosed);
          // We'll handle the authentication status in the callback page
        }
      }, 500);
    } else {
      toast.error("Popup blocked. Please allow popups for this site.");
    }
  };

  const handleLinkedInLogin = () => {
    // For now, we'll keep the redirect approach as a fallback
    const linkedInAuth = window.open('http://localhost:3000/auth/linkedin', '_blank', 'width=500,height=600');
    
    if (linkedInAuth) {
      const checkClosed = setInterval(() => {
        if (linkedInAuth.closed) {
          clearInterval(checkClosed);
          // We'll handle the authentication status in the callback page
        }
      }, 500);
    } else {
      toast.error("Popup blocked. Please allow popups for this site.");
    }
  };

  return (
    <div className="space-y-3">
      {oauthError && (
        <div className="text-sm text-red-500 mb-2">{oauthError}</div>
      )}
      
      <Button
        type="button"
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
        onClick={handleLinkedInLogin}
        disabled={isLoading}
      >
        <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
        Continue with LinkedIn
      </Button>
    </div>
  );
};

export default OAuthLoginButtons;
