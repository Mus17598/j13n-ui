import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ChangeSettingModal from "@/components/ChangeSettingModal";

interface UserSettingsDropdownProps {
  username: string;
  email: string;
  isGoogleSignIn?: boolean;
  onLogout: () => void;
}

export const UserSettingsDropdown: React.FC<UserSettingsDropdownProps> = ({
  username,
  email,
  isGoogleSignIn = false,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'username' | 'email' | 'password' | 'phone' | null>(null);

  const handleSave = (newValue: string) => {
    // Handle the save operation based on the active modal
    console.log(`Saving ${activeModal}:`, newValue);
    setActiveModal(null);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-gray-100/80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-2 z-50">
            {/* Username Section */}
            <div className="px-4 py-2">
              <button
                onClick={() => setActiveModal('username')}
                className="w-full text-left hover:bg-gray-50 -mx-4 px-4 py-2 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">Change Username</div>
                <div className="text-sm text-gray-500">{username}</div>
              </button>
            </div>

            {/* Email Section */}
            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={() => !isGoogleSignIn && setActiveModal('email')}
                className="w-full text-left hover:bg-gray-50 -mx-4 px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGoogleSignIn}
              >
                <div className="text-sm font-medium text-gray-900">Change Email</div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {email}
                  {isGoogleSignIn && <span className="text-xs text-gray-400">(Signed in with Google)</span>}
                </div>
              </button>
            </div>

            {/* Password Section */}
            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={() => !isGoogleSignIn && setActiveModal('password')}
                className="w-full text-left hover:bg-gray-50 -mx-4 px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGoogleSignIn}
              >
                <div className="text-sm font-medium text-gray-900">Change Password</div>
                {isGoogleSignIn && <div className="text-xs text-gray-400">Signed in with Google</div>}
              </button>
            </div>

            {/* Logout Section */}
            <div className="px-4 py-2 border-t border-gray-100">
              <button
                onClick={onLogout}
                className="w-full text-left text-red-600 hover:bg-red-50 -mx-4 px-4 py-2 transition-colors"
              >
                <div className="text-sm font-medium">Log Out</div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      {activeModal === 'username' && (
        <ChangeSettingModal
          title="Change Username"
          currentValue={username}
          type="text"
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
          verifyPassword={true}
        />
      )}

      {activeModal === 'email' && (
        <ChangeSettingModal
          title="Change Email"
          currentValue={email}
          type="email"
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
          verifyPassword={true}
        />
      )}

      {activeModal === 'password' && (
        <ChangeSettingModal
          title="Change Password"
          type="password"
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
          verifyPassword={true}
        />
      )}
    </div>
  );
}; 