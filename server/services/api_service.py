from flask import jsonify
from models import Room, User, Booking
import logging

logger = logging.getLogger(__name__)

class APIService:
    @staticmethod
    def handle_response(data, status_code=200):
        """Standardize API responses"""
        if isinstance(data, dict) and 'error' in data:
            success = False
        else:
            success = True
            
        response = {
            'success': success,
            'data': data
        }
        
        if not success:
            response['error'] = data['error']
            
        return jsonify(response), status_code

    @staticmethod
    def get_rooms():
        """Get all rooms with error handling"""
        try:
            rooms = Room.query.all()
            return [room.to_dict() for room in rooms]
        except Exception as e:
            logger.error(f"Error fetching rooms: {str(e)}")
            return {'error': 'Failed to fetch rooms'}

    @staticmethod
    def get_room(room_id):
        """Get single room with error handling"""
        try:
            room = Room.query.get(room_id)
            if not room:
                return {'error': 'Room not found'}, 404
            return room.to_dict()
        except Exception as e:
            logger.error(f"Error fetching room {room_id}: {str(e)}")
            return {'error': 'Failed to fetch room'}