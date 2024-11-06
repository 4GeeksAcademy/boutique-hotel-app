from .base import BaseModel
from database import db
from datetime import datetime

class Booking(BaseModel):
    __tablename__ = 'bookings'
    
    # Booking status constants
    STATUS_PENDING = 'pending'
    STATUS_CONFIRMED = 'confirmed'
    STATUS_CANCELLED = 'cancelled'
    
    VALID_STATUSES = [STATUS_PENDING, STATUS_CONFIRMED, STATUS_CANCELLED]
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    booking_status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, user_id, room_id, check_in_date, check_out_date, booking_status=STATUS_PENDING):
        self.user_id = user_id
        self.room_id = room_id
        self.check_in_date = check_in_date
        self.check_out_date = check_out_date
        if booking_status not in self.VALID_STATUSES:
            raise ValueError(f"Invalid booking status. Must be one of: {', '.join(self.VALID_STATUSES)}")
        self.booking_status = booking_status

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'roomId': self.room_id,
            'checkInDate': self.check_in_date.isoformat(),
            'checkOutDate': self.check_out_date.isoformat(),
            'bookingStatus': self.booking_status,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

    def confirm(self):
        """Confirm the booking"""
        self.booking_status = self.STATUS_CONFIRMED
        
    def cancel(self):
        """Cancel the booking"""
        self.booking_status = self.STATUS_CANCELLED