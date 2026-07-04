import { apiClient } from './client';

export const donationsApi = {
  getAll: () => apiClient.get('/api/donations'),
};
