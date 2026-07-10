import { apiClient } from './client';

export const leaderboardApi = {
  getByMonth: (month) => apiClient.get(`/api/volunteer-leaderboard?month=${month}`),
  getMonths: () => apiClient.get('/api/volunteer-leaderboard/months'),
  getActiveMonth: () => apiClient.get('/api/volunteer-leaderboard/active-month'),
};
