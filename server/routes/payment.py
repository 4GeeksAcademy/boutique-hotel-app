from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import stripe
from models import Booking
from database import db
import logging

logger = logging.getLogger(__name__)
payment_bp = Blueprint('payment', __name__)

def init_stripe(app):
    stripe.api_key = app.config['STRIPE_SECRET_KEY']

@payment_bp.route('/create-intent', methods=['POST'])
@jwt_required()
def create_payment_intent():
    try:
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']  # Set stripe key within the route
        data = request.get_json()
        booking_id = data.get('bookingId')
        
        if not booking_id:
            return jsonify({'error': 'Booking ID is required'}), 400
            
        booking = Booking.query.get_or_404(booking_id)
        
        # Ensure user owns this booking
        current_user_id = get_jwt_identity()
        if booking.user_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        # Calculate amount (assuming price_per_night is in dollars, convert to cents)
        nights = (booking.check_out_date - booking.check_in_date).days
        amount = int(float(booking.room.price_per_night) * nights * 100)
        
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            metadata={
                'booking_id': booking_id,
                'user_id': current_user_id
            }
        )
        
        return jsonify({
            'clientSecret': intent.client_secret,
            'amount': amount
        })
        
    except Exception as e:
        logger.error(f"Error creating payment intent: {str(e)}")
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/webhook', methods=['POST'])
def webhook():
    try:
        stripe.api_key = current_app.config['STRIPE_SECRET_KEY']  # Set stripe key within the route
        payload = request.get_data()
        sig_header = request.headers.get('Stripe-Signature')
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, current_app.config['STRIPE_WEBHOOK_SECRET']
        )
        
        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object
            booking_id = payment_intent.metadata.get('booking_id')
            
            if booking_id:
                booking = Booking.query.get(booking_id)
                if booking:
                    booking.booking_status = Booking.STATUS_CONFIRMED
                    db.session.commit()
                    logger.info(f"Booking {booking_id} confirmed after successful payment")
                    
        return jsonify({'status': 'success'})
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        return jsonify({'error': str(e)}), 400