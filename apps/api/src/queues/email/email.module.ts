import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { SystemSettingsModule } from '../../modules/system-settings/system-settings.module';

@Module({
  imports: [PrismaModule, SystemSettingsModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
