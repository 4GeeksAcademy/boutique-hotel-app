from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Booking, Room
from database import db
from datetime import datetime
from exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)

booking_bp = Blueprint('booking', __name__)

def validate_booking_dates(check_in_date, check_out_date):
    try:
        check_in = datetime.strptime(check_in_date, '%Y-%m-%d').date()
        check_out = datetime.strptime(check_out_date, '%Y-%m-%d').date()
        
        if check_in >= check_out:
            raise ValidationError("Check-out date must be after check-in date")
            
        today = datetime.now().date()
        if check_in < today:
            raise ValidationError("Check-in date cannot be in the past")
            
        return check_in, check_out
    except ValueError:
        raise ValidationError("Invalid date format. Use YYYY-MM-DD")

@booking_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    try:
        logger.info("Received booking creation request")
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        logger.info(f"Booking data received: {data}")
        
        if not data:
            raise ValidationError("No data provided")
            
        required_fields = ['roomId', 'checkInDate', 'checkOutDate']
        for field in required_fields:
            if field not in data:
                raise ValidationError(f"{field} is required")
        
        # Validate dates
        check_in, check_out = validate_booking_dates(
            data['checkInDate'], 
            data['checkOutDate']
        )
        
        logger.info(f"Looking for room with ID: {data['roomId']}")
        # Check if room exists and is available
        room = Room.query.get_or_404(data['roomId'])
        logger.info(f"Found room: {room.to_dict()}")
        
        if not room.is_available:
            raise ValidationError('Room not available')
            
        # Check for overlapping bookings
        overlapping_booking = Booking.query.filter(
            Booking.room_id == data['roomId'],
            Booking.check_out_date > check_in,
            Booking.check_in_date < check_out,
            Booking.booking_status != 'cancelled'
        ).first()
        
        if overlapping_booking:
            raise ValidationError('Room is already booked for these dates')
            
        # Create booking
        booking = Booking(
            user_id=current_user_id,
            room_id=data['roomId'],
            check_in_date=check_in,
            check_out_date=check_out,
            booking_status='pending'
        )
        
        db.session.add(booking)
        db.session.commit()
        
        logger.info(f"Booking created successfully: {booking.id}")
        return jsonify(booking.to_dict()), 201
        
    except ValidationError as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to create booking'}), 500

@booking_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_bookings():
    try:
        current_user_id = get_jwt_identity()
        bookings = Booking.query.filter_by(user_id=current_user_id).all()
        return jsonify([booking.to_dict() for booking in bookings])
    except Exception as e:
        logger.error(f"Error fetching user bookings: {str(e)}")
        return jsonify({'error': 'Failed to fetch bookings'}), 500

@booking_bp.route('/<int:booking_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get_or_404(booking_id)
        
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        booking.booking_status = 'cancelled'
        db.session.commit()
        
        return jsonify({'message': 'Booking cancelled successfully'})
    except Exception as e:
        logger.error(f"Error cancelling booking: {str(e)}")
        return jsonify({'error': 'Failed to cancel booking'}), 500

@booking_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_booking_stats():
    try:
        # Get total bookings
        total_bookings = Booking.query.count()
        
        # Get bookings by status
        status_counts = db.session.query(
            Booking.booking_status, 
            db.func.count(Booking.id)
        ).group_by(Booking.booking_status).all()
        
        # Get most booked rooms
        most_booked = db.session.query(
            Room.room_number,
            db.func.count(Booking.id).label('booking_count')
        ).join(Booking).group_by(Room.id).order_by(
            db.text('booking_count DESC')
        ).limit(5).all()
        
        return jsonify({
            'totalBookings': total_bookings,
            'byStatus': dict(status_counts),
            'mostBooked': [
                {'roomNumber': room, 'count': count} 
                for room, count in most_booked
            ]
        })
        
    except Exception as e:
        logger.error(f"Error fetching booking stats: {str(e)}")
        return jsonify({'error': 'Failed to fetch booking statistics'}), 500