import { apiClient } from './client';

export const outreachApi = {
  partner: (data) => apiClient.post('/api/outreach/partner', data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  }),
  invite: (data) => apiClient.post('/api/outreach/invite', data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  }),
  campusVisit: (data) => apiClient.post('/api/outreach/campus-visit', data, {
    headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
  }),
};
