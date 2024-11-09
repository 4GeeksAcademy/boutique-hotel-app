import React from 'react';
import { Users, Calendar } from 'lucide-react';
import RoomImageCarousel from './RoomImageCarousel';

export default function RoomCard({ room, onBooking, checkIn, checkOut, calculateNights }) {
    const nights = calculateNights(checkIn, checkOut);

    const calculateTotalPrice = () => {
        return (room.pricePerNight * nights).toFixed(2);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
            <RoomImageCarousel images={room.imageUrls} />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{room.roomType}</h3>
                        <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-primary">${room.pricePerNight}</p>
                        <p className="text-sm text-gray-500">per night</p>
                    </div>
                </div>

                <p className="text-gray-600 mb-4">{room.description}</p>

                <div className="flex items-center mb-4">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                        Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                    </span>
                </div>

                {checkIn && checkOut && nights > 0 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                                {nights} {nights === 1 ? 'night' : 'nights'}
                            </span>
                        </div>
                        <div className="text-lg font-bold text-primary">
                            Total: ${calculateTotalPrice()}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => onBooking(room.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        room.isAvailable
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!room.isAvailable}
                >
                    {room.isAvailable ? (
                        checkIn && checkOut ? 'Book Now' : 'Select Dates to Book'
                    ) : 'Not Available'}
                </button>
            </div>
        </div>
    );
} 