import { Module } from '@nestjs/common';
import { VolunteerLeaderboardService } from './volunteer-leaderboard.service';
import { VolunteerLeaderboardController } from './volunteer-leaderboard.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [VolunteerLeaderboardController],
  providers: [VolunteerLeaderboardService],
  exports: [VolunteerLeaderboardService],
})
export class VolunteerLeaderboardModule {}
