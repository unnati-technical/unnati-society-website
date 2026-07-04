import { apiClient } from './client';

export const contactApi = {
  submit: (data) => apiClient.post('/api/contact', data),
};
