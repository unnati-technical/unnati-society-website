import { apiClient } from './client';

export const subscribersApi = {
  getSubscribers: async () => {
    const response = await apiClient.get('/api/subscribers');
    return response;
  },
  
  addSubscriber: async (email: string) => {
    const response = await apiClient.post('/api/subscribers', { email });
    return response;
  },
  
  deleteSubscriber: async (id: string) => {
    const response = await apiClient.delete(`/api/subscribers/${id}`);
    return response;
  }
};
