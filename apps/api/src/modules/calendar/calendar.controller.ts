import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('calendar')
@UseGuards(FirebaseAuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('events')
  async getEvents(
    @Query('start') start: string,
    @Query('end') end: string,
    @Query('calendarId') calendarId?: string,
  ) {
    if (!start || !end) {
      throw new BadRequestException('start and end dates are required');
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    // If a specific calendar ID is requested, fetch it. Otherwise default to 'primary' (the service account's own calendar)
    // Note: For personal calendars, the user must share their Google Calendar with the service account email.
    return this.calendarService.getEvents(
      startDate,
      endDate,
      calendarId || 'primary',
    );
  }
}
