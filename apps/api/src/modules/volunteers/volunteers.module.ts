import { Module } from '@nestjs/common';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { VolunteersRepository } from './repositories/volunteers.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../queues/email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, EmailModule, NotificationsModule],
  controllers: [VolunteersController],
  providers: [VolunteersService, VolunteersRepository],
  exports: [VolunteersService],
})
export class VolunteersModule {}
