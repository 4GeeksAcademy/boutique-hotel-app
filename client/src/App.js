import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { LoginForm, RegisterForm, ForgotPasswordForm, ResetPasswordForm } from './components/features/auth';
import RoomList from './components/features/rooms/RoomList';
import BookingForm from './components/features/bookings/BookingForm';
import UserBookings from './components/features/bookings/UserBookings';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import BookingDetails from './components/features/bookings/BookingDetails';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Layout>
                    <Navigation />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/rooms" element={<RoomList />} />

                        {/* Auth Routes */}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                        <Route path="/reset-password" element={<ResetPasswordForm />} />

                        {/* Protected Routes */}
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/book/:roomId" 
                            element={
                                <ProtectedRoute>
                                    <BookingForm />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/bookings" 
                            element={
                                <ProtectedRoute>
                                    <UserBookings />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/bookings/:bookingId" 
                            element={
                                <ProtectedRoute>
                                    <BookingDetails />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </Layout>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;