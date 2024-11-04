import api from './api';

export const roomService = {
  getAllRooms: () => api.get('/api/rooms'),
  getRoom: (id) => api.get(`/api/rooms/${id}`),
  checkAvailability: (roomId, dates) => 
    api.post(`/api/rooms/${roomId}/check-availability`, dates),
}; 