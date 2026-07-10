import { Module } from '@nestjs/common';
import { HomeMediaController } from './home-media.controller';
import { HomeMediaService } from './home-media.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [HomeMediaController],
  providers: [HomeMediaService],
  exports: [HomeMediaService],
})
export class HomeMediaModule {}
