#!/bin/bash

echo "🚀 Starting EduConnect with SQLite Backend..."
echo ""

# Kill any existing processes on ports 3001 and 4028
echo "Cleaning up existing processes..."
npx kill-port 3001 2>/dev/null || true
npx kill-port 4028 2>/dev/null || true

echo ""
echo "🔧 Starting backend server on http://localhost:3001"
echo "🌐 Starting frontend on http://localhost:4028"
echo ""
echo "📚 Demo Accounts:"
echo "  Admin: admin@educonnect.com / admin123"
echo "  User:  user@educonnect.com / user123"
echo ""

# Start both frontend and backend
npm run dev
