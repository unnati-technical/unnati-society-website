import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { CreateCampusVisitDto } from './dto/create-campus-visit.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../../queues/email/email.service';

@Injectable()
export class OutreachService {
  private readonly logger = new Logger(OutreachService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  async invite(dto: CreateOutreachDto) {
    const dataToSave = { ...dto };
    delete (dataToSave as any).agreement1;
    delete (dataToSave as any).agreement2;

    const inviteRequest = await this.prisma.outreachRequest.create({
      data: dataToSave,
    });

    // Create in-app notification for admins
    await this.notificationsService.createAdminNotification(
      'New School Invite',
      `${dto.coordinatorName} from ${dto.institutionName} has invited Unnati Society to their school.`,
    ).catch(err => console.error('Failed to create invite notification:', err));

    // Send confirmation email to school
    await this.emailService.sendSchoolInviteReceivedEmail({
      coordinatorName: dto.coordinatorName,
      email: dto.email,
      institutionName: dto.institutionName,
    }).catch(err => console.error('Failed to send school invite received email:', err));

    return inviteRequest;
  }

  async campusVisit(dto: CreateCampusVisitDto) {
    const visitRequest = await this.prisma.campusVisitRequest.create({
      data: dto,
    });

    // Create in-app notification for admins
    await this.notificationsService.createAdminNotification(
      'New Campus Visit Request',
      `${dto.coordinatorName} from ${dto.institutionName} wants to book a campus visit.`,
    ).catch(err => console.error('Failed to create visit notification:', err));

    // Send confirmation email to school
    await this.emailService.sendCampusVisitReceivedEmail({
      coordinatorName: dto.coordinatorName,
      email: dto.email,
      institutionName: dto.institutionName,
    }).catch(err => console.error('Failed to send campus visit confirmation email:', err));

    return visitRequest;
  }

  async partner(dto: CreatePartnerDto, file?: Express.Multer.File) {
    let documentUrl = dto.documentUrl;

    if (file) {
      try {
        const uploadResult = await this.cloudinary.uploadFile(file);
        documentUrl = uploadResult.secure_url;
      } catch (error) {
        this.logger.error('Failed to upload file to Cloudinary', error);
      }
    }

    const dataToSave: any = { ...dto, documentUrl };
    if (dataToSave.meetingDate) {
      dataToSave.meetingDate = new Date(dataToSave.meetingDate);
    }

    const partnerRequest = await this.prisma.partnerRequest.create({
      data: dataToSave,
    });

    // Create in-app notification for admins
    await this.notificationsService.createAdminNotification(
      'New Partner Request',
      `${dto.name} from ${dto.organization || 'an organization'} wants to partner with us.`,
    ).catch(err => console.error('Failed to create partner notification:', err));

    // Send confirmation email to the partner
    await this.emailService.sendPartnerRequestReceivedEmail({
      name: dto.name,
      email: dto.email,
      organization: dto.organization || '',
    }).catch(err => console.error('Failed to send partner request confirmation email:', err));

    return partnerRequest;
  }

  async findAllInvites() {
    return this.prisma.outreachRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllCampusVisits() {
    return this.prisma.campusVisitRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPartnerRequests() {
    return this.prisma.partnerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateInviteStatus(id: string, status: string) {
    const updatedRequest = await this.prisma.outreachRequest.update({
      where: { id },
      data: { status },
    });

    if (updatedRequest) {
      await this.emailService.sendSchoolInviteStatusUpdateEmail({
        coordinatorName: updatedRequest.coordinatorName,
        email: updatedRequest.email,
        institutionName: updatedRequest.institutionName,
        status: status,
      }).catch(err => console.error('Failed to send school invite status update email:', err));
    }

    return updatedRequest;
  }

  async updateCampusVisitStatus(id: string, status: string) {
    const updatedRequest = await this.prisma.campusVisitRequest.update({
      where: { id },
      data: { status },
    });

    if (updatedRequest) {
      await this.emailService.sendCampusVisitStatusUpdateEmail({
        coordinatorName: updatedRequest.coordinatorName,
        email: updatedRequest.email,
        institutionName: updatedRequest.institutionName,
        status: status,
      }).catch(err => console.error('Failed to send campus visit status update email:', err));
    }

    return updatedRequest;
  }

  async updatePartnerStatus(id: string, status: string) {
    const updatedRequest = await this.prisma.partnerRequest.update({
      where: { id },
      data: { status },
    });

    if (updatedRequest) {
      await this.emailService.sendPartnerStatusUpdateEmail({
        name: updatedRequest.name,
        email: updatedRequest.email,
        organization: updatedRequest.organization || '',
        status: status,
      }).catch(err => console.error('Failed to send partner status update email:', err));
    }

    return updatedRequest;
  }

  async updatePartnerNotes(id: string, notes: string) {
    return this.prisma.partnerRequest.update({
      where: { id },
      data: { adminNotes: notes },
    });
  }
}
