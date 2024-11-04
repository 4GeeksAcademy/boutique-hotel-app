import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/user');
        setBookings(response.data);
      } catch (error) {
        setError('Failed to load bookings');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {booking.room.roomType} - Room {booking.room.roomNumber}
                </h3>
                <p className="text-gray-600">
                  Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${booking.totalPrice}</p>
                <p className="text-sm text-gray-500 capitalize">{booking.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 