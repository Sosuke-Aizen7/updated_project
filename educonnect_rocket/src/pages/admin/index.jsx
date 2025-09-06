import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AdminStats from './components/AdminStats';
import UserManagement from './components/UserManagement';
import CourseManagement from './components/CourseManagement';
import UniversityManagement from './components/UniversityManagement';
import SystemSettings from './components/SystemSettings';
import Analytics from './components/Analytics';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminData, setAdminData] = useState({
    stats: {},
    users: [],
    courses: [],
    universities: [],
    systemHealth: {}
  });

  // Mock admin data initialization
  useEffect(() => {
    const mockAdminData = {
      stats: {
        totalUsers: 15847,
        activeUsers: 12453,
        totalCourses: 8532,
        totalUniversities: 342,
        pendingApplications: 1256,
        monthlyGrowth: 12.5,
        userGrowth: 8.3,
        courseGrowth: 15.2
      },
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'student',
          status: 'active',
          joinDate: '2024-01-15',
          lastLogin: '2024-03-15'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@university.edu',
          role: 'university_admin',
          status: 'active',
          joinDate: '2024-02-10',
          lastLogin: '2024-03-14'
        }
      ],
      courses: [
        {
          id: 1,
          title: 'Master of Computer Science',
          university: 'Stanford University',
          status: 'active',
          applications: 245,
          createdDate: '2024-01-20'
        },
        {
          id: 2,
          title: 'Bachelor of Business Administration',
          university: 'Harvard Business School',
          status: 'pending_review',
          applications: 189,
          createdDate: '2024-02-15'
        }
      ],
      universities: [
        {
          id: 1,
          name: 'Stanford University',
          country: 'United States',
          status: 'verified',
          coursesCount: 156,
          applicationsCount: 3245
        },
        {
          id: 2,
          name: 'Harvard University',
          country: 'United States',
          status: 'verified',
          coursesCount: 203,
          applicationsCount: 4521
        }
      ],
      systemHealth: {
        serverStatus: 'healthy',
        databaseStatus: 'healthy',
        apiResponseTime: '125ms',
        uptime: '99.9%'
      }
    };
    setAdminData(mockAdminData);
  }, []);

  const breadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Admin Panel', path: '/admin' }
  ];

  const tabItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { key: 'users', label: 'Users', icon: 'Users', count: adminData.users?.length },
    { key: 'courses', label: 'Courses', icon: 'BookOpen', count: adminData.courses?.length },
    { key: 'universities', label: 'Universities', icon: 'Building', count: adminData.universities?.length },
    { key: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { key: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Panel - EduConnect</title>
        <meta name="description" content="Manage users, courses, universities and system settings in EduConnect admin panel." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-6">
        <div className="mb-6">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">
              Manage data, users, system settings, and monitor statistics
            </p>
          </div>
        </div>

        {/* Admin Stats */}
        {activeTab === 'dashboard' && <AdminStats stats={adminData.stats} />}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{tab.label}</span>
                {tab.count && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">System Health</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Server Status:</span>
                      <span className="text-green-600 font-medium">{adminData.systemHealth?.serverStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Database Status:</span>
                      <span className="text-green-600 font-medium">{adminData.systemHealth?.databaseStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Response Time:</span>
                      <span className="font-medium">{adminData.systemHealth?.apiResponseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">{adminData.systemHealth?.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>New user registration</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Course application submitted</span>
                      <span className="text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>University profile updated</span>
                      <span className="text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UserManagement users={adminData.users} />
          )}

          {activeTab === 'courses' && (
            <CourseManagement courses={adminData.courses} />
          )}

          {activeTab === 'universities' && (
            <UniversityManagement universities={adminData.universities} />
          )}

          {activeTab === 'analytics' && (
            <Analytics stats={adminData.stats} />
          )}

          {activeTab === 'settings' && (
            <SystemSettings />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
