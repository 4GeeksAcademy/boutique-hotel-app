import api from './api';
import jwtDecode from 'jwt-decode';

export const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if server call fails
      localStorage.removeItem('token');
      throw error;
    }
  },
  updateProfile: (userData) => api.put('/api/auth/profile', userData),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, password) => 
    api.post('/api/auth/reset-password', { token, password }),
  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}; 