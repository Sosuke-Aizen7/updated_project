import React from 'react';

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toLocaleString() || '0',
      change: `+${stats?.userGrowth || 0}%`,
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers?.toLocaleString() || '0',
      change: `+${stats?.monthlyGrowth || 0}%`,
      changeType: 'positive',
      icon: '🟢'
    },
    {
      title: 'Total Courses',
      value: stats?.totalCourses?.toLocaleString() || '0',
      change: `+${stats?.courseGrowth || 0}%`,
      changeType: 'positive',
      icon: '📚'
    },
    {
      title: 'Universities',
      value: stats?.totalUniversities?.toLocaleString() || '0',
      change: '+2 this month',
      changeType: 'positive',
      icon: '🏛️'
    },
    {
      title: 'Pending Applications',
      value: stats?.pendingApplications?.toLocaleString() || '0',
      change: '-5% from last week',
      changeType: 'negative',
      icon: '📋'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm mt-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
