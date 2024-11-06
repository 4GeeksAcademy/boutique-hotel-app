from .base import BaseModel
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
import logging

logger = logging.getLogger(__name__)

class User(BaseModel):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def __init__(self, email, first_name=None, last_name=None):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

    def set_password(self, password):
        try:
            self.password_hash = generate_password_hash(password)
        except Exception as e:
            logger.error(f"Error setting password: {str(e)}")
            raise

    def check_password(self, password):
        try:
            return check_password_hash(self.password_hash, password)
        except Exception as e:
            logger.error(f"Error checking password: {str(e)}")
            return False

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @classmethod
    def get_by_email(cls, email):
        try:
            return cls.query.filter_by(email=email).first()
        except Exception as e:
            logger.error(f"Error getting user by email: {str(e)}")
            return None

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return self
        except Exception as e:
            logger.error(f"Error saving user: {str(e)}")
            db.session.rollback()
            raise

    @classmethod
    def get_by_id(cls, id):
        try:
            return cls.query.get(id)
        except Exception as e:
            logger.error(f"Error getting user by id: {str(e)}")
            return None