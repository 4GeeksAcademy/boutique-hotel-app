from models.user import User
from database import db
from flask_jwt_extended import create_access_token
from exceptions import AuthenticationError, ValidationError
import secrets
import datetime
import logging

logger = logging.getLogger(__name__)

class AuthService:
    def register_user(self, data):
        try:
            # Check if user already exists
            if User.query.filter_by(email=data['email']).first():
                raise AuthenticationError('Email already registered')

            # Create new user
            user = User(
                email=data['email'],
                first_name=data['firstName'],
                last_name=data['lastName']
            )
            user.set_password(data['password'])

            # Save to database
            db.session.add(user)
            db.session.commit()

            # Create access token
            token = create_access_token(identity=user.id)

            return token, user

        except Exception as e:
            logger.error(f"Error in register_user: {str(e)}")
            db.session.rollback()
            raise

    def login_user(self, email, password):
        try:
            logger.info(f"Attempting login for email: {email}")
            user = User.query.filter_by(email=email).first()
            
            if not user:
                logger.warning(f"No user found with email: {email}")
                raise AuthenticationError('Invalid email or password')

            if not user.check_password(password):
                logger.warning(f"Invalid password for user: {email}")
                raise AuthenticationError('Invalid email or password')

            logger.info(f"Login successful for user: {email}")
            token = create_access_token(identity=user.id)
            return token, user

        except AuthenticationError as e:
            logger.error(f"Authentication error: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error in login_user: {str(e)}")
            raise

    @staticmethod
    def get_user_by_id(user_id):
        try:
            return User.query.get(user_id)
        except Exception as e:
            logger.error(f"Error getting user by id {user_id}: {str(e)}")
            return None