import { apiClient } from './client';

export const authApi = {
  getMe: () => apiClient.get('/api/team-leads/me'),
};
