from app import create_app, db

def test_connection():
    app = create_app()
    with app.app_context():
        try:
            # Try to execute a simple query
            result = db.session.execute('SELECT 1')
            print("Database connection successful!")
            return True
        except Exception as e:
            print(f"Database connection failed: {str(e)}")
            return False

if __name__ == '__main__':
    test_connection() 