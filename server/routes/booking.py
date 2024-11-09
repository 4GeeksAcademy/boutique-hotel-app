from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Booking, Room
from database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
booking_bp = Blueprint('booking', __name__)

@booking_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    try:
        logger.info("Received booking creation request")
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        logger.info(f"Booking data received: {data}")
        logger.info(f"Current user ID: {current_user_id}")
        
        if not data:
            raise ValueError("No data provided")
            
        required_fields = ['roomId', 'checkInDate', 'checkOutDate']
        for field in required_fields:
            if field not in data:
                raise ValueError(f"{field} is required")
        
        # Validate dates
        check_in = datetime.strptime(data['checkInDate'], '%Y-%m-%d').date()
        check_out = datetime.strptime(data['checkOutDate'], '%Y-%m-%d').date()
        
        if check_in >= check_out:
            raise ValueError("Check-out date must be after check-in date")
            
        today = datetime.now().date()
        if check_in < today:
            raise ValueError("Check-in date cannot be in the past")
        
        logger.info(f"Looking for room with ID: {data['roomId']}")
        # Check if room exists and is available
        room = Room.query.get_or_404(data['roomId'])
        logger.info(f"Found room: {room.to_dict()}")
        
        if not room.is_available:
            raise ValueError('Room not available')
            
        # Check for overlapping bookings
        overlapping_booking = Booking.query.filter(
            Booking.room_id == data['roomId'],
            Booking.check_out_date > check_in,
            Booking.check_in_date < check_out,
            Booking.booking_status != 'cancelled'
        ).first()
        
        if overlapping_booking:
            raise ValueError('Room is already booked for these dates')
            
        # Calculate number of nights
        nights = (check_out - check_in).days
        
        # Create booking
        booking = Booking(
            user_id=current_user_id,
            room_id=data['roomId'],
            check_in_date=check_in,
            check_out_date=check_out,
            booking_status='pending',
            number_of_nights=nights,
            total_price=room.price_per_night * nights
        )
        
        db.session.add(booking)
        db.session.commit()
        
        logger.info(f"Booking created successfully: {booking.id}")
        return jsonify(booking.to_dict()), 201
        
    except ValueError as e:
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
        logger.info(f"Fetching bookings for user: {current_user_id}")
        bookings = Booking.query.filter_by(user_id=current_user_id).all()
        return jsonify([booking.to_dict() for booking in bookings])
    except Exception as e:
        logger.error(f"Error fetching user bookings: {str(e)}")
        return jsonify({'error': 'Failed to fetch bookings'}), 500

@booking_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get_or_404(booking_id)
        
        # Ensure user owns this booking
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        return jsonify(booking.to_dict())
    except Exception as e:
        logger.error(f"Error fetching booking: {str(e)}")
        return jsonify({'error': 'Failed to fetch booking'}), 500

@booking_bp.route('/<int:booking_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_booking(booking_id):
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get_or_404(booking_id)
        
        # Ensure user owns this booking
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Can't cancel confirmed bookings
        if booking.booking_status == 'confirmed':
            return jsonify({'error': 'Cannot cancel confirmed booking'}), 400
            
        booking.booking_status = 'cancelled'
        db.session.commit()
        
        return jsonify({
            'message': 'Booking cancelled successfully',
            'booking': booking.to_dict()
        })
    except Exception as e:
        logger.error(f"Error cancelling booking: {str(e)}")
        return jsonify({'error': 'Failed to cancel booking'}), 500