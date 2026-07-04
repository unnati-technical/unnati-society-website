import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PartnersRepository } from './repositories/partners.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository],
  exports: [PartnersService],
})
export class PartnersModule {}
