import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Brain, AlertTriangle, CheckCircle, Clock, Target, Droplets, RefreshCw, Bell } from 'lucide-react';

// Mock data - replace with actual API calls
const mockForecastData = [
  { date: '2025-01-01', actual: 45, predicted: 42, confidence_upper: 48, confidence_lower: 38 },
  { date: '2025-01-02', actual: 52, predicted: 48, confidence_upper: 55, confidence_lower: 42 },
  { date: '2025-01-03', actual: 38, predicted: 44, confidence_upper: 50, confidence_lower: 38 },
  { date: '2025-01-04', actual: null, predicted: 46, confidence_upper: 52, confidence_lower: 40 },
  { date: '2025-01-05', actual: null, predicted: 49, confidence_upper: 56, confidence_lower: 42 },
  { date: '2025-01-06', actual: null, predicted: 51, confidence_upper: 58, confidence_lower: 44 },
  { date: '2025-01-07', actual: null, predicted: 47, confidence_upper: 54, confidence_lower: 40 },
];

const mockModels = [
  { id: 1, name: 'Premium Toilet Paper - Main Office', accuracy: 94.2, status: 'active', lastTrained: '2025-01-15' },
  { id: 2, name: 'Liquid Soap - Distribution Center', accuracy: 89.7, status: 'active', lastTrained: '2025-01-14' },
  { id: 3, name: 'Hand Sanitizer - Warehouse', accuracy: 87.3, status: 'training', lastTrained: '2025-01-13' },
  { id: 4, name: 'Paper Towels - Main Office', accuracy: 91.8, status: 'active', lastTrained: '2025-01-12' },
];

const ForecastingScreen = () => {
  const [selectedModel, setSelectedModel] = useState(mockModels[0]);
  const [timeRange, setTimeRange] = useState('30');
  const [forecastData, setForecastData] = useState(mockForecastData);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'training': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'training': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => {
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
          {trend && (
            <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </div>
          )}
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
              <Droplets className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Forecasting</h1>
                <p className="text-gray-600">SARIMAX & Predictions</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Train New Model
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Models"
            value="3"
            subtitle="Currently running"
            icon={Brain}
            color="blue"
          />
          <MetricCard
            title="Avg Accuracy"
            value="91.9%"
            subtitle="Across all models"
            icon={Target}
            color="green"
            trend={2}
          />
          <MetricCard
            title="Predictions Made"
            value="1,247"
            subtitle="This month"
            icon={TrendingUp}
            color="purple"
            trend={15}
          />
          <MetricCard
            title="Training Queue"
            value="1"
            subtitle="Models pending"
            icon={Clock}
            color="orange"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Consumption Forecast</h2>
              <div className="text-sm text-gray-500">
                {selectedModel.name}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [value, name === 'actual' ? 'Actual' : name === 'predicted' ? 'Predicted' : name]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#10b981', strokeWidth: 2 }}
                    name="Predicted"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence_upper" 
                    stroke="#e5e7eb" 
                    strokeWidth={1}
                    dot={false}
                    name="Upper Confidence"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidence_lower" 
                    stroke="#e5e7eb" 
                    strokeWidth={1}
                    dot={false}
                    name="Lower Confidence"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Accuracy Score</span>
                <span className="text-sm font-medium text-gray-900">{selectedModel.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${selectedModel.accuracy}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MAPE (Mean Absolute Percentage Error)</span>
                <span className="text-sm font-medium text-gray-900">5.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">R² Score</span>
                <span className="text-sm font-medium text-gray-900">0.912</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Training</span>
                <span className="text-sm font-medium text-gray-900">{selectedModel.lastTrained}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Models List */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Trained Models</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockModels.map((model) => (
                <div 
                  key={model.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:shadow-md ${
                    selectedModel.id === model.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 ${getStatusColor(model.status)}`}>
                        {getStatusIcon(model.status)}
                        <span className="text-sm font-medium capitalize">{model.status}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{model.name}</h3>
                        <p className="text-sm text-gray-500">Last trained: {model.lastTrained}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{model.accuracy}%</p>
                      <p className="text-xs text-gray-500">Accuracy</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingScreen;