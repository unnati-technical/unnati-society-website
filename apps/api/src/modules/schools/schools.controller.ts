import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';

@Controller('schools')
@UseGuards(JwtAuthGuard)
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Public() // Allow frontend to fetch without token for now, or remove if token is sent
  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateSchoolDto) {
    return this.schoolsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateSchoolDto>) {
    return this.schoolsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }
}
