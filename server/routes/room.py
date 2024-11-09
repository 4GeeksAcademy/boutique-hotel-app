from flask import Blueprint, request, jsonify
from services.api_service import APIService
from models import Room
import logging

logger = logging.getLogger(__name__)
room_bp = Blueprint('room', __name__)
api_service = APIService()

@room_bp.route('', methods=['GET'])
def get_rooms():
    """Get all rooms"""
    logger.info("GET /api/rooms request received")
    data = api_service.get_rooms()
    return api_service.handle_response(data)

@room_bp.route('/<int:room_id>', methods=['GET'])
def get_room(room_id):
    """Get single room"""
    logger.info(f"GET /api/rooms/{room_id} request received")
    data = api_service.get_room(room_id)
    return api_service.handle_response(data)