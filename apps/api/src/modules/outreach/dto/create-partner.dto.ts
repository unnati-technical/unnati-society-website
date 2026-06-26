export class CreatePartnerDto {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  website?: string;
  linkedin?: string;
  organizationType: string;
  partnershipInterest: string;
  collaborationMode?: string;
  areasOfInterest?: string[];
  message?: string;
  meetingMode?: string;
  meetingDate?: Date | string;
  documentUrl?: string;
}
