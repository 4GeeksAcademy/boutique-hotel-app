from .base import BaseModel
from database import db

class RoomAvailability(BaseModel):
    __tablename__ = 'room_availability'
    
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    is_available = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'roomId': self.room_id,
            'date': self.date.isoformat(),
            'isAvailable': self.is_available
        } 