import { Module } from '@nestjs/common';
import { NotificationRecipientsService } from './notification-recipients.service';
import { NotificationRecipientsController } from './notification-recipients.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationRecipientsController],
  providers: [NotificationRecipientsService],
  exports: [NotificationRecipientsService],
})
export class NotificationRecipientsModule {}
