from app import db

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
    bookings = db.relationship('Booking', backref='room', lazy=True) 