import { Module } from '@nestjs/common';
import { LeadershipController } from './leadership.controller';
import { LeadershipService } from './leadership.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ImageKitModule } from '../imagekit/imagekit.module';
import { LeadershipRepository } from './repositories/leadership.repository';

@Module({
  imports: [PrismaModule, ImageKitModule],
  controllers: [LeadershipController],
  providers: [LeadershipService, LeadershipRepository],
})
export class LeadershipModule {}
