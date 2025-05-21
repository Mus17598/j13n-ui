
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storeAuthToken } from '@/utils/auth';
import { toast } from '@/components/ui/sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Extract token and error from URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const errorMsg = params.get('error');
        
        if (errorMsg) {
          setError(errorMsg);
          toast.error(errorMsg);
          
          // Redirect back to login after delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }
        
        if (token) {
          // Store the token
          storeAuthToken(token);
          toast.success("Authentication successful!");
          
          // Redirect to app or onboarding based on user status
          const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
          navigate(hasCompletedOnboarding ? '/app' : '/onboarding');
        } else {
          setError('Authentication failed. No token received.');
          
          // Redirect back to login after delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('An unexpected error occurred during authentication.');
      } finally {
        setIsLoading(false);
      }
    };

    handleOAuthCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary-green mx-auto mb-4" />
            <p className="text-xl font-medium">Verifying your authentication...</p>
            <p className="text-gray-500 mt-2">Please wait, we're setting up your account.</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Authentication Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="text-center py-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-medium text-gray-800">Authentication successful!</p>
            <p className="text-gray-600 mt-2">Redirecting you to the dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
