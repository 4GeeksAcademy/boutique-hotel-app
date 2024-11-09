from .base_service import BaseService
from models import Room
import logging

logger = logging.getLogger(__name__)

class RoomService(BaseService):
    @classmethod
    def get_available_rooms(cls, room_type=None, capacity=None, max_price=None):
        try:
            query = Room.query.filter_by(is_available=True)
            
            if room_type:
                query = query.filter_by(room_type=room_type)
            if capacity:
                query = query.filter(Room.capacity >= capacity)
            if max_price:
                query = query.filter(Room.price_per_night <= max_price)
                
            return query.all()
            
        except Exception as e:
            logger.error(f"Error fetching available rooms: {str(e)}")
            raise

    @classmethod
    def update_room_availability(cls, room_id, is_available):
        try:
            room = Room.query.get_or_404(room_id)
            room.is_available = is_available
            cls.commit_changes()
            return room
        except Exception as e:
            logger.error(f"Error updating room availability: {str(e)}")
            raise 