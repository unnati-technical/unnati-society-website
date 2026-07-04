import { apiClient } from './client';

export const notificationsApi = {
  // App Notifications
  getNotifications: () => apiClient.get('/api/notifications'),
  readAll: () => apiClient.patch('/api/notifications/read-all'),
  readOne: (id: string) => apiClient.patch(`/api/notifications/${id}/read`),

  // Email Notification Settings
  getRecipients: () => apiClient.get('/api/notification-recipients'),
  addRecipient: (data: any) => apiClient.post('/api/notification-recipients', data),
  updateRecipient: (id: string, data: any) => apiClient.patch(`/api/notification-recipients/${id}`, data),
  removeRecipient: (id: string) => apiClient.delete(`/api/notification-recipients/${id}`),
};
