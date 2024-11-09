from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify, request

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Handle OPTIONS requests
        if request.method == 'OPTIONS':
            response = jsonify({'status': 'ok'})
            response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            return response
            
        try:
            verify_jwt_in_request()
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token'}), 401
    return decorated 