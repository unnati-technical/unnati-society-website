import { apiClient } from './client';

export const authApi = {
  getMe: () => apiClient.get('/api/team-leads/me'),
  apply: (data) => apiClient.post('/api/team-leads/apply', data),
};
