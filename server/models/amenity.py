from .base import BaseModel
from database import db

class Amenity(BaseModel):
    __tablename__ = 'amenities'
    
    amenity_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.amenity_name,
            'description': self.description,
            'iconUrl': self.icon_url
        } 