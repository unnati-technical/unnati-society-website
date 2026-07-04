import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EventsRepository } from './repositories/events.repository';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService],
})
export class EventsModule {}
