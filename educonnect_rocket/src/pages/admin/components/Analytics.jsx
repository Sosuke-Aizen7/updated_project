import React from 'react';

const Analytics = ({ stats }) => {
  const chartData = [
    { month: 'Jan', users: 1200, applications: 450 },
    { month: 'Feb', users: 1800, applications: 620 },
    { month: 'Mar', users: 2400, applications: 890 },
    { month: 'Apr', users: 3200, applications: 1100 },
    { month: 'May', users: 2800, applications: 950 },
    { month: 'Jun', users: 3600, applications: 1300 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800">Total Page Views</h4>
            <p className="text-2xl font-bold text-blue-900">847,392</p>
            <p className="text-sm text-blue-600">+12.5% from last month</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-800">Conversion Rate</h4>
            <p className="text-2xl font-bold text-green-900">8.4%</p>
            <p className="text-sm text-green-600">+2.1% from last month</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800">Avg. Session Duration</h4>
            <p className="text-2xl font-bold text-yellow-900">4m 32s</p>
            <p className="text-sm text-yellow-600">+15s from last month</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-800">Bounce Rate</h4>
            <p className="text-2xl font-bold text-purple-900">24.8%</p>
            <p className="text-sm text-purple-600">-3.2% from last month</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Analytics Chart</p>
            <p className="text-gray-400 text-sm">Monthly User Growth & Applications</p>
            <div className="mt-4 flex justify-center space-x-8">
              {chartData.map((data, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-400">{data.month}</div>
                  <div className="mt-1 bg-blue-500 rounded" style={{height: `${data.users / 100}px`, width: '20px'}}></div>
                  <div className="text-xs text-gray-600 mt-1">{data.users}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold mb-4">Traffic Sources</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Direct</span>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-200 rounded-full h-2 w-16">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <span className="text-sm font-medium">45.2%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Google Search</span>
              <div className="flex items-center space-x-2">
                <div className="bg-green-200 rounded-full h-2 w-16">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
                <span className="text-sm font-medium">32.8%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Social Media</span>
              <div className="flex items-center space-x-2">
                <div className="bg-purple-200 rounded-full h-2 w-16">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '30%'}}></div>
                </div>
                <span className="text-sm font-medium">15.4%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Referrals</span>
              <div className="flex items-center space-x-2">
                <div className="bg-yellow-200 rounded-full h-2 w-16">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <span className="text-sm font-medium">6.6%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold mb-4">Popular Pages</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">/homepage</span>
              <span className="text-sm font-medium">142,563 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">/course-search-results</span>
              <span className="text-sm font-medium">98,421 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">/course-detail</span>
              <span className="text-sm font-medium">76,329 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">/university-profile</span>
              <span className="text-sm font-medium">54,218 views</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">/user-dashboard</span>
              <span className="text-sm font-medium">43,167 views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
