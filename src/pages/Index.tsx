
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentApplications from "@/components/RecentApplications";
import ProfileSummary from "@/components/ProfileSummary";
import StatusDashboard from "@/components/StatusDashboard";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

interface IndexProps {
  isLoggedIn?: boolean;
}

const Index = ({ isLoggedIn }: IndexProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-bold text-gray-800">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Landing Page Navigation Button */}
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-primary-green hover:text-white transition-all duration-300"
          aria-label="Go to landing page"
        >
          <Home className="h-5 w-5" />
        </Button>
      </motion.div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileSummary />
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <StatusDashboard />
              <RecentApplications />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
