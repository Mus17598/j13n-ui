
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SocialSignUpButtons from './auth/SocialSignUpButtons';
import SignUpForm from './auth/SignUpForm';
import AuthDivider from './auth/AuthDivider';

interface SignUpScreenProps {
  onSignedUp: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignedUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 animated-gradient"></div>
      
      <div className="frosted-panel w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Sign up to use JobCopilot</h1>
        </div>

        {signupError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{signupError}</AlertDescription>
          </Alert>
        )}

        {/* Social Sign-up Buttons */}
        <SocialSignUpButtons isLoading={isLoading} />

        <AuthDivider text="OR SIGNUP WITH EMAIL" />
        
        <SignUpForm 
          onSignedUp={onSignedUp}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setSignupError={setSignupError}
        />
        
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-green hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
