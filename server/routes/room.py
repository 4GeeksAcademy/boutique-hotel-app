from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Room, Booking
from database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

room_bp = Blueprint('room', __name__)

@room_bp.route('/', methods=['GET'])
def get_rooms():
    try:
        rooms = Room.query.all()
        return jsonify([room.to_dict() for room in rooms])
    except Exception as e:
        logger.error(f"Error fetching rooms: {str(e)}")
        return jsonify({'error': 'Failed to fetch rooms'}), 500

@room_bp.route('/<int:room_id>', methods=['GET'])
def get_room(room_id):
    try:
        room = Room.query.get_or_404(room_id)
        return jsonify(room.to_dict())
    except Exception as e:
        logger.error(f"Error fetching room {room_id}: {str(e)}")
        return jsonify({'error': 'Failed to fetch room'}), 500

@room_bp.route('/<int:room_id>/availability', methods=['POST'])
def check_availability(room_id):
    try:
        data = request.get_json()
        room = Room.query.get_or_404(room_id)
        
        check_in = datetime.strptime(data['checkIn'], '%Y-%m-%d').date()
        check_out = datetime.strptime(data['checkOut'], '%Y-%m-%d').date()
        
        # Check for overlapping bookings
        overlapping_bookings = Booking.query.filter(
            Booking.room_id == room_id,
            Booking.check_out_date > check_in,
            Booking.check_in_date < check_out,
            Booking.booking_status != 'cancelled'
        ).first()
        
        return jsonify({'available': not bool(overlapping_bookings)})
    except Exception as e:
        logger.error(f"Error checking room availability: {str(e)}")
        return jsonify({'error': 'Failed to check availability'}), 500

@room_bp.route('/<int:room_id>/amenities', methods=['GET'])
def get_room_amenities(room_id):
    try:
        room = Room.query.get_or_404(room_id)
        return jsonify([amenity.to_dict() for amenity in room.amenities])
    except Exception as e:
        logger.error(f"Error fetching room amenities: {str(e)}")
        return jsonify({'error': 'Failed to fetch amenities'}), 500

@room_bp.route('/search', methods=['GET'])
def search_rooms():
    try:
        # Get query parameters
        room_type = request.args.get('type')
        min_price = request.args.get('minPrice', type=float)
        max_price = request.args.get('maxPrice', type=float)
        capacity = request.args.get('capacity', type=int)
        
        # Build query
        query = Room.query
        
        if room_type:
            query = query.filter(Room.room_type == room_type)
        if min_price is not None:
            query = query.filter(Room.price_per_night >= min_price)
        if max_price is not None:
            query = query.filter(Room.price_per_night <= max_price)
        if capacity is not None:
            query = query.filter(Room.capacity >= capacity)
            
        rooms = query.all()
        return jsonify([room.to_dict() for room in rooms])
        
    except Exception as e:
        logger.error(f"Error searching rooms: {str(e)}")
        return jsonify({'error': 'Failed to search rooms'}), 500