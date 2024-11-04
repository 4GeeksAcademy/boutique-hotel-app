import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBooking = (roomId) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/book/${roomId}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading rooms...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {rooms.map((room) => (
        <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={room.imageUrls[0]}
            alt={`Room ${room.roomNumber}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-text-dark">{room.roomType}</h3>
            <p className="text-text-light mb-2">{room.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-primary">${room.pricePerNight}/night</span>
              <span className="text-sm text-text-light">Capacity: {room.capacity}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-background-light text-text-dark text-sm rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleBooking(room.id)}
              className={`w-full py-2 px-4 rounded-lg ${
                room.isAvailable
                  ? 'bg-primary hover:bg-primary-dark text-white'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!room.isAvailable}
            >
              {room.isAvailable ? 'Book Now' : 'Not Available'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 