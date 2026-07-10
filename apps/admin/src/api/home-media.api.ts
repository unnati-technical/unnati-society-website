import { apiClient } from './client';

export interface HomeMediaItem {
  id: string;
  type: string; // "VIDEO" or "PHOTO"
  url: string;
  title: string | null;
  subtitle: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const homeMediaApi = {
  getAll: (): Promise<HomeMediaItem[]> => apiClient.get('/api/home-media'),
  create: (formData: FormData): Promise<HomeMediaItem> =>
    apiClient.post('/api/home-media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: Partial<HomeMediaItem>): Promise<HomeMediaItem> =>
    apiClient.patch(`/api/home-media/${id}`, data),
  delete: (id: string): Promise<void> => apiClient.delete(`/api/home-media/${id}`),
};
