from database import db
import logging
from exceptions import ValidationError, AuthenticationError

logger = logging.getLogger(__name__)

class BaseService:
    @staticmethod
    def commit_changes():
        try:
            db.session.commit()
            return True
        except Exception as e:
            logger.error(f"Error committing changes: {str(e)}")
            db.session.rollback()
            raise

    @staticmethod
    def add_to_session(model):
        try:
            db.session.add(model)
            return True
        except Exception as e:
            logger.error(f"Error adding to session: {str(e)}")
            raise

    @staticmethod
    def validate_required_fields(data, required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            raise ValidationError(f"Missing required fields: {', '.join(missing_fields)}")

    @staticmethod
    def check_ownership(model, user_id):
        if model.user_id != user_id:
            raise AuthenticationError("Unauthorized access")