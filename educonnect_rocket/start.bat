@echo off
echo 🚀 Starting EduConnect with SQLite Backend...
echo.

echo 🔧 Starting backend server on http://localhost:3001
echo 🌐 Starting frontend on http://localhost:4028
echo.
echo 📚 Demo Accounts:
echo   Admin: admin@educonnect.com / admin123
echo   User:  user@educonnect.com / user123
echo.

REM Start both frontend and backend
npm run dev
