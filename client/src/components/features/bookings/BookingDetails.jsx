import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, CreditCard, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../../ui/LoadingSpinner';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

export default function BookingDetails() {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { bookingId } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If we have booking data in state, use it
        if (location.state?.booking && location.state?.fromBooking) {
            setBooking(location.state.booking);
            setLoading(false);
            return;
        }

        // Otherwise fetch it
        const fetchBooking = async () => {
            try {
                const response = await api.get(`/bookings/${bookingId}`);
                setBooking(response);
            } catch (error) {
                console.error('Error fetching booking:', error);
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId, location.state]);

    useEffect(() => {
        if (location.state?.fromBooking) {
            setShowSuccess(true);
            // Clear the success message after 5 seconds
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            setCancelling(true);
            await api.post(`/bookings/${bookingId}/cancel`);
            setBooking(prev => ({
                ...prev,
                bookingStatus: 'cancelled'
            }));
        } catch (error) {
            setError('Failed to cancel booking');
            console.error('Error cancelling booking:', error);
        } finally {
            setCancelling(false);
        }
    };

    const handlePayment = async () => {
        try {
            setProcessingPayment(true);
            // Create payment intent
            const response = await api.post('/payments/create-intent', {
                bookingId: booking.id
            });

            // Here you would typically redirect to a payment page or open a payment modal
            // For this example, we'll just simulate a successful payment
            await api.post(`/payments/process`, {
                bookingId: booking.id,
                paymentIntentId: response.data.clientSecret
            });

            // Update booking status
            setBooking(prev => ({
                ...prev,
                bookingStatus: 'confirmed'
            }));

        } catch (error) {
            setError('Failed to process payment');
            console.error('Error processing payment:', error);
        } finally {
            setProcessingPayment(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please login to view booking details</h2>
                    <Link 
                        to="/login" 
                        className="text-primary hover:text-primary-dark"
                        state={{ from: `/bookings/${bookingId}` }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
                <div className="mt-4 text-center">
                    <Link 
                        to="/bookings" 
                        className="text-primary hover:text-primary-dark"
                    >
                        View All Bookings
                    </Link>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Booking Not Found</h2>
                    <Link 
                        to="/bookings" 
                        className="text-primary hover:text-primary-dark"
                    >
                        View All Bookings
                    </Link>
                </div>
            </div>
        );
    }

    const calculateNights = () => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);
        return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    };

    const calculateTotalPrice = () => {
        return (booking.room.pricePerNight * calculateNights()).toFixed(2);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Booking created successfully!
                </div>
            )}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-white p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
                            <p className="text-primary-100">Booking ID: {booking.id}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                            booking.bookingStatus === 'confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.bookingStatus === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Room Details */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4">Room Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Room Type</p>
                                <p className="font-medium">{booking.room.roomType}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Room Number</p>
                                <p className="font-medium">{booking.room.roomNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-gray-600">Check-in</p>
                                <p className="font-medium">
                                    {new Date(booking.checkInDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-gray-600">Check-out</p>
                                <p className="font-medium">
                                    {new Date(booking.checkOutDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Users className="w-5 h-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-gray-600">Capacity</p>
                                <p className="font-medium">{booking.room.capacity} guests</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-gray-600">Total Price</p>
                                <p className="font-medium">${calculateTotalPrice()}</p>
                                <p className="text-sm text-gray-500">
                                    ({calculateNights()} nights at ${booking.room.pricePerNight}/night)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment and Actions */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="space-y-4">
                            {booking.bookingStatus === 'pending' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                                        <p className="text-yellow-700">
                                            Payment is required to confirm your booking
                                        </p>
                                    </div>
                                    <button
                                        onClick={handlePayment}
                                        disabled={processingPayment}
                                        className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:opacity-50"
                                    >
                                        {processingPayment ? 'Processing...' : 'Pay Now'}
                                    </button>
                                </div>
                            )}

                            {booking.bookingStatus !== 'cancelled' && (
                                <button
                                    onClick={handleCancel}
                                    disabled={cancelling || booking.bookingStatus === 'confirmed'}
                                    className="w-full border border-red-300 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 disabled:opacity-50"
                                >
                                    {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                                </button>
                            )}

                            <Link
                                to="/bookings"
                                className="block text-center text-primary hover:text-primary-dark"
                            >
                                View All Bookings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 