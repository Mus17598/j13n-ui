import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import { storeAuthToken } from '@/utils/auth';
import { toast } from '@/components/ui/sonner';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SocialSignUpButtons from './auth/SocialSignUpButtons';
import AuthDivider from './auth/AuthDivider';

interface LoginScreenProps {
  onLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store token and redirect
        storeAuthToken(data.token);
        toast.success("Login successful!");
        onLoggedIn();
      } else {
        // Check if this is a "not registered" error
        if (data.code === 'auth/user-not-found' || data.message?.includes('not found') || data.message?.includes('not registered')) {
          setLoginError("You need to sign up first.");
          toast.error("You need to sign up first.");
        } else {
          setLoginError(data.message || 'Login failed. Please check your credentials.');
          toast.error(data.message || 'Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      setLoginError('Login request failed. Please try again.');
      toast.error('Login request failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
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

        {loginError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        {/* Social Login Buttons */}
        <SocialSignUpButtons 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          onSuccess={onLoggedIn}
        />

        <AuthDivider text="OR LOGIN WITH EMAIL" />
        
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm text-primary-green hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Signing In...
              </>
            ) : 'Sign In'}
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
