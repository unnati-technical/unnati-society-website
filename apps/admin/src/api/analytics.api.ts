import { apiClient } from './client';

export const analyticsApi = {
  getRecentActivities: () => apiClient.get('/api/analytics/recent-activities'),
  getPendingApprovals: () => apiClient.get('/api/analytics/pending-approvals'),
  getKpis: () => apiClient.get('/api/analytics/kpis'),
};
