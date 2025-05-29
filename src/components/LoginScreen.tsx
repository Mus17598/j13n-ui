import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { authService } from '../services/auth.service';

interface LoginScreenProps {
  onLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const authResponse = await authService.loginWithGoogle(tokenResponse.access_token);
        localStorage.setItem('token', authResponse.token);
        onLoggedIn();
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: (error) => console.error('Google login failed:', error)
  });

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/linkedin-callback`,
    onSuccess: async (code) => {
      try {
        const authResponse = await authService.loginWithLinkedIn(code);
        localStorage.setItem('token', authResponse.token);
        onLoggedIn();
      } catch (error) {
        console.error('LinkedIn login failed:', error);
      }
    },
    onError: (error) => {
      console.error('LinkedIn login failed:', error);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authResponse = await authService.loginWithEmail({ email, password });
      localStorage.setItem('token', authResponse.token);
      onLoggedIn();
    } catch (error) {
      console.error('Email login failed:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 animated-gradient"></div>
      
      <div className="frosted-panel w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
            onClick={() => handleGoogleLogin()}
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
            <span className="px-2 bg-white text-gray-500">OR LOGIN WITH EMAIL</span>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
              required
            />
          </div>
          
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm text-primary-green hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full bg-primary-green hover:bg-primary-green/90 text-white">
            Sign In
          </Button>
        </form>
        
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-green hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
