import { apiClient } from './client';

export const volunteersApi = {
  apply: (data) => apiClient.post('/api/volunteers/apply', data),
};
