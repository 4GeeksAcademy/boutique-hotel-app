import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookingForm() {
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/rooms/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        setError('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !room) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights * room.pricePerNight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/bookings', {
        roomId: room.id,
        checkIn,
        checkOut,
        totalPrice: calculateTotalPrice()
      });
      navigate('/bookings');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-text-dark">Book Room</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-dark text-sm font-bold mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="mb-6">
          <label className="block text-text-dark text-sm font-bold mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
            min={checkIn}
          />
        </div>
        {checkIn && checkOut && (
          <div className="mb-6">
            <p className="text-lg font-bold text-text-dark">
              Total Price: ${calculateTotalPrice()}
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
} 