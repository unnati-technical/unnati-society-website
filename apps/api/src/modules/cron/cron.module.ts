import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../queues/email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [CronService],
})
export class CronModule {}
