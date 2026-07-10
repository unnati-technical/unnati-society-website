import { Injectable, Logger } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);
  private calendar: calendar_v3.Calendar;

  constructor(private readonly prisma: PrismaService) {
    let keyFilePath = path.join(
      process.cwd(),
      'src',
      'config',
      'google-service-account.json',
    );

    if (!fs.existsSync(keyFilePath)) {
      keyFilePath = path.join(
        __dirname,
        '../../config/google-service-account.json',
      );
    }

    // Initialize the Service Account auth
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async getEvents(
    timeMin: Date,
    timeMax: Date,
    calendarId: string = 'primary',
  ) {
    try {
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      });

      let events = response.data.items || [];

      // Fetch Indian holidays if calendarId is primary
      if (calendarId === 'primary') {
        try {
          const holidayResponse = await this.calendar.events.list({
            calendarId: 'en.indian#holiday@group.v.calendar.google.com',
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
          });

          const holidays = holidayResponse.data.items || [];
          const markedHolidays = holidays.map((h) => ({
            ...h,
            isHoliday: true,
            summary: `✨ ${h.summary}`,
          }));

          // Also fetch Upcoming Events from Unnati DB
          try {
            const dbEvents = await this.prisma.event.findMany({
              where: {
                date: {
                  gte: timeMin,
                  lte: timeMax,
                },
              },
            });
            const mappedDbEvents = dbEvents.map((e) => ({
              id: `db-${e.id}`,
              summary: `[Unnati] ${e.title}`,
              description: e.description,
              location: e.location,
              start: {
                dateTime: e.date.toISOString(),
              },
              end: {
                dateTime: new Date(
                  e.date.getTime() + 2 * 60 * 60 * 1000,
                ).toISOString(),
              },
              isUnnatiEvent: true,
            }));
            events = [...events, ...mappedDbEvents];
          } catch (dbError) {
            this.logger.warn('Failed to fetch Unnati DB events', dbError);
          }

          events = [...events, ...markedHolidays];

          events.sort((a, b) => {
            const timeA = new Date(
              a.start?.dateTime || a.start?.date || 0,
            ).getTime();
            const timeB = new Date(
              b.start?.dateTime || b.start?.date || 0,
            ).getTime();
            return timeA - timeB;
          });
        } catch (holidayError) {
          this.logger.warn('Failed to fetch Indian holidays', holidayError);
        }
      }

      return events;
    } catch (error) {
      this.logger.error('Failed to fetch calendar events', error);
      throw error;
    }
  }
}
