import { apiClient } from './client';

export const volunteersApi = {
  getAll: () => apiClient.get('/api/volunteers'),
  create: (data: any) => apiClient.post('/api/volunteers', data),
  updateStatus: (id: string, data: any) => apiClient.patch(`/api/volunteers/${id}/status`, data),
  delete: (id: string) => apiClient.delete(`/api/volunteers/${id}`),
  bulkDelete: (ids: string[]) => apiClient.post('/api/volunteers/bulk-delete', { ids }),
};
