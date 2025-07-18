"use client"
import React, { useState, useEffect } from 'react';
import {
  DropletIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  PackageIcon,
  UsersIcon,
  DollarSignIcon,
  LeafIcon,
  RefreshCwIcon,
  BellIcon,
  BarChart3Icon,
  CalendarIcon,
  ShieldCheckIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const HygieneDashboard = ({ facilityId = null }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [consumptionTrends, setConsumptionTrends] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // API endpoints
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    fetchDashboardData();
  }, [facilityId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [metricsRes, trendsRes, alertsRes, insightsRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/metrics${facilityId ? `?facility_id=${facilityId}` : ''}`),
        fetch(`${API_BASE}/dashboard/consumption-trends${facilityId ? `?facility_id=${facilityId}` : ''}`),
        fetch(`${API_BASE}/dashboard/alerts${facilityId ? `?facility_id=${facilityId}` : ''}`),
        fetch(`${API_BASE}/dashboard/ai-insights${facilityId ? `?facility_id=${facilityId}` : ''}`)
      ]);

      const [metrics, trends, alertsData, insights] = await Promise.all([
        metricsRes.json(),
        trendsRes.json(),
        alertsRes.json(),
        insightsRes.json()
      ]);

      setDashboardData(metrics);
      setConsumptionTrends(trends);
      setAlerts(alertsData);
      setAiInsights(insights);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
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
              <TrendingUpIcon className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </div>
    );
  };

  const AlertCard = ({ alert }) => {
    const severityColors = {
      low: "border-blue-200 bg-blue-50",
      medium: "border-yellow-200 bg-yellow-50",
      high: "border-red-200 bg-red-50",
      critical: "border-red-300 bg-red-100"
    };

    const severityTextColors = {
      low: "text-blue-700",
      medium: "text-yellow-700",
      high: "text-red-700",
      critical: "text-red-800"
    };

    return (
      <div className={`p-4 rounded-lg border ${severityColors[alert.severity]}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <AlertTriangleIcon className={`w-5 h-5 mt-0.5 ${severityTextColors[alert.severity]}`} />
            <div>
              <h4 className={`font-medium ${severityTextColors[alert.severity]}`}>{alert.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {alert.facility_id} • {new Date(alert.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityTextColors[alert.severity]} bg-white`}>
            {alert.severity.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  const AIInsightCard = ({ insight }) => {
    const typeIcons = {
      optimization: TrendingUpIcon,
      prediction: BarChart3Icon,
      sustainability: LeafIcon,
      efficiency: PackageIcon
    };

    const Icon = typeIcons[insight.type] || BarChart3Icon;

    return (
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{insight.title}</h4>
              <span className="text-xs text-purple-600 font-medium">
                {insight.confidence}% confidence
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
            <p className="text-sm font-medium text-purple-700 mt-2">{insight.impact}</p>
            {insight.action_required && (
              <button className="mt-3 px-3 py-1 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700 transition-colors">
                Take Action
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DropletIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Hygiene Management Center</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCwIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <BellIcon className="w-4 h-4" />
              <span>Alerts ({alerts.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Products"
            value={dashboardData?.active_products || 0}
            subtitle="In inventory"
            icon={PackageIcon}
            color="blue"
            trend={5}
          />
          <MetricCard
            title="Total Facilities"
            value={dashboardData?.total_facilities || 0}
            subtitle="Being monitored"
            icon={UsersIcon}
            color="green"
          />
          <MetricCard
            title="Pending Reorders"
            value={dashboardData?.pending_reorders || 0}
            subtitle="Require attention"
            icon={AlertTriangleIcon}
            color="orange"
          />
          <MetricCard
            title="Monthly Consumption"
            value={`${dashboardData?.monthly_consumption || 0} units`}
            subtitle="This month"
            icon={TrendingUpIcon}
            color="purple"
            trend={8}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Avg per Employee"
            value={`${dashboardData?.avg_consumption_per_employee?.toFixed(1) || 0} units`}
            subtitle="Monthly average"
            icon={UsersIcon}
            color="blue"
          />
          <MetricCard
            title="Sustainability Score"
            value={`${dashboardData?.sustainability_score || 0}%`}
            subtitle="Environmental impact"
            icon={LeafIcon}
            color="green"
            trend={3}
          />
          <MetricCard
            title="Cost Savings"
            value={`${dashboardData?.cost_savings_percentage || 0}%`}
            subtitle="vs. previous period"
            icon={DollarSignIcon}
            color="green"
            trend={12}
          />
          <MetricCard
            title="Compliance Rate"
            value="94%"
            subtitle="Certifications active"
            icon={ShieldCheckIcon}
            color="purple"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
              Overview
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
              Products
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
              Marketplace
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
              Contracts
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md text-sm font-medium">
              Orders
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consumption Trends Chart */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Consumption Trends</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Last 30 days</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={consumptionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [value, name === 'consumption' ? 'Actual' : 'Predicted']}
                    />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <PackageIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Stock replenished</p>
                    <p className="text-xs text-gray-500">Hand sanitizer - 150 units added • 2h ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New forecast generated</p>
                    <p className="text-xs text-gray-500">SARIMAX model updated for toilet paper • 5h ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Certification renewed</p>
                    <p className="text-xs text-gray-500">Organic certification for eco-friendly products • 1d ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Insights & Recommendations</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {aiInsights.slice(0, 3).map((insight, index) => (
                  <AIInsightCard key={index} insight={insight} />
                ))}
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                <span className="text-sm text-gray-500">{alerts.length} active</span>
              </div>
              <div className="space-y-3">
                {alerts.slice(0, 4).map((alert, index) => (
                  <AlertCard key={index} alert={alert} />
                ))}
                {alerts.length > 4 && (
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2">
                    View all {alerts.length} alerts
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Forecast Accuracy</span>
                  <span className="text-sm font-medium text-green-600">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">Cost Optimization</span>
                  <span className="text-sm font-medium text-blue-600">$3,240 saved</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">Sustainability Impact</span>
                  <span className="text-sm font-medium text-purple-600">18% reduction</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUpIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-600">Overall Health</div>
              <div className="text-xs text-green-600 mt-1">+2%</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PackageIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">91%</div>
              <div className="text-sm text-gray-600">Stock Efficiency</div>
              <div className="text-xs text-blue-600 mt-1">+1%</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <LeafIcon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">96%</div>
              <div className="text-sm text-gray-600">Sustainability Score</div>
              <div className="text-xs text-purple-600 mt-1">+2%</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSignIcon className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-sm text-gray-600">Cost Rating</div>
              <div className="text-xs text-orange-600 mt-1">+0.3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HygieneDashboard;