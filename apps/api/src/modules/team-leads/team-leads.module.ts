import { Module } from '@nestjs/common';
import { TeamLeadsController } from './team-leads.controller';
import { TeamLeadsService } from './team-leads.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../queues/email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, EmailModule, NotificationsModule],
  controllers: [TeamLeadsController],
  providers: [TeamLeadsService],
  exports: [TeamLeadsService],
})
export class TeamLeadsModule {}
