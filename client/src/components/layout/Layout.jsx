import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Footer from './Footer';

export default function Layout({ children }) {
    const { loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen flex flex-col relative">
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
} 