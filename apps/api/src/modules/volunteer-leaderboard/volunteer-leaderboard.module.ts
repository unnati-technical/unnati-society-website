import { Module } from '@nestjs/common';
import { VolunteerLeaderboardService } from './volunteer-leaderboard.service';
import { VolunteerLeaderboardController } from './volunteer-leaderboard.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ImageKitModule } from '../imagekit/imagekit.module';

@Module({
  imports: [PrismaModule, ImageKitModule],
  controllers: [VolunteerLeaderboardController],
  providers: [VolunteerLeaderboardService],
  exports: [VolunteerLeaderboardService],
})
export class VolunteerLeaderboardModule {}
