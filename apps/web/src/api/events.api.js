import { apiClient } from './client';

export const eventsApi = {
  getUpcoming: () => apiClient.get('/api/events/upcoming'),
};
