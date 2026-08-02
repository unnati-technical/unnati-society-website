import { Module } from '@nestjs/common';
import { OutreachController } from './outreach.controller';
import { OutreachService } from './outreach.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ImageKitModule } from '../imagekit/imagekit.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../../queues/email/email.module';
import {
  InviteRepository,
  CampusVisitRepository,
  PartnerRepository,
} from './repositories/outreach.repository';

@Module({
  imports: [PrismaModule, ImageKitModule, NotificationsModule, EmailModule],
  controllers: [OutreachController],
  providers: [
    OutreachService,
    InviteRepository,
    CampusVisitRepository,
    PartnerRepository,
  ],
  exports: [OutreachService],
})
export class OutreachModule {}
