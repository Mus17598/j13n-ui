import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const authService = {
  async loginWithGoogle(token: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/google`, { token });
    return response.data;
  },

  async loginWithLinkedIn(code: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/linkedin`, { code });
    return response.data;
  },

  async registerWithEmail(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
  }): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  async loginWithEmail(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  }
};