from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://localhost/hotel_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Room model
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(10), unique=True, nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    price_per_night = db.Column(db.Numeric(10, 2), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    amenities = db.Column(db.JSON)
    is_available = db.Column(db.Boolean, default=True)
    image_urls = db.Column(db.JSON)

# Booking model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    user = User(
        email=data['email'],
        first_name=data.get('firstName'),
        last_name=data.get('lastName')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/auth/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        'id': user.id,
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name
    })

# Room routes
@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{
        'id': room.id,
        'roomNumber': room.room_number,
        'roomType': room.room_type,
        'pricePerNight': float(room.price_per_night),
        'capacity': room.capacity,
        'description': room.description,
        'amenities': room.amenities,
        'isAvailable': room.is_available,
        'imageUrls': room.image_urls
    } for room in rooms])

@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    room = Room.query.get(data['roomId'])
    if not room or not room.is_available:
        return jsonify({'error': 'Room not available'}), 400
        
    booking = Booking(
        user_id=current_user_id,
        room_id=data['roomId'],
        check_in_date=datetime.strptime(data['checkIn'], '%Y-%m-%d').date(),
        check_out_date=datetime.strptime(data['checkOut'], '%Y-%m-%d').date(),
        total_price=data['totalPrice'],
        status='confirmed'
    )
    
    db.session.add(booking)
    room.is_available = False
    db.session.commit()
    
    return jsonify({'message': 'Booking confirmed', 'bookingId': booking.id}), 201

@app.route('/api/rooms/<int:room_id>', methods=['GET'])
def get_room(room_id):
    room = Room.query.get_or_404(room_id)
    return jsonify({
        'id': room.id,
        'roomNumber': room.room_number,
        'roomType': room.room_type,
        'pricePerNight': float(room.price_per_night),
        'capacity': room.capacity,
        'description': room.description,
        'amenities': room.amenities,
        'isAvailable': room.is_available,
        'imageUrls': room.image_urls
    })

@app.route('/api/bookings/user', methods=['GET'])
@jwt_required()
def get_user_bookings():
    current_user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=current_user_id).all()
    return jsonify([{
        'id': booking.id,
        'roomId': booking.room_id,
        'checkInDate': booking.check_in_date.isoformat(),
        'checkOutDate': booking.check_out_date.isoformat(),
        'totalPrice': float(booking.total_price),
        'status': booking.status,
        'room': {
            'roomType': booking.room.room_type,
            'roomNumber': booking.room.room_number
        }
    } for booking in bookings])

# Add this after your other routes
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

# Create a directory for static files
UPLOAD_FOLDER = os.path.join(app.root_path, 'static/images')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if __name__ == '__main__':
    app.run(debug=True) 