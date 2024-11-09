import React from 'react';
import { Users } from 'lucide-react';

export default function RoomSearch({ filters, onFilterChange }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Room Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type
                    </label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                        className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                    >
                        <option value="">All Types</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                        <option value="Standard">Standard</option>
                    </select>
                </div>

                {/* Capacity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Guests
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            name="capacity"
                            value={filters.capacity || ''}
                            onChange={onFilterChange}
                            min="1"
                            placeholder="Number of guests"
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary pl-10"
                        />
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>

                {/* Dates */}
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-in Date
                        </label>
                        <input
                            type="date"
                            name="checkIn"
                            value={filters.checkIn || ''}
                            onChange={onFilterChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Check-out Date
                        </label>
                        <input
                            type="date"
                            name="checkOut"
                            value={filters.checkOut || ''}
                            onChange={onFilterChange}
                            min={filters.checkIn || new Date().toISOString().split('T')[0]}
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 