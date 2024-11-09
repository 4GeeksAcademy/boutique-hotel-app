import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import AuthLayout from '../../layout/AuthLayout';

const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const formData = new FormData(e.target);
      await login(formData.get('email'), formData.get('password'));
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Please sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {typeof error === 'string' ? error : 'An error occurred'}
                </h3>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Sign in
        </Button>

        <div className="text-sm text-center">
          <span className="text-gray-500">Don't have an account?</span>{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginForm; 