import { apiClient } from './client';

export const authApi = {
  getMe: (email: string) => apiClient.get('/api/admins/verify?email=' + encodeURIComponent(email)),
};
