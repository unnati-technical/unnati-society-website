import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repository/base.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class InviteRepository extends BaseRepository<any, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'outreachRequest');
  }
}

@Injectable()
export class CampusVisitRepository extends BaseRepository<any, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'campusVisitRequest');
  }
}

@Injectable()
export class PartnerRepository extends BaseRepository<any, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'partnerRequest');
  }
}
