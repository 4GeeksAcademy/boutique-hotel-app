from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)

@health_bp.route('/check', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    }) 