import { apiClient } from './client';

export const donationsApi = {
  getAll: () => apiClient.get('/api/donations'),
  delete: (id: string) => apiClient.delete(`/api/donations/${id}`),
};
