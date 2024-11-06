from models import Room, Booking
from database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class RoomService:
    @staticmethod
    def get_all_rooms():
        try:
            return Room.query.all()
        except Exception as e:
            logger.error(f"Error getting all rooms: {str(e)}")
            raise

    @staticmethod
    def get_room_by_id(room_id):
        try:
            return Room.query.get_or_404(room_id)
        except Exception as e:
            logger.error(f"Error getting room by id {room_id}: {str(e)}")
            raise

    @staticmethod
    def check_availability(room_id, check_in_date, check_out_date):
        try:
            overlapping_bookings = Booking.query.filter(
                Booking.room_id == room_id,
                Booking.check_out_date > check_in_date,
                Booking.check_in_date < check_out_date,
                Booking.booking_status != 'cancelled'
            ).first()
            return not bool(overlapping_bookings)
        except Exception as e:
            logger.error(f"Error checking room availability: {str(e)}")
            raise 