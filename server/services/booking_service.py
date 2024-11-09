from .base_service import BaseService
from models import Booking, Room
from exceptions import ValidationError
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class BookingService(BaseService):
    @staticmethod
    def validate_dates(check_in, check_out):
        try:
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
            if check_in_date >= check_out_date:
                raise ValidationError("Check-out date must be after check-in date")
                
            today = datetime.now().date()
            if check_in_date < today:
                raise ValidationError("Check-in date cannot be in the past")
                
            return check_in_date, check_out_date
        except ValueError:
            raise ValidationError("Invalid date format. Use YYYY-MM-DD")

    @classmethod
    def check_availability(cls, room_id, check_in_date, check_out_date):
        overlapping_booking = Booking.query.filter(
            Booking.room_id == room_id,
            Booking.check_out_date > check_in_date,
            Booking.check_in_date < check_out_date,
            Booking.booking_status != 'cancelled'
        ).first()
        
        return not bool(overlapping_booking)

    @classmethod
    def create_booking(cls, user_id, room_id, check_in, check_out):
        try:
            # Validate dates
            check_in_date, check_out_date = cls.validate_dates(check_in, check_out)
            
            # Check room exists and is available
            room = Room.query.get_or_404(room_id)
            if not room.is_available:
                raise ValidationError('Room not available')
                
            # Check for overlapping bookings
            if not cls.check_availability(room_id, check_in_date, check_out_date):
                raise ValidationError('Room is already booked for these dates')
                
            # Create booking
            booking = Booking(
                user_id=user_id,
                room_id=room_id,
                check_in_date=check_in_date,
                check_out_date=check_out_date
            )
            
            cls.add_to_session(booking)
            cls.commit_changes()
            
            return booking
            
        except Exception as e:
            logger.error(f"Error creating booking: {str(e)}")
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