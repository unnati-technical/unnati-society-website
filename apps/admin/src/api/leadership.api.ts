import { apiClient } from './client';

export const leadershipApi = {
  // GET
  getLeadershipData: () => apiClient.get<any[]>('/api/leadership') as Promise<any>,
  
  // POST
  createYear: (data: { year: string }) => 
    apiClient.post('/api/leadership/year', data),
  
  createSection: (data: { yearId: string; name: string; slug: string; badgeColor: string; isVisible: boolean }) => 
    apiClient.post('/api/leadership/section', data),

  createMember: (data: any) => 
    apiClient.post('/api/leadership/member', data),

  uploadImage: (data: FormData) => 
    apiClient.post('/api/leadership/upload-image', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  
  reorderSections: (data: { id: string; displayOrder: number }[]) => 
    apiClient.post('/api/leadership/reorder/sections', data),
  
  reorderMembers: (data: { id: string; sectionId: string; displayOrder: number }[]) => 
    apiClient.post('/api/leadership/reorder/members', data),

  // PATCH
  updateSection: (id: string, data: any) => 
    apiClient.patch(`/api/leadership/section/${id}`, data),
  
  updateMember: (id: string, data: any) => 
    apiClient.patch(`/api/leadership/member/${id}`, data),

  setYearActive: (id: string) => 
    apiClient.patch(`/api/leadership/year/${id}/active`),
  
  // DELETE
  deleteSection: (id: string) => 
    apiClient.delete(`/api/leadership/section/${id}`),
  
  deleteMember: (id: string) => 
    apiClient.delete(`/api/leadership/member/${id}`),
};
