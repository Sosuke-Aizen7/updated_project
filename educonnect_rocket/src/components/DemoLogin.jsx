import React from 'react';
import Button from '../components/ui/Button';

const DemoLogin = ({ onLogin }) => {
  const demoAccounts = [
    {
      type: 'Admin',
      email: 'admin@educonnect.com',
      password: 'admin123',
      role: 'admin',
      description: 'Full access to admin panel and all features',
      color: 'bg-red-50 border-red-200'
    },
    {
      type: 'Regular User',
      email: 'user@educonnect.com', 
      password: 'user123',
      role: 'user',
      description: 'Standard user access to courses and dashboard',
      color: 'bg-blue-50 border-blue-200'
    }
  ];

  const handleDemoLogin = (account) => {
    onLogin(account.email, account.password);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Demo Accounts</h3>
      <p className="text-sm text-gray-600 mb-4">
        Try these demo accounts to explore different user roles:
      </p>
      
      <div className="space-y-4">
        {demoAccounts.map((account, index) => (
          <div key={index} className={`rounded-lg border p-4 ${account.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{account.type}</h4>
                <p className="text-sm text-gray-600 mt-1">{account.description}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <div>Email: {account.email}</div>
                  <div>Password: {account.password}</div>
                </div>
              </div>
              <Button
                onClick={() => handleDemoLogin(account)}
                size="sm"
                variant="outline"
                className="ml-4"
              >
                Login as {account.type}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> These are demo accounts for testing. In production, you would create admin accounts through your Supabase dashboard by setting the user's metadata role to "admin".
        </p>
      </div>
    </div>
  );
};

export default DemoLogin;
