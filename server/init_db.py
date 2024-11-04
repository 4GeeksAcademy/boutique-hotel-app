from app import app, db
from datetime import datetime

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()

        # Add sample rooms if they don't exist
        from app import Room
        if not Room.query.first():
            sample_rooms = [
                {
                    'room_number': '101',
                    'room_type': 'Deluxe King',
                    'price_per_night': 299.99,
                    'capacity': 2,
                    'description': 'Luxurious room with king-size bed and city view',
                    'amenities': ['WiFi', 'Mini Bar', 'Room Service', 'TV'],
                    'image_urls': ['/images/rooms/deluxe-king-1.jpg'],
                    'is_available': True
                },
                {
                    'room_number': '102',
                    'room_type': 'Double Queen',
                    'price_per_night': 349.99,
                    'capacity': 4,
                    'description': 'Spacious room with two queen beds',
                    'amenities': ['WiFi', 'Mini Bar', 'Room Service', 'TV'],
                    'image_urls': ['/images/rooms/double-queen-1.jpg'],
                    'is_available': True
                },
                {
                    'room_number': '201',
                    'room_type': 'Executive Suite',
                    'price_per_night': 499.99,
                    'capacity': 2,
                    'description': 'Luxury suite with separate living area',
                    'amenities': ['WiFi', 'Mini Bar', 'Room Service', 'TV', 'Jacuzzi'],
                    'image_urls': ['/images/rooms/executive-suite-1.jpg'],
                    'is_available': True
                }
            ]

            for room_data in sample_rooms:
                room = Room(**room_data)
                db.session.add(room)

            db.session.commit()
            print("Sample rooms added successfully!")

if __name__ == '__main__':
    init_db() 