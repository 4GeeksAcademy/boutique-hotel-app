from flask import jsonify
from werkzeug.exceptions import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from exceptions import APIError
import logging

logger = logging.getLogger(__name__)

def register_error_handlers(app):
    @app.errorhandler(APIError)
    def handle_api_error(error):
        logger.error(f"API Error: {error.message}")
        return jsonify(error.to_dict()), error.status_code

    @app.errorhandler(HTTPException)
    def handle_http_error(error):
        logger.error(f"HTTP Error: {error}")
        response = {
            'error': {
                'code': error.code,
                'message': error.description
            }
        }
        return jsonify(response), error.code

    @app.errorhandler(SQLAlchemyError)
    def handle_db_error(error):
        logger.error(f"Database Error: {str(error)}")
        response = {
            'error': {
                'code': 500,
                'message': 'A database error occurred'
            }
        }
        return jsonify(response), 500

    @app.errorhandler(Exception)
    def handle_generic_error(error):
        logger.error(f"Unexpected Error: {str(error)}")
        response = {
            'error': {
                'code': 500,
                'message': 'An unexpected error occurred'
            }
        }
        return jsonify(response), 500 