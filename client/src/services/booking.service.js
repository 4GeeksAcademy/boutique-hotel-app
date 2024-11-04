import api from './api';

export const bookingService = {
  createBooking: (bookingData) => api.post('/api/bookings', bookingData),
  getUserBookings: () => api.get('/api/bookings/user'),
  cancelBooking: (bookingId) => api.post(`/api/bookings/${bookingId}/cancel`),
}; 