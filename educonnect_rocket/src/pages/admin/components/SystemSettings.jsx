import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'EduConnect',
    siteDescription: 'Find Your Perfect University Match',
    maintenanceMode: false,
    userRegistration: true,
    emailVerification: true,
    twoFactorAuth: false,
    maxFileSize: '10',
    sessionTimeout: '30',
    passwordMinLength: '8',
    maxLoginAttempts: '5'
  });

  const [activeSection, setActiveSection] = useState('general');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Implement save functionality
    alert('Settings saved successfully!');
  };

  const settingSections = [
    { key: 'general', label: 'General Settings' },
    { key: 'security', label: 'Security Settings' },
    { key: 'email', label: 'Email Settings' },
    { key: 'system', label: 'System Settings' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">System Settings</h3>
        <p className="text-sm text-gray-600 mt-1">Configure system-wide settings and preferences</p>
      </div>

      <div className="flex">
        {/* Settings Navigation */}
        <div className="w-64 border-r border-gray-200">
          <nav className="p-4 space-y-2">
            {settingSections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  activeSection === section.key
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">General Settings</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Security Settings</h4>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="userRegistration"
                  checked={settings.userRegistration}
                  onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="userRegistration" className="ml-2 text-sm text-gray-700">
                  Allow User Registration
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailVerification"
                  checked={settings.emailVerification}
                  onChange={(e) => handleSettingChange('emailVerification', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="emailVerification" className="ml-2 text-sm text-gray-700">
                  Require Email Verification
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="twoFactorAuth" className="ml-2 text-sm text-gray-700">
                  Enable Two-Factor Authentication
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Password Length
                </label>
                <input
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Email Settings</h4>
              <p className="text-sm text-gray-600">Configure email server and notification settings</p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Server
                </label>
                <input
                  type="text"
                  placeholder="smtp.gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port
                </label>
                <input
                  type="number"
                  placeholder="587"
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email Address
                </label>
                <input
                  type="email"
                  placeholder="noreply@educonnect.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          {activeSection === 'system' && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">System Settings</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max File Upload Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h5 className="font-medium text-yellow-800">System Information</h5>
                <div className="mt-2 text-sm text-yellow-700 space-y-1">
                  <p>Server: Linux Ubuntu 20.04</p>
                  <p>PHP Version: 8.1.0</p>
                  <p>Database: MySQL 8.0</p>
                  <p>Memory Usage: 234MB / 512MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Button onClick={handleSaveSettings} className="bg-primary text-white">
                Save Settings
              </Button>
              <Button variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
