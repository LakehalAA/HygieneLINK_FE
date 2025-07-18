import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, Target, Calendar, Filter, Download, RefreshCw } from 'lucide-react';

const Analytics = () => {
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data based on the database schema
  const facilities = [
    { id: 'all', name: 'All Facilities' },
    { id: '1', name: 'Main Hospital' },
    { id: '2', name: 'Emergency Wing' },
    { id: '3', name: 'Outpatient Clinic' },
    { id: '4', name: 'Laboratory' }
  ];

  const kpiData = [
    { name: 'Cost Efficiency', value: 87.3, target: 85, trend: 'up', change: '+2.1%' },
    { name: 'Inventory Turnover', value: 12.8, target: 15, trend: 'down', change: '-1.2%' },
    { name: 'Waste Reduction', value: 23.5, target: 20, trend: 'up', change: '+3.8%' },
    { name: 'Compliance Score', value: 94.2, target: 95, trend: 'up', change: '+0.5%' }
  ];

  const consumptionTrends = [
    { month: 'Jan', sanitizers: 1200, towels: 800, soap: 650, masks: 2400 },
    { month: 'Feb', sanitizers: 1350, towels: 720, soap: 580, masks: 2200 },
    { month: 'Mar', sanitizers: 1180, towels: 900, soap: 720, masks: 2600 },
    { month: 'Apr', sanitizers: 1420, towels: 850, soap: 680, masks: 2100 },
    { month: 'May', sanitizers: 1290, towels: 780, soap: 590, masks: 2300 },
    { month: 'Jun', sanitizers: 1380, towels: 820, soap: 640, masks: 2500 }
  ];

  const costAnalysis = [
    { category: 'Hand Sanitizers', spend: 24500, budget: 28000, utilization: 87.5 },
    { category: 'Paper Towels', spend: 18200, budget: 20000, utilization: 91.0 },
    { category: 'Liquid Soap', spend: 12800, budget: 15000, utilization: 85.3 },
    { category: 'Masks', spend: 35600, budget: 40000, utilization: 89.0 },
    { category: 'Gloves', spend: 21300, budget: 25000, utilization: 85.2 }
  ];

  const sustainabilityMetrics = [
    { name: 'Carbon Footprint', value: 156.7, unit: 'kg CO2', change: '-5.2%' },
    { name: 'Water Usage', value: 2847, unit: 'L', change: '-2.1%' },
    { name: 'Waste Generated', value: 89.3, unit: 'kg', change: '+1.8%' },
    { name: 'Recycled Content', value: 67.2, unit: '%', change: '+4.5%' }
  ];

  const performanceBenchmarks = [
    { facility: 'Main Hospital', efficiency: 92, cost: 88, sustainability: 85 },
    { facility: 'Emergency Wing', efficiency: 89, cost: 91, sustainability: 82 },
    { facility: 'Outpatient Clinic', efficiency: 95, cost: 85, sustainability: 88 },
    { facility: 'Laboratory', efficiency: 87, cost: 93, sustainability: 90 }
  ];

  const pieData = [
    { name: 'Hand Sanitizers', value: 35, color: '#3b82f6' },
    { name: 'Paper Towels', value: 25, color: '#10b981' },
    { name: 'Liquid Soap', value: 18, color: '#f59e0b' },
    { name: 'Masks', value: 22, color: '#ef4444' }
  ];

  const roiMetrics = [
    { initiative: 'Auto-Reorder System', investment: 50000, savings: 125000, roi: 150, payback: 4.8 },
    { initiative: 'Sustainability Program', investment: 75000, savings: 98000, roi: 30.7, payback: 9.2 },
    { initiative: 'Inventory Optimization', investment: 25000, savings: 45000, roi: 80, payback: 6.7 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Performance insights and data analysis</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {facilities.map(facility => (
            <option key={facility.id} value={facility.id}>{facility.name}</option>
          ))}
        </select>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="hand_sanitizers">Hand Sanitizers</option>
          <option value="paper_towels">Paper Towels</option>
          <option value="liquid_soap">Liquid Soap</option>
          <option value="masks">Masks</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{kpi.name}</h3>
              <div className={`flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{kpi.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}%</div>
            <div className="text-sm text-gray-500">Target: {kpi.target}%</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${kpi.value >= kpi.target ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(100, (kpi.value / kpi.target) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Consumption Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumption Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={consumptionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sanitizers" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="towels" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="soap" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="masks" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spend" fill="#3b82f6" />
              <Bar dataKey="budget" fill="#e5e7eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Metrics</h3>
          <div className="space-y-4">
            {sustainabilityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{metric.name}</div>
                  <div className="text-sm text-gray-600">{metric.value} {metric.unit}</div>
                </div>
                <div className={`text-sm font-medium ${metric.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Performance</h3>
          <div className="space-y-4">
            {performanceBenchmarks.map((facility, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="font-medium text-gray-900 mb-2">{facility.facility}</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Efficiency</span>
                    <span className="text-sm font-medium">{facility.efficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cost</span>
                    <span className="text-sm font-medium">{facility.cost}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sustainability</span>
                    <span className="text-sm font-medium">{facility.sustainability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Metrics Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Initiative</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Investment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Savings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">ROI</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Payback (months)</th>
              </tr>
            </thead>
            <tbody>
              {roiMetrics.map((metric, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{metric.initiative}</td>
                  <td className="py-3 px-4 text-gray-600">${metric.investment.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">${metric.savings.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${metric.roi > 50 ? 'text-green-600' : 'text-orange-600'}`}>
                      {metric.roi}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{metric.payback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;