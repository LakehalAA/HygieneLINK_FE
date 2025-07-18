const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hygienelink-production.up.railway.app/api/v1';

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Dashboard API
export const dashboardAPI = {
  // Get main dashboard KPI metrics
  getMetrics: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/dashboard/metrics${params}`);
  },

  // Get consumption trends with predictions
  getConsumptionTrends: async (days = 30, facilityId = null) => {
    const params = new URLSearchParams();
    params.append('days', days.toString());
    if (facilityId) params.append('facility_id', facilityId);
    
    return apiRequest(`/dashboard/consumption-trends?${params.toString()}`);
  },

  // Get active alerts and notifications
  getAlerts: async (severity = null, facilityId = null) => {
    const params = new URLSearchParams();
    if (severity) params.append('severity', severity);
    if (facilityId) params.append('facility_id', facilityId);
    
    return apiRequest(`/dashboard/alerts?${params.toString()}`);
  },

  // Get AI-powered insights and recommendations
  getAIInsights: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/dashboard/ai-insights${params}`);
  },

  // Get sustainability and environmental impact metrics
  getSustainabilityMetrics: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/dashboard/sustainability-metrics${params}`);
  },
};

// Forecasting API
export const forecastingAPI = {
  // Train SARIMAX model for specific product/facility
  trainModel: async (productId, facilityId, retrain = false) => {
    return apiRequest('/forecasting/train-model', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        facility_id: facilityId,
        retrain: retrain,
      }),
    });
  },

  // Generate consumption forecast using SARIMAX
  generateForecast: async (productId, facilityId, daysAhead = 30, includeConfidenceIntervals = true) => {
    return apiRequest('/forecasting/forecast', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        facility_id: facilityId,
        days_ahead: daysAhead,
        include_confidence_intervals: includeConfidenceIntervals,
      }),
    });
  },

  // Get list of trained forecasting models
  getTrainedModels: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/forecasting/models${params}`);
  },
};

// Inventory API
export const inventoryAPI = {
  // Get current inventory status across facilities
  getInventoryStatus: async (facilityId = null, lowStockOnly = false) => {
    const params = new URLSearchParams();
    if (facilityId) params.append('facility_id', facilityId);
    if (lowStockOnly) params.append('low_stock_only', 'true');
    
    return apiRequest(`/inventory/status?${params.toString()}`);
  },

  // Get AI-powered reorder recommendations
  getReorderRecommendations: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/inventory/reorder-recommendations${params}`);
  },

  // Update inventory stock level
  updateStockLevel: async (inventoryId, newStockLevel) => {
    return apiRequest(`/inventory/update-stock/${inventoryId}`, {
      method: 'PUT',
      body: JSON.stringify({ new_stock_level: newStockLevel }),
    });
  },

  // Get comprehensive inventory optimization analysis
  getOptimizationAnalysis: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/inventory/optimization-analysis${params}`);
  },
};

// Compliance API
export const complianceAPI = {
  // Get overall compliance status
  getComplianceStatus: async (facilityId = null) => {
    const params = facilityId ? `?facility_id=${facilityId}` : '';
    return apiRequest(`/compliance/status${params}`);
  },

  // Get detailed certification information
  getCertifications: async (status = null) => {
    const params = status ? `?status=${status}` : '';
    return apiRequest(`/compliance/certifications${params}`);
  },

  // Get compliance audit trail and history
  getAuditTrail: async (facilityId = null, days = 30) => {
    const params = new URLSearchParams();
    if (facilityId) params.append('facility_id', facilityId);
    params.append('days', days.toString());
    
    return apiRequest(`/compliance/audit-trail?${params.toString()}`);
  },
};

// Utility functions for common operations
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error, defaultMessage = 'An error occurred') => {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.message || defaultMessage,
      error: error,
    };
  },

  // Format API responses consistently
  formatResponse: (data, message = 'Success') => {
    return {
      success: true,
      message: message,
      data: data,
    };
  },

  // Validate required parameters
  validateRequired: (params, requiredFields) => {
    const missing = requiredFields.filter(field => !params[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required parameters: ${missing.join(', ')}`);
    }
  },

  // Convert dates to ISO format for API
  formatDate: (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  },

  // Parse API date responses
  parseDate: (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  },
};

// Combined API methods for common use cases
export const combinedAPI = {
  // Get dashboard overview with all metrics
  getDashboardOverview: async (facilityId = null) => {
    try {
      const [metrics, trends, alerts, insights, sustainability] = await Promise.all([
        dashboardAPI.getMetrics(facilityId),
        dashboardAPI.getConsumptionTrends(30, facilityId),
        dashboardAPI.getAlerts(null, facilityId),
        dashboardAPI.getAIInsights(facilityId),
        dashboardAPI.getSustainabilityMetrics(facilityId),
      ]);

      return apiUtils.formatResponse({
        metrics,
        trends,
        alerts,
        insights,
        sustainability,
      }, 'Dashboard data loaded successfully');
    } catch (error) {
      return apiUtils.handleError(error, 'Failed to load dashboard data');
    }
  },

  // Get inventory overview with recommendations
  getInventoryOverview: async (facilityId = null) => {
    try {
      const [status, recommendations, analysis] = await Promise.all([
        inventoryAPI.getInventoryStatus(facilityId),
        inventoryAPI.getReorderRecommendations(facilityId),
        inventoryAPI.getOptimizationAnalysis(facilityId),
      ]);

      return apiUtils.formatResponse({
        status,
        recommendations,
        analysis,
      }, 'Inventory data loaded successfully');
    } catch (error) {
      return apiUtils.handleError(error, 'Failed to load inventory data');
    }
  },

  // Get compliance overview
  getComplianceOverview: async (facilityId = null) => {
    try {
      const [status, certifications, auditTrail] = await Promise.all([
        complianceAPI.getComplianceStatus(facilityId),
        complianceAPI.getCertifications(),
        complianceAPI.getAuditTrail(facilityId),
      ]);

      return apiUtils.formatResponse({
        status,
        certifications,
        auditTrail,
      }, 'Compliance data loaded successfully');
    } catch (error) {
      return apiUtils.handleError(error, 'Failed to load compliance data');
    }
  },

  // Get forecasting overview
  getForecastingOverview: async (facilityId = null) => {
    try {
      const models = await forecastingAPI.getTrainedModels(facilityId);
      
      return apiUtils.formatResponse({
        models,
      }, 'Forecasting data loaded successfully');
    } catch (error) {
      return apiUtils.handleError(error, 'Failed to load forecasting data');
    }
  },
};

// Export default API object with all services
const api = {
  dashboard: dashboardAPI,
  forecasting: forecastingAPI,
  inventory: inventoryAPI,
  compliance: complianceAPI,
  combined: combinedAPI,
  utils: apiUtils,
};

export default api;