from models import Booking, Room
from database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class BookingService:
    @staticmethod
    def create_booking(user_id, room_id, check_in_date, check_out_date):
        try:
            # Verify room exists and is available
            room = Room.query.get_or_404(room_id)
            if not room.is_available:
                raise ValueError("Room not available")
                
            booking = Booking(
                user_id=user_id,
                room_id=room_id,
                check_in_date=check_in_date,
                check_out_date=check_out_date,
                booking_status='pending'
            )
            
            room.is_available = False
            booking.save()
            
            return booking
            
        except Exception as e:
            logger.error(f"Error creating booking: {str(e)}")
            db.session.rollback()
            raise

    @staticmethod
    def get_user_bookings(user_id):
        try:
            return Booking.query.filter_by(user_id=user_id).all()
        except Exception as e:
            logger.error(f"Error getting user bookings: {str(e)}")
            raise

    @staticmethod
    def cancel_booking(booking_id, user_id):
        try:
            booking = Booking.query.filter_by(
                id=booking_id,
                user_id=user_id
            ).first_or_404()
            
            if booking.booking_status != 'pending':
                raise ValueError("Cannot cancel this booking")
            
            booking.booking_status = 'cancelled'
            booking.room.is_available = True
            booking.save()
            
            return booking
        except Exception as e:
            logger.error(f"Error cancelling booking: {str(e)}")
            db.session.rollback()
            raise 