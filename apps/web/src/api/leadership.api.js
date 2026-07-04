import { apiClient } from './client';

export const leadershipApi = {
  getLeadershipData: () => apiClient.get('/api/leadership'),
};
