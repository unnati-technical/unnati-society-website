import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { CreateCampusVisitDto } from './dto/create-campus-visit.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class OutreachService {
  private readonly logger = new Logger(OutreachService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async invite(dto: CreateOutreachDto) {
    return { id: 'mock-id-' + Date.now(), ...dto, createdAt: new Date() };
  }

  async campusVisit(dto: CreateCampusVisitDto) {
    return { id: 'mock-id-' + Date.now(), ...dto, createdAt: new Date() };
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

    const partnerRequest = await this.prisma.partnerRequest.create({
      data: {
        ...dto,
        documentUrl,
      },
    });
    return partnerRequest;
  }
}
