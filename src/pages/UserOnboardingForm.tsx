
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LinkedinIcon, Sparkles, ArrowRight } from 'lucide-react';

interface FormData {
  linkedInConnected: boolean;
  uniqueDescription: string;
}

interface UserOnboardingFormProps {
  onComplete: () => void;
}

const UserOnboardingForm: React.FC<UserOnboardingFormProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    linkedInConnected: false,
    uniqueDescription: ''
  });

  const handleLinkedInConnect = () => {
    setFormData(prev => ({ ...prev, linkedInConnected: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.linkedInConnected && formData.uniqueDescription.trim()) {
      console.log('Form submitted:', formData);
      onComplete();
    }
  };

  const isFormValid = formData.linkedInConnected && 
    formData.uniqueDescription.trim().length > 0 && 
    formData.uniqueDescription.trim().split(' ').length <= 80;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-blue-200/50 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Quick Setup</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Welcome to AplyGen
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Let's get you set up in just two simple steps
            </p>
          </motion.div>

          {/* Onboarding Form */}
          <motion.div
            className="glassmorphism p-8 space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* LinkedIn Connection */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5 text-blue-600" />
                  Connect LinkedIn
                </Label>
                
                <AnimatePresence mode="wait">
                  {!formData.linkedInConnected ? (
                    <motion.div
                      key="connect"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        type="button"
                        onClick={handleLinkedInConnect}
                        className="w-full bg-[#0077B5] hover:bg-[#005885] text-white h-14 text-lg font-medium rounded-xl relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative flex items-center justify-center gap-3">
                          <LinkedinIcon className="w-6 h-6" />
                          Connect with LinkedIn
                        </span>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="connected"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-medium">LinkedIn Connected</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Unique Description */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Label htmlFor="uniqueDescription" className="text-lg font-semibold text-gray-800">
                  Tell us about yourself
                </Label>
                
                <div className="relative">
                  <Textarea
                    id="uniqueDescription"
                    value={formData.uniqueDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, uniqueDescription: e.target.value }))}
                    placeholder="Tell us something unique about yourself in under 80 words..."
                    className="min-h-[120px] bg-white/70 backdrop-blur-sm border-blue-200/50 rounded-xl text-gray-700 placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300"
                    maxLength={500}
                  />
                  
                  <motion.div
                    className="absolute bottom-3 right-3 text-sm text-gray-500"
                    animate={{ 
                      color: formData.uniqueDescription.split(' ').length > 80 ? '#ef4444' : '#6b7280' 
                    }}
                  >
                    {formData.uniqueDescription.split(' ').filter(word => word.length > 0).length}/80 words
                  </motion.div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboardingForm;
