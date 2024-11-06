import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import AuthLayout from '../../layout/AuthLayout';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await resetPassword(token, password);
      navigate('/login', { 
        state: { message: 'Password has been reset successfully. Please login with your new password.' }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (!token) {
    return (
      <AuthLayout
        title="Invalid Reset Link"
        subtitle="Please request a new password reset link"
      >
        <div className="text-center">
          <Button onClick={() => navigate('/forgot-password')}>
            Request New Link
          </Button>
        </div>
      </AuthLayout>
    );
  }
  
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Please enter your new password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordForm; 