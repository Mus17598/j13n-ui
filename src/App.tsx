import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";  
import SignUpScreen from "@/components/SignUpScreen";
import LoginScreen from "@/components/LoginScreen";
import UserOnboardingForm from "@/pages/UserOnboardingForm";
import ProfilePage from "@/pages/ProfilePage";
import Landing from "@/pages/Landing";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LinkedInCallback from './components/LinkedInCallback';

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem('hasCompletedOnboarding') === 'true';
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    if (!hasCompletedOnboarding) {
      navigate('/onboarding');
    } else {
      navigate('/app');
    }
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/app');
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Index isLoggedIn={isLoggedIn} />} />
      <Route path="/signup" element={<SignUpScreen onSignedUp={handleLogin} />} />
      <Route path="/login" element={<LoginScreen onLoggedIn={handleLogin} />} />
      <Route path="/onboarding" element={<UserOnboardingForm onComplete={handleOnboardingComplete} />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/linkedin-callback" element={<LinkedInCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
