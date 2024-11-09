import { Navigate, useLocation } from 'react-router-dom';
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from '../components/features/auth';
import { useAuth } from '../contexts/AuthContext';

export const authRoutes = [
  {
    path: '/login',
    element: ({ children }) => {
      const { isAuthenticated } = useAuth();
      const location = useLocation();
      
      if (isAuthenticated) {
        return <Navigate to={location.state?.from || '/'} replace />;
      }
      
      return <LoginForm />;
    }
  },
  {
    path: '/register',
    element: ({ children }) => {
      const { isAuthenticated } = useAuth();
      const location = useLocation();
      
      if (isAuthenticated) {
        return <Navigate to={location.state?.from || '/'} replace />;
      }
      
      return <RegisterForm />;
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordForm />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordForm />
  }
]; 