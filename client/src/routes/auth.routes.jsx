import { Navigate } from 'react-router-dom';
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from '../components/features/auth';
import { useAuth } from '../contexts/AuthContext';

export const authRoutes = [
  {
    path: '/login',
    element: <LoginForm />,
    loader: () => {
      const { user } = useAuth();
      return user ? <Navigate to="/dashboard" /> : null;
    }
  },
  {
    path: '/register',
    element: <RegisterForm />,
    loader: () => {
      const { user } = useAuth();
      return user ? <Navigate to="/dashboard" /> : null;
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordForm />,
    loader: () => {
      const { user } = useAuth();
      return user ? <Navigate to="/dashboard" /> : null;
    }
  },
  {
    path: '/reset-password',
    element: <ResetPasswordForm />,
    loader: () => {
      const { user } = useAuth();
      return user ? <Navigate to="/dashboard" /> : null;
    }
  }
]; 