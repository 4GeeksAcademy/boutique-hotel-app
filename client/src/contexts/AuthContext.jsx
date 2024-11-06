import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Verify token is valid
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 < Date.now()) {
                        // Token expired
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        // Get current user data
                        const userData = await authService.getCurrentUser();
                        setUser(userData);
                    }
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authService.login({ email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            navigate('/dashboard');
            return true;
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await authService.register(userData);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            navigate('/dashboard');
            return true;
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        }
    };

    const updateProfile = async (userData) => {
        try {
            setError(null);
            const updatedUser = await authService.updateProfile(userData);
            setUser(updatedUser);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || 'Profile update failed');
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 