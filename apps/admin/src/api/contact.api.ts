import { apiClient } from './client';

export const contactApi = {
  getMessages: () => apiClient.get('/api/contact'),
  updateStatus: (id: string, data: any) => apiClient.patch(`/api/contact/${id}/status`, data),
  reply: (id: string, data: any) => apiClient.post(`/api/contact/${id}/reply`, data),
};
