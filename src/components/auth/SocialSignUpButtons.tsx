
import React from 'react';
import OAuthLoginButtons from './OAuthLoginButtons';

interface SocialSignUpButtonsProps {
  isLoading: boolean;
  setIsLoading?: (isLoading: boolean) => void;
  onSuccess?: () => void;
}

const SocialSignUpButtons: React.FC<SocialSignUpButtonsProps> = ({ 
  isLoading, 
  setIsLoading = () => {}, 
  onSuccess = () => {} 
}) => {
  return (
    <OAuthLoginButtons 
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      onSuccess={onSuccess}
    />
  );
};

export default SocialSignUpButtons;
