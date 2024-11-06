from .base import BaseModel
from database import db
from datetime import datetime

class Room(BaseModel):
    __tablename__ = 'rooms'
    
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(10), nullable=False, unique=True)
    room_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    price_per_night = db.Column(db.Numeric(10, 2), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    image_urls = db.Column(db.JSON)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    bookings = db.relationship('Booking', backref='room', lazy=True)

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
            'createdAt': self.created_at.isoformat() if self.created_at else None
        } 