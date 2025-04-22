
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface LoginScreenProps {
  onLoggedIn: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    onLoggedIn();
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 animated-gradient"></div>
      
      <motion.div 
        className="frosted-panel w-full max-w-md p-8 space-y-6 soft-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center space-y-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl font-bold text-primary-blue"
            variants={itemVariants}
          >
            Job Apply Flow
          </motion.h1>
          <motion.p 
            className="text-sleek-gray"
            variants={itemVariants}
          >
            Sign in to your account
          </motion.p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleLogin} 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <Label htmlFor="email" className="text-foreground/80">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neo-input text-foreground/90 focus:border-primary-blue/40 focus:shadow-glass"
              required
            />
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <Label htmlFor="password" className="text-foreground/80">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neo-input text-foreground/90 focus:border-primary-blue/40 focus:shadow-glass"
              required
            />
          </motion.div>
          
          <motion.div 
            className="pt-2"
            variants={itemVariants}
          >
            <Button 
              type="submit" 
              className="w-full bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue border border-primary-blue/30 shadow-glass micro-hover"
            >
              Sign In
            </Button>
          </motion.div>
        </motion.form>
        
        <motion.div 
          className="text-center pt-4"
          variants={itemVariants}
        >
          <p className="text-sm text-foreground/60">
            Don't have an account?{" "}
            <a href="#" className="text-primary-blue hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
