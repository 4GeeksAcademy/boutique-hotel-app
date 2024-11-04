# Luxury Hotel Booking System

A full-stack hotel booking application built with a Flask backend and React frontend.

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL
- pip (Python package manager)
- npm (Node package manager)

## Project Structure

```
hotel-website/
├── client/    # React frontend
└── server/    # Flask backend
```

## Quick Start

### Backend Setup

1. **Create and activate the virtual environment:**

   ```bash
   cd server
   python -m venv venv
   ```

   - **On Windows:**
     ```bash
     venv\Scripts\activate
     ```

   - **On macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**

   - In the `server` directory, create a `.env` file:

     ```bash
     echo "DATABASE_URL=postgresql://localhost/hotel_db
     JWT_SECRET_KEY=your-secret-key-here
     STRIPE_SECRET_KEY=your-stripe-secret-key
     STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret" > .env
     ```

4. **Initialize the database:**

   ```bash
   createdb hotel_db
   python init_db.py
   ```

5. **Run the Flask server:**

   ```bash
   python run.py
   ```

   The server will run on [http://localhost:5001](http://localhost:5001).

### Frontend Setup

1. **Install dependencies and start the React app:**

   ```bash
   cd client
   npm install
   ```

2. **Create environment variables for the frontend:**

   - Create a `.env` file in the `client` directory:

     ```bash
     echo "REACT_APP_API_URL=http://localhost:5001
     REACT_APP_ENV=development" > .env
     ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The frontend will run on [http://localhost:3000](http://localhost:3000).

## Available API Endpoints

- **Authentication:**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - User login
  - `GET /api/auth/user` - Get current user details

- **Rooms:**
  - `GET /api/rooms` - List all available rooms
  - `GET /api/rooms/:id` - Get details of a specific room

- **Bookings:**
  - `POST /api/bookings` - Create a new booking
  - `GET /api/bookings/user` - Retrieve bookings for the logged-in user

## Features

- User authentication and authorization
- Room listing with detailed views
- Room booking system
- Booking management for users
- Responsive design
- Real-time room availability updates

## Tech Stack

### Backend
- Flask
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Flask-Migrate

### Frontend
- React.js
- Context API for state management
- Axios for API requests
- TailwindCSS for styling
- React Router for navigation

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
