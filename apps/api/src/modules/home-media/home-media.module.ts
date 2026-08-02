import { Module } from '@nestjs/common';
import { HomeMediaController } from './home-media.controller';
import { HomeMediaService } from './home-media.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { ImageKitModule } from '../imagekit/imagekit.module';

@Module({
  imports: [PrismaModule, ImageKitModule],
  controllers: [HomeMediaController],
  providers: [HomeMediaService],
  exports: [HomeMediaService],
})
export class HomeMediaModule {}
