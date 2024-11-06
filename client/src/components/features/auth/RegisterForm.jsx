import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import AuthLayout from '../../layout/AuthLayout';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const formData = new FormData(e.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
      };
      
      if (formData.get('password') !== formData.get('confirmPassword')) {
        throw new Error('Passwords do not match');
      }
      
      await register(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start booking your perfect stay"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
          />
        </div>
        
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
          autoComplete="new-password"
          required
        />
        
        <Input
          label="Confirm Password"
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
          Create Account
        </Button>

        <div className="text-sm text-center">
          <span className="text-gray-500">Already have an account?</span>{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm; 