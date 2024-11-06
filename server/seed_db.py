from app import create_app, db
from models import User, Room, Booking
from datetime import datetime

def seed_db():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.session.query(Booking).delete()
        db.session.query(Room).delete()
        db.session.commit()

        # Create test rooms
        rooms = [
            Room(
                room_number='101',
                room_type='Deluxe',
                description='A luxurious room with ocean view',
                price_per_night=199.99,
                capacity=2,
                is_available=True,
                image_urls=['url1', 'url2']
            ),
            Room(
                room_number='102',
                room_type='Suite',
                description='Spacious suite with living area',
                price_per_night=299.99,
                capacity=4,
                is_available=True,
                image_urls=['url3', 'url4']
            )
        ]
        
        for room in rooms:
            db.session.add(room)
        
        db.session.commit()
        print("Test rooms created successfully!")

if __name__ == '__main__':
    seed_db() 