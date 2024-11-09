from flask import jsonify
from exceptions import AuthenticationError, ValidationError, APIError
from flask_jwt_extended.exceptions import JWTExtendedException
from jwt.exceptions import PyJWTError

def register_error_handlers(app):
    @app.errorhandler(AuthenticationError)
    @app.errorhandler(ValidationError)
    @app.errorhandler(APIError)
    def handle_api_error(error):
        return jsonify({
            'error': str(error),
            'status': error.status_code
        }), error.status_code

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            'error': 'Resource not found',
            'status': 404
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            'error': 'Internal server error',
            'status': 500
        }), 500

    @app.errorhandler(JWTExtendedException)
    @app.errorhandler(PyJWTError)
    def handle_jwt_error(error):
        return jsonify({
            'error': 'Invalid or expired token',
            'status': 401
        }), 401 