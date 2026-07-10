import { apiClient } from './client';

export interface LeaderboardEntry {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  workshops: number;
  hours: number;
  linkedin: string | null;
  instagram: string | null;
  month: string;
  rank: number;
  createdAt: string;
  updatedAt: string;
}

export const volunteerLeaderboardApi = {
  getByMonth: (month: string): Promise<LeaderboardEntry[]> =>
    apiClient.get(`/api/volunteer-leaderboard?month=${month}`),
  getMonths: (): Promise<string[]> =>
    apiClient.get('/api/volunteer-leaderboard/months'),
  upsert: (formData: FormData): Promise<LeaderboardEntry> =>
    apiClient.post('/api/volunteer-leaderboard', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string): Promise<void> =>
    apiClient.delete(`/api/volunteer-leaderboard/${id}`),
  deleteMonth: (month: string): Promise<void> =>
    apiClient.delete(`/api/volunteer-leaderboard/month/${month}`),
  setMonthActive: (month: string): Promise<void> =>
    apiClient.patch(`/api/volunteer-leaderboard/month/${month}/active`),
  getActiveMonth: (): Promise<string | null> =>
    apiClient.get('/api/volunteer-leaderboard/active-month'),
};
