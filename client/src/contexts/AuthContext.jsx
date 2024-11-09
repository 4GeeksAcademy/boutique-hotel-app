import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get('/auth/me');
                    setUser(response.user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email });
            const response = await api.post('/auth/login', { email, password });
            console.log('Login response:', response);

            if (response.token && response.user) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                navigate('/');
                return response;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            
            if (response.token && response.user) {
                localStorage.setItem('token', response.token);
                setUser(response.user);
                navigate('/');
                return response;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };