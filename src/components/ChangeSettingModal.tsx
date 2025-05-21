import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

interface ChangeSettingModalProps {
  title: string;
  currentValue?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  onClose: () => void;
  onSave: (newValue: string) => void;
  placeholder?: string;
  verifyPassword?: boolean;
}

const ChangeSettingModal: React.FC<ChangeSettingModalProps> = ({
  title,
  currentValue = '',
  type = 'text',
  onClose,
  onSave,
  placeholder,
  verifyPassword = false
}) => {
  const [value, setValue] = useState(currentValue);
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (verifyPassword && !currentPassword) {
      setError('Current password is required');
      setIsLoading(false);
      return;
    }

    if (type === 'password' && value !== confirmValue) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    onSave(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ 
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <Card className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
                {title}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Please fill in the required information
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100/80"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-4">
                {verifyPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-gray-50/50 border-gray-200 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700">
                    {placeholder || `New ${title.split(' ')[1]}`}
                  </label>
                  <Input
                    type={type}
                    placeholder={`Enter ${placeholder?.toLowerCase() || `new ${title.split(' ')[1].toLowerCase()}`}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-50/50 border-gray-200 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200"
                  />
                </motion.div>

                {type === 'password' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmValue}
                      onChange={(e) => setConfirmValue(e.target.value)}
                      className="bg-gray-50/50 border-gray-200 focus:ring-primary-purple/20 focus:border-primary-purple transition-all duration-200"
                    />
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-red-600 bg-red-50/50 p-3 rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end space-x-3 pt-4"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="hover:bg-gray-50/50"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary-purple to-primary-pink text-white hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Saving...</span>
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChangeSettingModal; 