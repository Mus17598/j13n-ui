
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { storeAuthToken } from '@/utils/auth';

interface SignUpFormProps {
  onSignedUp: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setSignupError: (error: string | null) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ 
  onSignedUp, 
  isLoading, 
  setIsLoading,
  setSignupError 
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${firstName} ${lastName}`,
          email, 
          password,
          country
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store token and redirect
        storeAuthToken(data.token);
        toast.success("Account created successfully!");
        onSignedUp();
      } else {
        // Check if this is an "email already in use" error
        if (data.code === 'auth/email-already-in-use' || data.message?.includes('already in use') || data.message?.includes('already exists')) {
          setSignupError("This email is already in use.");
          toast.error("This email is already in use.");
        } else {
          setSignupError(data.message || 'Signup failed. Please try again.');
          toast.error(data.message || 'Signup failed. Please try again.');
        }
      }
    } catch (error) {
      setSignupError('Signup request failed. Please try again.');
      toast.error('Signup request failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
            disabled={isLoading}
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
            disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          disabled={isLoading}
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
        className="w-full bg-[#0CAA41] hover:bg-[#0CAA41]/90 text-white"
        disabled={!agreedToTerms || isLoading}
      >
        {isLoading ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
            Signing Up...
          </>
        ) : 'Sign up'}
      </Button>
    </form>
  );
};

export default SignUpForm;
