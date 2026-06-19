import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOutreachDto } from './dto/create-outreach.dto';
import { CreateCampusVisitDto } from './dto/create-campus-visit.dto';

@Injectable()
export class OutreachService {
  constructor(private readonly prisma: PrismaService) {}

  async invite(dto: CreateOutreachDto) {
    return { id: 'mock-id-' + Date.now(), ...dto, createdAt: new Date() };
  }

  async campusVisit(dto: CreateCampusVisitDto) {
    return { id: 'mock-id-' + Date.now(), ...dto, createdAt: new Date() };
  }
}
