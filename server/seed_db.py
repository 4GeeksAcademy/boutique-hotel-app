from app import create_app, db
from models import Room
import logging

logger = logging.getLogger(__name__)

def seed_db():
    app = create_app()
    with app.app_context():
        try:
            # Clear existing data
            logger.info("Clearing existing rooms...")
            db.session.query(Room).delete()
            db.session.commit()

            # Room configurations with local image filenames
            room_configs = [
                {
                    'type': 'Deluxe',
                    'description': 'Luxurious room with ocean view, king-size bed, and private balcony',
                    'price': 299.99,
                    'capacity': 2,
                    'images': [
                        'deluxe1.jpg',
                        'deluxe2.jpg',
                        'deluxe3.jpg'
                    ]
                },
                {
                    'type': 'Suite',
                    'description': 'Spacious suite with separate living area, kitchenette, and city view',
                    'price': 499.99,
                    'capacity': 4,
                    'images': [
                        'suite1.jpg',
                        'suite2.jpg',
                        'suite3.jpg'
                    ]
                },
                {
                    'type': 'Standard',
                    'description': 'Comfortable room with all essential amenities',
                    'price': 199.99,
                    'capacity': 2,
                    'images': [
                        'standard1.jpg',
                        'standard2.jpg'
                    ]
                }
            ]

            # Create multiple rooms for each type
            for config in room_configs:
                for _ in range(3):  # Create 3 rooms of each type
                    room = Room(
                        room_type=config['type'],
                        description=config['description'],
                        price_per_night=config['price'],
                        capacity=config['capacity'],
                        is_available=True,
                        image_urls=config['images']
                    )
                    # Generate room number
                    room.room_number = Room.generate_room_number(room.room_type)
                    db.session.add(room)
                    logger.info(f"Created {room.room_type} room: {room.room_number}")

            db.session.commit()
            logger.info("Database seeded successfully!")

        except Exception as e:
            logger.error(f"Error seeding database: {str(e)}")
            db.session.rollback()
            raise

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    seed_db() 