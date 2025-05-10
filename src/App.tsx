
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import SignUpScreen from "@/components/SignUpScreen";
import LoginScreen from "@/components/LoginScreen";
import UserOnboardingForm from "@/pages/UserOnboardingForm";
import ProfilePage from "@/pages/ProfilePage";
import Landing from "@/pages/Landing";
import OAuthCallback from "@/pages/OAuthCallback";
import { isAuthenticated, logout } from "@/utils/auth";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authed = isAuthenticated();
  return authed ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return isAuthenticated();
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

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={
        <ProtectedRoute>
          <Index isLoggedIn={isLoggedIn} />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<SignUpScreen onSignedUp={handleLogin} />} />
      <Route path="/login" element={<LoginScreen onLoggedIn={handleLogin} />} />
      <Route path="/oauth-success" element={<OAuthCallback />} />
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <UserOnboardingForm onComplete={handleOnboardingComplete} />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
