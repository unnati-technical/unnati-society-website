import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repository/base.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class EventsRepository extends BaseRepository<any, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'event');
  }
}
