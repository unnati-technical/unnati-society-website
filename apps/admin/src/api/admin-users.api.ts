import { apiClient } from './client';

export const adminUsersApi = {
  getAll: () => apiClient.get('/api/admins'),
  verify: (email: string) => apiClient.get(`/api/admins/verify?email=${encodeURIComponent(email)}`),
  create: (data: { email: string; name: string }) => apiClient.post('/api/admins', data),
  delete: (id: string) => apiClient.delete(`/api/admins/${id}`),
};
