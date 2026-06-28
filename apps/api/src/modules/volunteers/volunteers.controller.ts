import { Controller, Get, Param, Patch, Body, UseGuards, Post } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('volunteers')
@UseGuards(JwtAuthGuard)
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Public()
  @Post('apply')
  apply(@Body() createDto: any) {
    return this.volunteersService.apply(createDto);
  }

  @Public()
  @Post()
  create(@Body() createDto: any) {
    // Admin adding volunteer directly
    return this.volunteersService.apply(createDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.volunteersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteersService.findOne(id);
  }

  @Public()
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.volunteersService.updateStatus(id, status);
  }
}
