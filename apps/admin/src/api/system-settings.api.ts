import { apiClient } from './client';

export const systemSettingsApi = {
  getSettings: () => apiClient.get('/api/system-settings'),
  updateSettings: (data: any) => apiClient.post('/api/system-settings', data),
};
