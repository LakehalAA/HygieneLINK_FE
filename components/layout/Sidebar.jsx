import React from 'react';
import { 
  HomeIcon, 
  TrendingUpIcon,
  PackageIcon,
  LeafIcon,
  ShieldCheckIcon,
  BarChart3Icon,
  SettingsIcon,
  DropletIcon,
  BrainIcon,
  RecycleIcon,
  FileCheckIcon,
  PieChartIcon,
  AlertCircleIcon,
  BoxIcon
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: HomeIcon,
      description: 'Overview & KPIs'
    },
    { 
      id: 'forecasting', 
      label: 'Forecasting', 
      icon: BrainIcon,
      description: 'SARIMAX & Predictions'
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: PackageIcon,
      description: 'Auto-reorder & Optimization'
    },
    { 
      id: 'sustainability', 
      label: 'Sustainability', 
      icon: LeafIcon,
      description: 'Carbon & Waste Tracking'
    },
    { 
      id: 'compliance', 
      label: 'Compliance', 
      icon: ShieldCheckIcon,
      description: 'Standards & Audits'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3Icon,
      description: 'Performance Insights'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: SettingsIcon,
      description: 'System Config'
    }
  ];

  return (
    <div className="w-64 bg-slate-800 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DropletIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg">HygieneLINK</div>
            <div className="text-slate-400 text-xs">Smart Management</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 pt-3 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-start space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={`text-xs mt-0.5 ${
                      isActive ? 'text-blue-100' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-3 bg-slate-700 rounded-lg">
          <div className="text-slate-300 text-sm font-medium mb-2">Quick Stats</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-400 text-xs">System Health</span>
              </div>
              <span className="text-green-400 text-xs font-medium">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-400 text-xs">Active Facilities</span>
              </div>
              <span className="text-blue-400 text-xs font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-slate-400 text-xs">Pending Alerts</span>
              </div>
              <span className="text-orange-400 text-xs font-medium">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-700">
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-xs">M</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">Mohammed</div>
              <div className="text-slate-400 text-xs">Facility Manager</div>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;