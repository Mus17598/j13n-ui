import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { authService } from '../services/auth.service';

interface SignUpScreenProps {
  onSignedUp: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignedUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const authResponse = await authService.loginWithGoogle(tokenResponse.access_token);
        // Store the token in localStorage or your preferred state management solution
        localStorage.setItem('token', authResponse.token);
        onSignedUp();
      } catch (error) {
        console.error('Google sign-up failed:', error);
      }
    },
    onError: (error) => console.error('Google sign-up failed:', error)
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/linkedin-callback`,
    onSuccess: async (code) => {
      try {
        const authResponse = await authService.loginWithLinkedIn(code);
        localStorage.setItem('token', authResponse.token);
        onSignedUp();
      } catch (error) {
        console.error('LinkedIn sign-up failed:', error);
      }
    },
    onError: (error) => {
      console.error('LinkedIn sign-up failed:', error);
    },
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authResponse = await authService.registerWithEmail({
        firstName,
        lastName,
        email,
        password,
        country
      });
      localStorage.setItem('token', authResponse.token);
      onSignedUp();
    } catch (error) {
      console.error('Email sign-up failed:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 animated-gradient"></div>
      
      <div className="frosted-panel w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Sign up to use JobCopilot</h1>
        </div>

        {/* Social Sign-up Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
            onClick={() => handleGoogleSignUp()}
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
            onClick={() => linkedInLogin()}
          >
            <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
            Continue with LinkedIn
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR SIGNUP WITH EMAIL</span>
          </div>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                type="text" 
                placeholder="Enter your first name" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white/50 border-gray-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                type="text" 
                placeholder="Enter your last name" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white/50 border-gray-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/50 border-gray-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Which country are you based in?</Label>
            <Input 
              id="country" 
              type="text" 
              placeholder="Type and select country" 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-white/50 border-gray-200"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms
              </Link>
              {" "}& {" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
            disabled={!agreedToTerms}
          >
            Sign up
          </Button>
        </form>
        
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