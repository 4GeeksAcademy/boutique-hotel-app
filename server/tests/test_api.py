import pytest
from app import create_app, db
from models import User, Room, Booking

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/hotel_test_db'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_register(client):
    response = client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'password123',
        'firstName': 'Test',
        'lastName': 'User'
    })
    assert response.status_code == 201
    assert 'token' in response.json

def test_login(client):
    # First register a user
    client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    # Then try to login
    response = client.post('/api/auth/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert 'token' in response.json 