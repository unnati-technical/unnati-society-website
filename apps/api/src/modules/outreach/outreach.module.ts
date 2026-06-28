import { Module } from '@nestjs/common';
import { OutreachController } from './outreach.controller';
import { OutreachService } from './outreach.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EmailModule } from '../../queues/email/email.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, NotificationsModule, EmailModule],
  controllers: [OutreachController],
  providers: [OutreachService],
})
export class OutreachModule {}
