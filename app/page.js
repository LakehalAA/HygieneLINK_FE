"use client"
import React, { useState } from 'react';
import HygieneDashboard from './dashboard/page';
import ForecastingScreen from './forecasting/page';
import InventoryScreen from './inventory/page';
import SustainabilityScreen from './sustainability/page';
import ComplianceScreen from './compliance/page';
import Analytics from './analytics/page';
import SettingsScreen from './settings/page';
import Sidebar from '../components/layout/Sidebar';

const AnalyticsReports = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="bg-white rounded-lg p-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">Performance Analytics</h3>
          <p className="text-purple-700">Comprehensive performance metrics and insights</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Custom Reports</h3>
          <p className="text-blue-700">Generate tailored reports for stakeholders</p>
        </div>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="bg-white rounded-lg p-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">System Configuration</h3>
          <p className="text-gray-700">Configure system-wide settings and preferences</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-700">Manage users, roles, and permissions</p>
        </div>
      </div>
    </div>
  </div>
);

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HygieneDashboard facilityId="f1e1e1e1-1111-4111-a111-111111111111" />;
      case 'forecasting':
        return <ForecastingScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'sustainability':
        return <SustainabilityScreen />;
      case 'compliance':
        return <ComplianceScreen />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HygieneDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainPage;