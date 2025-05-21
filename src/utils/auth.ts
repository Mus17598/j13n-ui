
// Authentication utility functions

// Store authentication token
export const storeAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Get authentication token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Remove authentication token
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Create an authenticated API request
export const createAuthenticatedRequest = async (
  url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  data?: any
): Promise<Response> => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return fetch(url, options);
};

// Logout function
export const logout = (): void => {
  removeAuthToken();
  // Could add additional cleanup here if needed
};
