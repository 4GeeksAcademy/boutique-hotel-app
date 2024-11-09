import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { Calendar, Users, CreditCard } from 'lucide-react';

export default function UserBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/user');
                setBookings(response || []);
                console.log('Fetched bookings:', response);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <Link 
                    to="/rooms" 
                    className="text-primary hover:text-primary-dark"
                >
                    Browse Rooms
                </Link>
            </div>
        );
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Bookings Found</h2>
                    <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
                    <Link 
                        to="/rooms"
                        className="text-primary hover:text-primary-dark"
                    >
                        Browse Rooms
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
            <div className="grid gap-6">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {booking.room.roomType} - Room {booking.room.roomNumber}
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <div>
                                                <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                                <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-500">
                                                    {booking.numberOfNights} {booking.numberOfNights === 1 ? 'night' : 'nights'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            <p>Total: ${booking.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        booking.bookingStatus === 'confirmed' 
                                            ? 'bg-green-100 text-green-800'
                                            : booking.bookingStatus === 'cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                    </div>
                                    <Link
                                        to={`/bookings/${booking.id}`}
                                        className="block mt-2 text-primary hover:text-primary-dark text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 