import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { PrismaModule } from '../../prisma/prisma.module';
import { SystemSettingsModule } from '../../modules/system-settings/system-settings.module';

@Module({
  imports: [
    PrismaModule, 
    SystemSettingsModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService],
})
export class EmailModule {}
