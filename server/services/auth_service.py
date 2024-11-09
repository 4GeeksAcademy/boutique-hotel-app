from models.user import User
from database import db
from flask_jwt_extended import create_access_token
from exceptions import AuthenticationError, ValidationError
import secrets
import datetime
import logging
import jwt
from flask import current_app

logger = logging.getLogger(__name__)

class AuthService:
    def register_user(self, data):
        try:
            logger.info(f"Starting user registration for email: {data['email']}")
            
            # Check if user already exists
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user:
                logger.warning(f"Email already registered: {data['email']}")
                raise AuthenticationError('Email already registered')

            # Create new user
            user = User(
                email=data['email'],
                first_name=data['firstName'],
                last_name=data['lastName']
            )
            user.set_password(data['password'])

            # Save to database
            logger.info("Saving new user to database")
            db.session.add(user)
            db.session.commit()
            logger.info(f"User saved successfully with id: {user.id}")

            # Create access token
            token = create_access_token(
                identity=user.id,
                expires_delta=datetime.timedelta(days=1)
            )
            logger.info("Access token created successfully")

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

            # Create access token
            token = create_access_token(
                identity=user.id,
                expires_delta=datetime.timedelta(days=1)
            )
            logger.info(f"Login successful for user: {email}")
            
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
            logger.info(f"Fetching user by id: {user_id}")
            user = User.query.get(user_id)
            if not user:
                logger.warning(f"No user found with id: {user_id}")
                return None
            logger.info(f"User found: {user.email}")
            return user
        except Exception as e:
            logger.error(f"Error getting user by id {user_id}: {str(e)}")
            return None

    def update_user_profile(self, user_id, data):
        try:
            logger.info(f"Updating profile for user {user_id}")
            user = User.query.get(user_id)
            
            if not user:
                raise ValidationError('User not found')
                
            # Update fields
            if 'firstName' in data:
                user.first_name = data['firstName']
            if 'lastName' in data:
                user.last_name = data['lastName']
            if 'email' in data:
                existing_user = User.query.filter_by(email=data['email']).first()
                if existing_user and existing_user.id != user_id:
                    raise ValidationError('Email already taken')
                user.email = data['email']
            if 'phone' in data:
                user.phone = data['phone']
                
            db.session.commit()
            logger.info(f"Profile updated successfully for user {user_id}")
            
            return user
            
        except Exception as e:
            logger.error(f"Error updating user profile: {str(e)}")
            db.session.rollback()
            raise

    @staticmethod
    def get_current_user(user_id):
        try:
            logger.info(f"Fetching current user with ID: {user_id}")
            user = User.query.get(user_id)
            
            if not user:
                logger.warning(f"No user found with ID: {user_id}")
                return None
                
            logger.info(f"Successfully fetched user: {user.email}")
            return user
            
        except Exception as e:
            logger.error(f"Error fetching current user: {str(e)}")
            raise

    @staticmethod
    def verify_token(token):
        try:
            logger.info("Verifying JWT token")
            decoded = jwt.decode(token, current_app.config['JWT_SECRET_KEY'])
            return decoded
        except jwt.ExpiredSignatureError:
            logger.warning("Token has expired")
            raise AuthenticationError('Token has expired')
        except jwt.InvalidTokenError:
            logger.warning("Invalid token")
            raise AuthenticationError('Invalid token')
        except Exception as e:
            logger.error(f"Error verifying token: {str(e)}")
            raise