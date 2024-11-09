from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from database import db, jwt
from routes import auth_bp, booking_bp, payment_bp, room_bp, health_bp
from middleware.error_handler import register_error_handlers
from dotenv import load_dotenv
import os
import logging
import stripe
import datetime

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    # Configure JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
    
    # Configure CORS
    CORS(app,
         resources={
             r"/api/*": {
                 "origins": ["http://localhost:3000"],
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization"],
                 "supports_credentials": True,
                 "expose_headers": ["Content-Type", "Authorization"]
             }
         })
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate = Migrate(app, db)
    
    register_error_handlers(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(booking_bp, url_prefix='/api/bookings')
    app.register_blueprint(payment_bp, url_prefix='/api/payments')
    app.register_blueprint(room_bp, url_prefix='/api/rooms')
    app.register_blueprint(health_bp, url_prefix='/api/health')
    
    with app.app_context():
        stripe.api_key = app.config['STRIPE_SECRET_KEY']
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)