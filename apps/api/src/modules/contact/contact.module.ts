import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../queues/email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, EmailModule, NotificationsModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
