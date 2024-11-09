from app import create_app, db
from models import Room, User, Booking
import logging
from sqlalchemy import text

logger = logging.getLogger(__name__)

def init_db():
    """Initialize database with sample data"""
    app = create_app()
    
    try:
        with app.app_context():
            logger.info("Dropping all tables...")
            
            # For PostgreSQL, use this instead of FOREIGN_KEY_CHECKS
            db.session.execute(text('''
                DO $$ DECLARE
                    r RECORD;
                BEGIN
                    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
                        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
                    END LOOP;
                END $$;
            '''))
            
            db.session.commit()
            
            logger.info("Creating all tables...")
            db.create_all()
            
            # Create sample rooms
            rooms = [
                Room(
                    room_type="Standard",
                    room_number="S101",
                    description="Comfortable room with basic amenities",
                    price_per_night=99.99,
                    capacity=2,
                    image_urls=[
                        "standard1.jpg",
                        "standard2.jpg"
                    ]
                ),
                Room(
                    room_type="Deluxe",
                    room_number="D201",
                    description="Spacious room with premium amenities",
                    price_per_night=199.99,
                    capacity=3,
                    image_urls=[
                        "deluxe1.jpg",
                        "deluxe2.jpg"
                    ]
                ),
                Room(
                    room_type="Suite",
                    room_number="S301",
                    description="Luxury suite with separate living area",
                    price_per_night=299.99,
                    capacity=4,
                    image_urls=[
                        "suite1.jpg",
                        "suite2.jpg"
                    ]
                )
            ]
            
            # Create test user
            test_user = User(
                email='test@example.com',
                first_name='Test',
                last_name='User'
            )
            test_user.set_password('password123')
            
            # Add all to session
            db.session.add(test_user)
            for room in rooms:
                db.session.add(room)
            
            logger.info("Committing changes...")
            db.session.commit()
            
            logger.info("Database initialized successfully!")
            
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        with app.app_context():
            db.session.rollback()
        raise

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    init_db()