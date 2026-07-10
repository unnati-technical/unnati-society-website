import { apiClient } from './client';

export const homeMediaApi = {
  getAll: () => apiClient.get('/api/home-media'),
};
