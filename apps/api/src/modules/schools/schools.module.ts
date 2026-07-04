import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SchoolsRepository } from './repositories/schools.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository],
  exports: [SchoolsService],
})
export class SchoolsModule {}
