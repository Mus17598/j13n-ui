import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, User, Mail, Lock, Phone } from 'lucide-react';
import ChangeSettingModal from './ChangeSettingModal';

interface UserSettingsModalProps {
  username: string;
  email: string;
  phone: string;
  isGoogleSignIn: boolean;
  onClose: () => void;
  onLogout: () => void;
  onUpdateSetting: (setting: string, value: string) => void;
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  username,
  email,
  phone,
  isGoogleSignIn,
  onClose,
  onLogout,
  onUpdateSetting
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const settingsItems = [
    {
      id: 'username',
      title: 'Change Username',
      value: username,
      type: 'text' as const,
      disabled: false,
      icon: User
    },
    {
      id: 'email',
      title: 'Change Email',
      value: email,
      type: 'email' as const,
      disabled: isGoogleSignIn,
      icon: Mail
    },
    {
      id: 'password',
      title: 'Change Password',
      type: 'password' as const,
      disabled: isGoogleSignIn,
      icon: Lock
    },
    {
      id: 'phone',
      title: 'Change Phone Number',
      value: phone,
      type: 'tel' as const,
      disabled: false,
      icon: Phone
    }
  ];

  const handleSave = (setting: string, newValue: string) => {
    onUpdateSetting(setting, newValue);
    setActiveModal(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40" onClick={onClose}>
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
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">Settings</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage your account preferences</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100/80"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {settingsItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-between h-16 px-4 rounded-xl transition-all duration-200 ${
                        item.disabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-gradient-to-r hover:from-primary-purple/5 hover:to-primary-pink/5'
                      }`}
                      disabled={item.disabled}
                      onClick={() => setActiveModal(item.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-purple/10 to-primary-pink/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary-purple" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          {item.value && (
                            <span className="text-sm text-gray-500">{item.value}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Button>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-16 px-4 rounded-xl text-red-600 hover:bg-red-50/50"
                    onClick={onLogout}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium">Log Out</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {activeModal && (
        <ChangeSettingModal
          title={settingsItems.find(item => item.id === activeModal)?.title || ''}
          currentValue={settingsItems.find(item => item.id === activeModal)?.value}
          type={settingsItems.find(item => item.id === activeModal)?.type}
          onClose={() => setActiveModal(null)}
          onSave={(newValue) => handleSave(activeModal, newValue)}
          verifyPassword={activeModal === 'password' || activeModal === 'email'}
        />
      )}
    </AnimatePresence>
  );
};

export default UserSettingsModal; 