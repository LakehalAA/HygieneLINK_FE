"use client"
import React, { useState } from 'react';
import { Settings, User, Shield, Bell, Database, Globe, Users, Building, Wrench, Save, Eye, EyeOff, Droplet } from 'lucide-react';

const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    alerts: true,
    inventory: true,
    compliance: true
  });

  const [userProfile, setUserProfile] = useState({
    username: 'mohammed.admin',
    email: 'mohammed@hygienelink.com',
    firstName: 'Mohammed',
    lastName: 'Admin',
    phone: '+213 555 123 456',
    role: 'Facility Manager',
    facilityId: '1'
  });

  const [systemSettings, setSystemSettings] = useState({
    language: 'en',
    timezone: 'Africa/Algiers',
    currency: 'DZD',
    dateFormat: 'dd/mm/yyyy',
    theme: 'light',
    autoReorderEnabled: true,
    alertThreshold: 10,
    sessionTimeout: 30
  });

  const facilities = [
    { id: '1', name: 'Main Facility - Blida', location: 'Blida, Algeria' },
    { id: '2', name: 'Secondary Facility - Algiers', location: 'Algiers, Algeria' },
    { id: '3', name: 'Branch Office - Oran', location: 'Oran, Algeria' }
  ];

  const roles = [
    { id: '1', name: 'Super Admin', description: 'Full system access' },
    { id: '2', name: 'Facility Manager', description: 'Facility-level management' },
    { id: '3', name: 'Inventory Manager', description: 'Inventory and procurement' },
    { id: '4', name: 'Auditor', description: 'Compliance and audit access' },
    { id: '5', name: 'Viewer', description: 'Read-only access' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'system', label: 'System', icon: Database }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // Save functionality would go here
    console.log('Settings saved');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select 
              value={systemSettings.language}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select 
              value={systemSettings.timezone}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Africa/Algiers">Africa/Algiers</option>
              <option value="UTC">UTC</option>
              <option value="Europe/Paris">Europe/Paris</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select 
              value={systemSettings.currency}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="DZD">DZD - Algerian Dinar</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select 
              value={systemSettings.dateFormat}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto-reorder Enabled</label>
              <p className="text-xs text-gray-500">Automatically create purchase orders when inventory is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={systemSettings.autoReorderEnabled}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, autoReorderEnabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Alert Threshold (%)</label>
            <input
              type="number"
              value={systemSettings.alertThreshold}
              onChange={(e) => setSystemSettings(prev => ({ ...prev, alertThreshold: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="100"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={userProfile.username}
              onChange={(e) => setUserProfile(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={userProfile.firstName}
              onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={userProfile.lastName}
              onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select 
              value={userProfile.role}
              onChange={(e) => setUserProfile(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Assignment</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Facility</label>
          <select 
            value={userProfile.facilityId}
            onChange={(e) => setUserProfile(prev => ({ ...prev, facilityId: e.target.value }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {facilities.map(facility => (
              <option key={facility.id} value={facility.id}>{facility.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={systemSettings.sessionTimeout}
            onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="5"
            max="480"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <p className="text-xs text-gray-500">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'push' && 'Browser push notifications'}
                  {key === 'sms' && 'SMS notifications for critical alerts'}
                  {key === 'alerts' && 'System alerts and warnings'}
                  {key === 'inventory' && 'Inventory level notifications'}
                  {key === 'compliance' && 'Compliance and audit reminders'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={value}
                  onChange={() => handleNotificationChange(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFacilitiesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Facilities Management</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Facility
          </button>
        </div>
        
        <div className="space-y-4">
          {facilities.map(facility => (
            <div key={facility.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{facility.name}</h4>
                  <p className="text-sm text-gray-600">{facility.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles & Permissions</h3>
        <div className="space-y-3">
          {roles.map(role => (
            <div key={role.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  Edit Permissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add User
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">
            <div>Username</div>
            <div>Email</div>
            <div>Role</div>
            <div>Actions</div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
              <div>mohammed.admin</div>
              <div>mohammed@hygienelink.com</div>
              <div>Facility Manager</div>
              <div>
                <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
              <div>auditor.user</div>
              <div>auditor@hygienelink.com</div>
              <div>Auditor</div>
              <div>
                <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Version:</span>
            <span className="text-gray-900 font-medium">2.1.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Database:</span>
            <span className="text-gray-900 font-medium">PostgreSQL 14.2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Backup:</span>
            <span className="text-gray-900 font-medium">2025-07-18 02:00:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Storage Used:</span>
            <span className="text-gray-900 font-medium">2.3 GB / 10 GB</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance</h3>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left border border-gray-200">
            <Wrench className="inline mr-2" size={16} />
            Run System Diagnostics
          </button>
          <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left border border-gray-200">
            <Database className="inline mr-2" size={16} />
            Backup Database
          </button>
          <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left border border-gray-200">
            <Globe className="inline mr-2" size={16} />
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'facilities':
        return renderFacilitiesSettings();
      case 'users':
        return renderUsersSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Droplet className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">System Configuration</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="mr-2" size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3" size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;