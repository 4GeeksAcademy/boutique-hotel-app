from flask import Blueprint, jsonify
from .auth import auth_bp
from .booking import booking_bp
from .payment import payment_bp
from .room import room_bp

# Create a health check blueprint
health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running'
    })

__all__ = ['auth_bp', 'booking_bp', 'payment_bp', 'room_bp', 'health_bp'] 