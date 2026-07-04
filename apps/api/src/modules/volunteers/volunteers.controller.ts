import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Post,
  Query,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { VolunteersService } from './volunteers.service';
import { ApplyVolunteerDto } from './dto/apply-volunteer.dto';
import { UpdateVolunteerStatusDto } from './dto/update-volunteer-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('volunteers')
@UseGuards(JwtAuthGuard)
export class VolunteersController {
  constructor(
    private readonly volunteersService: VolunteersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Public()
  @Post('apply')
  async apply(@Body() createDto: ApplyVolunteerDto) {
    const result = await this.volunteersService.apply(createDto);
    // Invalidate the volunteers cache key
    await this.cacheManager.del('volunteers');
    return result;
  }

  @Public()
  @Post()
  async create(@Body() createDto: ApplyVolunteerDto) {
    // Admin adding volunteer directly
    const result = await this.volunteersService.apply(createDto);
    await this.cacheManager.del('volunteers');
    return result;
  }

  @Public()
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.volunteersService.findAll(query);
  }

  @Public()
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteersService.findOne(id);
  }

  @Public()
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateDto: UpdateVolunteerStatusDto) {
    const result = await this.volunteersService.updateStatus(id, updateDto.status);
    await this.cacheManager.del('volunteers');
    return result;
  }
}
