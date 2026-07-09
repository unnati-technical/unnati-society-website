import { apiClient } from './client';

export const outreachApi = {
  // Partner Requests
  getPartnerRequests: () => apiClient.get('/api/outreach/partner-requests'),
  updatePartnerRequestStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/partner-request/${id}/status`, data),
  updatePartnerRequestNotes: (id: string, data: any) => apiClient.patch(`/api/outreach/partner-request/${id}/notes`, data),
  deletePartnerRequest: (id: string) => apiClient.delete(`/api/outreach/partner-request/${id}`),
  bulkDeletePartnerRequests: (ids: string[]) => apiClient.post('/api/outreach/partner-request/bulk-delete', { ids }),

  // School Invites
  getInvites: () => apiClient.get('/api/outreach/invites'),
  updateInviteStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/invite/${id}/status`, data),
  deleteInvite: (id: string) => apiClient.delete(`/api/outreach/invite/${id}`),
  bulkDeleteInvites: (ids: string[]) => apiClient.post('/api/outreach/invite/bulk-delete', { ids }),

  // Campus Visits
  getCampusVisits: () => apiClient.get('/api/outreach/campus-visits'),
  updateCampusVisitStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/campus-visit/${id}/status`, data),
  deleteCampusVisit: (id: string) => apiClient.delete(`/api/outreach/campus-visit/${id}`),
  bulkDeleteCampusVisits: (ids: string[]) => apiClient.post('/api/outreach/campus-visit/bulk-delete', { ids }),
};
