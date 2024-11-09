import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import RoomCard from './RoomCard';
import RoomSearch from './RoomSearch';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        capacity: '',
        checkIn: '',
        checkOut: ''
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get('/rooms');
                setRooms(response);
                setFilteredRooms(response);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError('Failed to load rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        let result = rooms;

        if (filters.type) {
            result = result.filter(room => room.roomType === filters.type);
        }
        if (filters.minPrice) {
            result = result.filter(room => room.pricePerNight >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            result = result.filter(room => room.pricePerNight <= parseFloat(filters.maxPrice));
        }
        if (filters.capacity) {
            result = result.filter(room => room.capacity >= parseInt(filters.capacity));
        }

        setFilteredRooms(result);
    }, [filters, rooms]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateNights = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };

    const handleBooking = async (roomId) => {
        if (!user) {
            navigate('/login', { 
                state: { 
                    from: '/rooms',
                    bookingIntent: {
                        roomId,
                        checkIn: filters.checkIn,
                        checkOut: filters.checkOut
                    }
                } 
            });
            return;
        }

        if (!filters.checkIn || !filters.checkOut) {
            setError('Please select check-in and check-out dates');
            return;
        }

        const nights = calculateNights(filters.checkIn, filters.checkOut);
        if (nights <= 0) {
            setError('Invalid date range selected');
            return;
        }

        try {
            // Check room availability first
            const availabilityResponse = await api.post(`/rooms/${roomId}/availability`, {
                checkIn: filters.checkIn,
                checkOut: filters.checkOut
            });

            if (!availabilityResponse.available) {
                setError(availabilityResponse.reason || 'Room is not available for selected dates');
                return;
            }

            // Create booking
            const bookingResponse = await api.post('/bookings', {
                roomId,
                checkInDate: filters.checkIn,
                checkOutDate: filters.checkOut,
                numberOfNights: nights
            });

            // Clear any existing errors
            setError(null);

            // Redirect to booking details with state
            navigate(`/bookings/${bookingResponse.id}`, {
                state: { 
                    booking: bookingResponse,
                    fromBooking: true 
                }
            });
        } catch (error) {
            console.error('Booking error:', error);
            setError(error.response?.data?.error || 'Failed to create booking');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Rooms</h2>
            
            <RoomSearch 
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            {filteredRooms.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                    <p>No rooms available matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onBooking={handleBooking}
                            checkIn={filters.checkIn}
                            checkOut={filters.checkOut}
                            calculateNights={calculateNights}
                        />
                    ))}
                </div>
            )}
        </div>
    );
} 