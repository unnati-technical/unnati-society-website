import { Module } from '@nestjs/common';
import { LeadershipController } from './leadership.controller';
import { LeadershipService } from './leadership.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { LeadershipRepository } from './repositories/leadership.repository';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [LeadershipController],
  providers: [LeadershipService, LeadershipRepository]
})
export class LeadershipModule {}
