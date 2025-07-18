import React, { useState } from 'react';
import { 
  Leaf, 
  Droplet, 
  Recycle, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Plus,
  Target,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';

const SustainabilityScreen = () => {
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data based on sustainability_metrics table
  const sustainabilityData = {
    overview: {
      carbonFootprint: { current: 1247.5, target: 1200, unit: 'kg CO2', trend: -5.2 },
      waterUsage: { current: 8450, target: 8000, unit: 'liters', trend: -3.1 },
      wasteGenerated: { current: 234.8, target: 220, unit: 'kg', trend: -8.7 },
      recycledContent: { current: 67.3, target: 70, unit: '%', trend: +2.1 },
      renewableEnergy: { current: 45.8, target: 50, unit: '%', trend: +1.8 },
      efficiencyScore: { current: 8.4, target: 8.5, unit: '/10', trend: +0.3 }
    },
    facilities: [
      { id: '1', name: 'Main Office', carbonFootprint: 456.2, waterUsage: 3200, wasteGenerated: 89.5, efficiencyScore: 8.7 },
      { id: '2', name: 'Manufacturing Plant', carbonFootprint: 623.8, waterUsage: 4100, wasteGenerated: 112.3, efficiencyScore: 8.2 },
      { id: '3', name: 'Warehouse', carbonFootprint: 167.5, waterUsage: 1150, wasteGenerated: 33.0, efficiencyScore: 8.3 }
    ],
    monthlyTrends: [
      { month: 'Jan', carbonFootprint: 1312, waterUsage: 8800, wasteGenerated: 254, efficiency: 8.1 },
      { month: 'Feb', carbonFootprint: 1298, waterUsage: 8650, wasteGenerated: 248, efficiency: 8.2 },
      { month: 'Mar', carbonFootprint: 1276, waterUsage: 8520, wasteGenerated: 241, efficiency: 8.3 },
      { month: 'Apr', carbonFootprint: 1264, waterUsage: 8480, wasteGenerated: 238, efficiency: 8.4 },
      { month: 'May', carbonFootprint: 1247, waterUsage: 8450, wasteGenerated: 235, efficiency: 8.4 }
    ]
  };

  const MetricCard = ({ icon: Icon, title, current, target, unit, trend, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${color} mr-3`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900">
          {current.toLocaleString()} {unit}
        </div>
        <div className="text-sm text-gray-500">
          Target: {target.toLocaleString()} {unit}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${current <= target ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min((current / target) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );

  const FacilityRow = ({ facility }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{facility.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {facility.carbonFootprint} kg CO2
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {facility.waterUsage.toLocaleString()} L
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {facility.wasteGenerated} kg
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(facility.efficiencyScore / 10) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">{facility.efficiencyScore}/10</span>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Leaf className="w-6 h-6 text-green-500 mr-2" />
              Sustainability
            </h1>
            <p className="text-gray-600 mt-1">Carbon & Waste Tracking</p>
          </div>
          <div className="flex space-x-3">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
            >
              <option value="all">All Facilities</option>
              <option value="1">Main Office</option>
              <option value="2">Manufacturing Plant</option>
              <option value="3">Warehouse</option>
            </select>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'metrics', label: 'Detailed Metrics', icon: Target },
            { id: 'facilities', label: 'Facility Breakdown', icon: Filter }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                icon={Leaf}
                title="Carbon Footprint"
                current={sustainabilityData.overview.carbonFootprint.current}
                target={sustainabilityData.overview.carbonFootprint.target}
                unit={sustainabilityData.overview.carbonFootprint.unit}
                trend={sustainabilityData.overview.carbonFootprint.trend}
                color="bg-green-500"
              />
              <MetricCard
                icon={Droplet}
                title="Water Usage"
                current={sustainabilityData.overview.waterUsage.current}
                target={sustainabilityData.overview.waterUsage.target}
                unit={sustainabilityData.overview.waterUsage.unit}
                trend={sustainabilityData.overview.waterUsage.trend}
                color="bg-blue-500"
              />
              <MetricCard
                icon={Recycle}
                title="Waste Generated"
                current={sustainabilityData.overview.wasteGenerated.current}
                target={sustainabilityData.overview.wasteGenerated.target}
                unit={sustainabilityData.overview.wasteGenerated.unit}
                trend={sustainabilityData.overview.wasteGenerated.trend}
                color="bg-orange-500"
              />
              <MetricCard
                icon={Recycle}
                title="Recycled Content"
                current={sustainabilityData.overview.recycledContent.current}
                target={sustainabilityData.overview.recycledContent.target}
                unit={sustainabilityData.overview.recycledContent.unit}
                trend={sustainabilityData.overview.recycledContent.trend}
                color="bg-purple-500"
              />
              <MetricCard
                icon={Target}
                title="Renewable Energy"
                current={sustainabilityData.overview.renewableEnergy.current}
                target={sustainabilityData.overview.renewableEnergy.target}
                unit={sustainabilityData.overview.renewableEnergy.unit}
                trend={sustainabilityData.overview.renewableEnergy.trend}
                color="bg-yellow-500"
              />
              <MetricCard
                icon={TrendingUp}
                title="Efficiency Score"
                current={sustainabilityData.overview.efficiencyScore.current}
                target={sustainabilityData.overview.efficiencyScore.target}
                unit={sustainabilityData.overview.efficiencyScore.unit}
                trend={sustainabilityData.overview.efficiencyScore.trend}
                color="bg-indigo-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Facility Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Facility
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Carbon Footprint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Water Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waste Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Efficiency Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sustainabilityData.facilities.map((facility) => (
                    <FacilityRow key={facility.id} facility={facility} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Transportation Emissions</span>
                    <span className="text-sm font-medium">156.3 kg CO2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Packaging Waste</span>
                    <span className="text-sm font-medium">45.7 kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cost Savings</span>
                    <span className="text-sm font-medium text-green-600">$2,847</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Goals</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Reduce water usage by 10%</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Achieve 50% renewable energy</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Reduce carbon footprint by 15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainabilityScreen;