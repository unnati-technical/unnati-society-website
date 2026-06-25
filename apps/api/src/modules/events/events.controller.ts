import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';
import { EventsService } from './events.service';
import { CreateEventDto } from './create-event.dto';
import { Public } from '../auth/decorators/public.decorator';

// TODO: Protect with JwtAuthGuard once the admin login flow is built
@Public()
@CacheTTL(0) // Disable cache – events must be real-time for the admin panel
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Public endpoint: returns events for the homepage (depends on auto mode)
  @Public()
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get('settings/auto-mode')
  getAutoMode() {
    return this.eventsService.getAutoMode();
  }

  @Post('settings/auto-mode')
  setAutoMode(@Body() dto: { autoMode: boolean }) {
    return this.eventsService.setAutoMode(dto.autoMode);
  }

  // Admin endpoint: returns all events (pass ?all=true to include past ones)
  @Get()
  findAll(@Query('all') all?: string) {
    return this.eventsService.findAll(all === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateEventDto>) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
