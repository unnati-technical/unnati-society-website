import { apiClient } from './client';

export const donationsApi = {
  createOrder: (data) => apiClient.post('/api/donations/create-order', data),
  verifyPayment: (data) => apiClient.post('/api/donations/verify-payment', data),
};
