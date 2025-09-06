# EduConnect

EduConnect is an educational platform that helps students browse, compare, and save university courses. The application features a Django REST Framework backend and a React (Vite) frontend.

## Project Structure

The project is organized into two main folders:

- `backend/`: Django REST API with JWT authentication
- `frontend/`: React application built with Vite

## Features

- Browse universities and courses
- Compare courses side by side
- User authentication and authorization with JWT
- Role-based access control (student and admin roles)
- Admin dashboard for managing universities, courses, and users
- User dashboard for managing saved courses
- Responsive design with TailwindCSS

## Requirements

### Backend
- Python 3.10+
- Django 5.0+
- Django REST Framework
- djangorestframework-simplejwt

### Frontend
- Node.js 18+
- npm 9+
- React 18
- Vite 6+

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Apply migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at: http://localhost:8000/

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at: http://localhost:5173/

## API Endpoints

### Authentication
- `POST /api/auth/register/`: Register a new user
- `POST /api/auth/login/`: Log in a user
- `POST /api/auth/token/refresh/`: Refresh JWT token
- `GET /api/auth/me/`: Get current user profile

### Universities
- `GET /api/universities/`: List all universities
- `POST /api/universities/`: Create a new university (admin only)
- `GET /api/universities/:id/`: Get university details
- `PUT /api/universities/:id/`: Update university (admin only)
- `DELETE /api/universities/:id/`: Delete university (admin only)

### Courses
- `GET /api/courses/`: List all courses (with optional filtering)
- `POST /api/courses/`: Create a new course (admin only)
- `GET /api/courses/:id/`: Get course details
- `PUT /api/courses/:id/`: Update course (admin only)
- `DELETE /api/courses/:id/`: Delete course (admin only)

### User Saved Courses
- `GET /api/user/saved-courses/`: List user's saved courses
- `POST /api/user/saved-courses/`: Save a course
- `DELETE /api/user/saved-courses/`: Remove a saved course

### Admin
- `GET /api/users/`: List all users (admin only)

## Database Population

To populate the database with sample data:

```bash
cd backend
python manage.py populate_db
```

This will create sample universities, courses, and users for testing.

## User Roles

The application supports two user roles:

1. **Student**: Can browse, compare, and save courses
2. **Admin**: Can manage universities, courses, and users through the admin dashboard

## Deployment Notes

For production deployment:

1. Set appropriate environment variables for both backend and frontend
2. Configure a production database (PostgreSQL recommended)
3. Set up static file serving for the Django admin
4. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```
5. Serve the built frontend files using a web server (Nginx, Apache, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
