import { apiClient } from './client';

export const eventsApi = {
  getAll: () => apiClient.get('/api/events?all=true'),
  create: (data: any) => apiClient.post('/api/events', data),
  update: (id: string, data: any) => apiClient.patch(`/api/events/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/events/${id}`),
  uploadPhotos: (id: string, data: FormData) => apiClient.post(`/api/events/${id}/photos`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAutoModeSettings: () => apiClient.get('/api/events/settings/auto-mode'),
  updateAutoModeSettings: (data: any) => apiClient.put('/api/events/settings/auto-mode', data),
};
