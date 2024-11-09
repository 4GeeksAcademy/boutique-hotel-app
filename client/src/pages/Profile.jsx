import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, Mail, Phone, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await updateProfile(formData);
            setSuccess('Profile updated successfully');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            setError('Failed to logout');
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || ''
        });
        setIsEditing(false);
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="bg-primary text-white p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary text-2xl font-bold">
                                {user?.firstName?.charAt(0) || <UserCircle className="w-12 h-12" />}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {user?.firstName} {user?.lastName}
                                </h1>
                                <p className="text-primary-100">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Alerts */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
                    {success}
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </div>
            )}

            {/* Profile Content */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-3">
                                    <UserCircle className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-gray-900">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-900">{user?.phone || 'Not set'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="text-gray-900">
                                            {new Date(user?.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 