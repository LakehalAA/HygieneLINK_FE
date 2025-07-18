import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, AlertTriangle, TrendingUp, ShoppingCart, CheckCircle, Clock, DollarSign, RefreshCw } from 'lucide-react';

// Mock data - replace with actual API calls
const mockInventoryItems = [
  { 
    id: 1, 
    name: 'Premium Toilet Paper', 
    category: 'Toilet Paper', 
    currentStock: 45, 
    minThreshold: 50, 
    maxCapacity: 200,
    supplier: 'EcoClean Supplies',
    facility: 'Main Office',
    status: 'low',
    predictedDays: 3,
    reorderPoint: 55
  },
  { 
    id: 2, 
    name: 'Liquid Hand Soap', 
    category: 'Soap', 
    currentStock: 125, 
    minThreshold: 75, 
    maxCapacity: 300,
    supplier: 'Green Valley Organic',
    facility: 'Distribution Center',
    status: 'good',
    predictedDays: 12,
    reorderPoint: 85
  },
  { 
    id: 3, 
    name: 'Hand Sanitizer', 
    category: 'Sanitizer', 
    currentStock: 15, 
    minThreshold: 30, 
    maxCapacity: 150,
    supplier: 'CleanTech Solutions',
    facility: 'Warehouse',
    status: 'critical',
    predictedDays: 1,
    reorderPoint: 40
  },
  { 
    id: 4, 
    name: 'Paper Towels', 
    category: 'Paper Products', 
    currentStock: 180, 
    minThreshold: 100, 
    maxCapacity: 400,
    supplier: 'EcoClean Supplies',
    facility: 'Main Office',
    status: 'good',
    predictedDays: 18,
    reorderPoint: 120
  },
];

const mockRecommendations = [
  { 
    id: 1, 
    product: 'Hand Sanitizer', 
    facility: 'Warehouse',
    currentStock: 15,
    recommendedQuantity: 135,
    urgency: 'critical',
    estimatedCost: 675,
    justification: 'Stock level at 50% of minimum threshold. SARIMAX predicts 25.5 units needed during lead time.'
  },
  { 
    id: 2, 
    product: 'Premium Toilet Paper', 
    facility: 'Main Office',
    currentStock: 45,
    recommendedQuantity: 155,
    urgency: 'high',
    estimatedCost: 775,
    justification: 'Stock level at 90% of minimum threshold. SARIMAX predicts 42.3 units needed during lead time.'
  },
];

const categoryData = [
  { name: 'Toilet Paper', value: 25, color: '#3b82f6' },
  { name: 'Soap', value: 30, color: '#10b981' },
  { name: 'Sanitizer', value: 20, color: '#f59e0b' },
  { name: 'Paper Products', value: 25, color: '#8b5cf6' },
];

const InventoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [inventoryItems, setInventoryItems] = useState(mockInventoryItems);
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      case 'good': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredItems = inventoryItems.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const criticalItems = inventoryItems.filter(item => item.status === 'critical').length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low').length;
  const totalValue = inventoryItems.reduce((acc, item) => acc + (item.currentStock * 5), 0);

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      red: "bg-red-50 text-red-600 border-red-200"
    };

    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                <p className="text-gray-600">Auto-reorder & Optimization</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="critical">Critical</option>
              <option value="low">Low Stock</option>
              <option value="good">Good</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update Stock
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Items"
            value={inventoryItems.length}
            subtitle="In inventory"
            icon={Package}
            color="blue"
          />
          <MetricCard
            title="Critical Items"
            value={criticalItems}
            subtitle="Require immediate attention"
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard
            title="Low Stock"
            value={lowStockItems}
            subtitle="Below minimum threshold"
            icon={Clock}
            color="orange"
          />
          <MetricCard
            title="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            subtitle="Current inventory value"
            icon={DollarSign}
            color="green"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('recommendations')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'recommendations' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reorder Recommendations
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inventory List */}
            <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Stock Levels</h2>
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.facility} • {item.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{item.currentStock}</p>
                        <p className="text-sm text-gray-600">units</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Stock Level</span>
                        <span>{item.currentStock} / {item.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.currentStock <= item.minThreshold 
                              ? 'bg-red-500' 
                              : item.currentStock <= item.minThreshold * 1.5 
                                ? 'bg-orange-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${(item.currentStock / item.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Min: {item.minThreshold}</span>
                        <span>Predicted depletion: {item.predictedDays} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'recommendations' && (
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Reorder Recommendations</h2>
            <div className="space-y-4">
              {mockRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900">{rec.product}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(rec.urgency)}`}>
                          {rec.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.facility}</p>
                      <p className="text-sm text-gray-700">{rec.justification}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-semibold text-gray-900">{rec.recommendedQuantity} units</p>
                      <p className="text-sm text-gray-600">${rec.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Current Stock: {rec.currentStock} units
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        Modify
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryScreen;