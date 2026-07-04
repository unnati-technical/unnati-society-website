import { apiClient } from './client';

export const volunteersApi = {
  getAll: () => apiClient.get('/api/volunteers'),
  create: (data: any) => apiClient.post('/api/volunteers', data),
  updateStatus: (id: string, data: any) => apiClient.put(`/api/volunteers/${id}/status`, data),
};
