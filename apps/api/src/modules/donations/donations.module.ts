import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../../queues/email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
