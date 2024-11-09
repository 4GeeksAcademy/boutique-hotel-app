from flask import Blueprint, request, jsonify, current_app
from services.auth_service import AuthService
from exceptions import AuthenticationError, ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
import traceback
from models import User
from database import db

logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)

def validate_register_data(data):
    required_fields = ['email', 'password', 'firstName', 'lastName']
    for field in required_fields:
        if not data.get(field):
            raise ValidationError(f'{field} is required')
    
    if len(data['password']) < 6:
        raise ValidationError('Password must be at least 6 characters long')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        logger.info("Received registration request")
        logger.info(f"Headers: {request.headers}")
        data = request.get_json()
        logger.info(f"Request data: {data}")
        
        if not data:
            logger.error("No data provided in registration request")
            raise ValidationError('No data provided')
            
        logger.info(f"Validating registration data: {data}")
        validate_register_data(data)
        
        # Create AuthService instance
        auth_service = AuthService()
        
        logger.info("Creating new user")
        token, user = auth_service.register_user(data)
        
        logger.info(f"User created successfully: {user.email}")
        return jsonify({
            'token': token,
            'user': user.to_dict(),
            'message': 'Registration successful'
        }), 201
        
    except (AuthenticationError, ValidationError) as e:
        logger.error(f"Registration validation error: {str(e)}")
        return jsonify({'error': str(e)}), e.status_code
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}")
        logger.error(traceback.format_exc())  # Log the full traceback
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    """Handle login requests"""
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        return response

    try:
        logger.info("Login request received")
        data = request.get_json()
        
        if not data:
            logger.error("No data provided in login request")
            raise ValidationError('No data provided')
            
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise ValidationError('Email and password are required')
            
        # Create AuthService instance
        auth_service = AuthService()
        token, user = auth_service.login_user(email, password)
        
        if not user:
            raise AuthenticationError('Invalid credentials')
        
        logger.info(f"Login successful for user: {email}")
        response = jsonify({
            'token': token,
            'user': user.to_dict(),
            'message': 'Login successful'
        })
        
        # Set token in cookie for better security
        response.set_cookie(
            'token',
            token,
            httponly=True,
            secure=False,  # Set to True in production with HTTPS
            samesite='Lax',
            max_age=86400  # 24 hours
        )
        
        # Add CORS headers explicitly for this response
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        
        return response
        
    except (AuthenticationError, ValidationError) as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': str(e)}), e.status_code
    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        current_user_id = get_jwt_identity()
        logger.info(f"Fetching current user with ID: {current_user_id}")
        
        user = User.query.get(current_user_id)
        if not user:
            logger.error(f"No user found with ID: {current_user_id}")
            return jsonify({'error': 'User not found'}), 404
            
        logger.info(f"Successfully fetched user: {user.email}")
        return jsonify(user.to_dict())
        
    except Exception as e:
        logger.error(f"Error in get_current_user: {str(e)}")
        logger.error(traceback.format_exc())  # Log the full traceback
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        if not data.get('email'):
            raise ValidationError('Email is required')
            
        reset_token = AuthService.initiate_password_reset(data['email'])
        
        # In development, return the token for testing
        response = {
            'message': 'If an account exists with this email, you will receive password reset instructions'
        }
        if app.debug:
            response['resetToken'] = reset_token
            
        return jsonify(response)
        
    except ValidationError as e:
        return jsonify({'error': str(e)}), e.status_code
    except Exception as e:
        # Don't expose whether the email exists or not
        return jsonify({
            'message': 'If an account exists with this email, you will receive password reset instructions'
        })

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        if not data.get('token') or not data.get('password'):
            raise ValidationError('Token and new password are required')
            
        if len(data['password']) < 6:
            raise ValidationError('Password must be at least 6 characters long')
            
        AuthService.reset_password(data['token'], data['password'])
        return jsonify({'message': 'Password reset successful'})
        
    except (AuthenticationError, ValidationError) as e:
        return jsonify({'error': str(e)}), e.status_code
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get_or_404(current_user_id)
        data = request.get_json()
        logger.info(f"Updating profile for user {current_user_id} with data: {data}")
        
        # Validate data
        if not data:
            raise ValidationError('No data provided')
            
        # Update fields if provided
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and existing_user.id != current_user_id:
                raise ValidationError('Email already taken')
            user.email = data['email']
        if 'phone' in data:
            user.phone = data['phone']
            
        # Add any additional fields you want to update
        
        db.session.commit()
        logger.info(f"Profile updated successfully for user {current_user_id}")
        
        # Return updated user data
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        })
        
    except ValidationError as e:
        logger.error(f"Validation error updating profile: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        db.session.rollback()
        return jsonify({'error': 'Failed to update profile'}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        # Get current user
        current_user_id = get_jwt_identity()
        logger.info(f"User {current_user_id} logging out")
        
        # Here you could add any server-side cleanup needed
        # For example, if you implement token blacklisting in the future
        
        return jsonify({
            'message': 'Successfully logged out',
            'status': 'success'
        })
        
    except Exception as e:
        logger.error(f"Error during logout: {str(e)}")
        return jsonify({'error': 'Logout failed'}), 500

@auth_bp.route('/test-auth', methods=['GET'])
@jwt_required()
def test_auth():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        return jsonify({
            'message': 'Authentication successful',
            'user': user.to_dict()
        })
    except Exception as e:
        logger.error(f"Test auth error: {str(e)}")
        return jsonify({'error': str(e)}), 500