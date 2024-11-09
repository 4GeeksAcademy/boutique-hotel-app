import api from './api';
import jwt_decode from 'jwt-decode';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      throw error;
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => 
    api.post('/auth/reset-password', { token, password }),
  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwt_decode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}; 