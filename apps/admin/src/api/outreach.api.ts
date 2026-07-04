import { apiClient } from './client';

export const outreachApi = {
  // Partner Requests
  getPartnerRequests: () => apiClient.get('/api/outreach/partner-requests'),
  updatePartnerRequestStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/partner-request/${id}/status`, data),
  updatePartnerRequestNotes: (id: string, data: any) => apiClient.patch(`/api/outreach/partner-request/${id}/notes`, data),

  // School Invites
  getInvites: () => apiClient.get('/api/outreach/invites'),
  updateInviteStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/invite/${id}/status`, data),

  // Campus Visits
  getCampusVisits: () => apiClient.get('/api/outreach/campus-visits'),
  updateCampusVisitStatus: (id: string, data: any) => apiClient.patch(`/api/outreach/campus-visit/${id}/status`, data),
};
