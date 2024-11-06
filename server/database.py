from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import logging

logger = logging.getLogger(__name__)

class SafeSQLAlchemy(SQLAlchemy):
    def connect_db(self):
        try:
            return super().connect_db()
        except Exception as e:
            logger.error(f"Database connection failed: {str(e)}")
            raise

db = SafeSQLAlchemy()
jwt = JWTManager() 