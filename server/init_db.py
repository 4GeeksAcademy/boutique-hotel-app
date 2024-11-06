from app import create_app, db
from models import User, Room, Booking
from sqlalchemy import inspect

def init_db():
    app = create_app()
    with app.app_context():
        # Drop all tables
        db.drop_all()
        
        # Create all tables
        db.create_all()
        
        # Verify tables were created
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        print("Created tables:", tables)

        # Add some test data
        test_user = User(
            email='test@example.com',
            first_name='Test',
            last_name='User'
        )
        test_user.set_password('password123')
        db.session.add(test_user)

        test_room = Room(
            room_number='101',
            room_type='Deluxe',
            description='A luxurious room with ocean view',
            price_per_night=199.99,
            capacity=2,
            is_available=True,
            image_urls=['url1', 'url2']
        )
        db.session.add(test_room)
        
        db.session.commit()
        print("Added test data successfully!")

if __name__ == '__main__':
    init_db() 