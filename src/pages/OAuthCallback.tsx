
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storeAuthToken } from '@/utils/auth';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = () => {
      // Extract token from URL query parameters
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      
      if (token) {
        // Store the token
        storeAuthToken(token);
        
        // Redirect to app
        navigate('/app');
      } else {
        setError('Authentication failed. No token received.');
        
        // Redirect back to login after delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6">
        {error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            <p className="text-xl">Authentication successful! Redirecting...</p>
            <div className="mt-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary-green border-t-transparent rounded-full mx-auto"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
