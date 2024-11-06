from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from database import db, jwt
from routes import auth_bp, booking_bp, payment_bp, room_bp, health_bp
from middleware.error_handler import register_error_handlers
from dotenv import load_dotenv
import os
import logging
from exceptions import APIError
import stripe

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Configure CORS properly
    CORS(app, 
         resources={r"/*": {"origins": ["http://localhost:3000"]}},
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    
    # Initialize Flask-Migrate
    migrate = Migrate(app, db)
    
    # Register error handlers
    register_error_handlers(app)
    
    # Add request logging
    @app.before_request
    def log_request_info():
        logger.info(f'Request: {request.method} {request.url}')
        logger.debug(f'Headers: {request.headers}')
        if request.is_json:
            logger.debug(f'Body: {request.get_json()}')

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        logger.info(f'Response: {response.status}')
        return response
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(booking_bp, url_prefix='/api/bookings')
    app.register_blueprint(payment_bp, url_prefix='/api/payments')
    app.register_blueprint(room_bp, url_prefix='/api/rooms')
    app.register_blueprint(health_bp, url_prefix='/api/health')
    
    with app.app_context():
        # Initialize Stripe
        stripe.api_key = app.config['STRIPE_SECRET_KEY']
    
    @app.errorhandler(APIError)
    def handle_api_error(error):
        return jsonify(error.to_dict()), error.status_code
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) 