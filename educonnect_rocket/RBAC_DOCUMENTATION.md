# Role-Based Access Control (RBAC) Documentation

## Overview
This project implements a comprehensive role-based access control system that restricts access to different features based on user roles.

## User Roles

### 1. Regular User/Student (Default)
- **Role:** `user` or `student`
- **Access:** 
  - Homepage
  - Course search and details
  - University profiles
  - User dashboard
  - Course comparison
  - Save/bookmark courses
- **Restrictions:** Cannot access admin panel

### 2. Admin User
- **Role:** `admin` or `administrator`
- **Access:** 
  - All regular user features
  - Admin panel with full system management
  - User management (view, edit, suspend)
  - Course management (approve, reject)
  - University management (verify institutions)
  - System settings and analytics
- **Special UI:** Admin Panel link shown in navigation

## How It Works

### 1. Authentication Context (`AuthContext.jsx`)
```javascript
// Role checking functions
getUserRole() - Returns user's role from metadata
isAdmin() - Checks if user has admin privileges
isUser() - Checks if user is regular user/student
hasRole(role) - Generic role checking function
```

### 2. Route Protection

#### Regular Protected Routes (`ProtectedRoute.jsx`)
- Requires user to be logged in
- Used for: dashboard, course comparison

#### Admin Protected Routes (`AdminRoute.jsx`)
- Requires user to be logged in AND have admin role
- Used for: admin panel
- Shows access denied page for non-admin users

### 3. UI Components

#### Header Navigation
- Shows different navigation items based on user role
- Admin Panel link only visible to admin users
- Styled differently for admin (blue color)

#### Role Indicator (`UserRoleIndicator.jsx`)
- Shows current user's role in top-right corner
- Visual indicator for testing and development

## Demo Accounts

For testing purposes, demo login buttons are available on the login page:

### Admin Account
- **Email:** admin@educonnect.com
- **Password:** admin123
- **Role:** admin
- **Access:** Full admin panel access

### Regular User Account
- **Email:** user@educonnect.com
- **Password:** user123
- **Role:** user
- **Access:** Standard user features only

## Setting Up Roles in Production

### Method 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Find the user you want to make admin
4. Edit user metadata and add: `{"role": "admin"}`

### Method 2: During Registration
Users are automatically assigned `role: "user"` when they register through the app.

### Method 3: SQL Query
```sql
UPDATE auth.users 
SET user_metadata = user_metadata || '{"role": "admin"}'::jsonb 
WHERE email = 'admin@example.com';
```

## Security Features

### 1. Frontend Protection
- Route-level protection with React Router
- Component-level role checking
- Conditional UI rendering based on roles

### 2. Backend Protection (Recommended)
- Supabase Row Level Security (RLS) policies
- Database-level role checking
- API endpoint protection

### 3. Access Denied Handling
- Graceful error pages for unauthorized access
- Clear messaging about permission requirements
- Option to go back or contact administrator

## File Structure

```
src/
├── components/
│   ├── AdminRoute.jsx          # Admin route protection
│   ├── ProtectedRoute.jsx      # User route protection
│   ├── UserRoleIndicator.jsx   # Role display component
│   └── DemoLogin.jsx           # Demo account buttons
├── contexts/
│   └── AuthContext.jsx         # Authentication & role logic
├── pages/
│   ├── admin/                  # Admin panel pages
│   └── auth/                   # Login/register pages
└── Routes.jsx                  # Route definitions with protection
```

## Testing Role-Based Access

1. **Test Regular User:**
   - Login with user@educonnect.com / user123
   - Verify no admin panel link in navigation
   - Try accessing /admin directly (should show access denied)

2. **Test Admin User:**
   - Login with admin@educonnect.com / admin123
   - Verify admin panel link appears in navigation
   - Access admin panel and test all features

3. **Test Route Protection:**
   - Access /admin while logged out (should redirect to login)
   - Access /admin as regular user (should show access denied)
   - Access protected routes while logged out

## Best Practices

1. **Always check roles on both frontend and backend**
2. **Use meaningful error messages for access denied**
3. **Implement proper role hierarchy if needed**
4. **Log role-based access attempts for security**
5. **Regularly audit user roles and permissions**

## Future Enhancements

1. **Role Hierarchy:** Super admin > Admin > Moderator > User
2. **Permission-Based Access:** Granular permissions beyond roles
3. **Dynamic Role Assignment:** Admin interface to change user roles
4. **Role Expiration:** Time-limited admin access
5. **Audit Logging:** Track role changes and admin actions
