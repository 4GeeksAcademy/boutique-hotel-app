from database import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Room(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(10), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    price_per_night = db.Column(db.Numeric(10,2), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    image_urls = db.Column(db.JSON)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    
    bookings = db.relationship('Booking', backref='room', lazy=True)
    availabilities = db.relationship('RoomAvailability', backref='room', lazy=True)
    amenities = db.relationship('Amenity', secondary='room_amenities', lazy='subquery',
        backref=db.backref('rooms', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'roomNumber': self.room_number,
            'roomType': self.room_type,
            'description': self.description,
            'pricePerNight': float(self.price_per_night),
            'capacity': self.capacity,
            'isAvailable': self.is_available,
            'imageUrls': self.image_urls,
            'amenities': [amenity.to_dict() for amenity in self.amenities],
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    booking_status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

class Amenity(db.Model):
    __tablename__ = 'amenities'
    id = db.Column(db.Integer, primary_key=True)
    amenity_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.amenity_name,
            'description': self.description,
            'iconUrl': self.icon_url
        }

class RoomAvailability(db.Model):
    __tablename__ = 'room_availability'
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_available = db.Column(db.Boolean, default=True)

room_amenities = db.Table('room_amenities',
    db.Column('room_id', db.Integer, db.ForeignKey('rooms.id'), primary_key=True),
    db.Column('amenity_id', db.Integer, db.ForeignKey('amenities.id'), primary_key=True)
)