import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './create-event.dto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Holidays = require('date-holidays');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ical = require('node-ical');

let cachedHolidays: any[] = [];
let lastFetchedHolidays = 0;

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeExpired = false) {
    const now = new Date();

    // Auto-delete expired events from the database (events older than today)
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      await this.prisma.event.deleteMany({
        where: { date: { lt: startOfToday } },
      });
    } catch (e) {
      // Ignore DB timeouts
    }

    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'AUTO_EVENT_MODE' },
    });
    const autoMode = setting ? setting.value === 'true' : true;

    const where = includeExpired ? {} : { date: { gte: now } };

    const dbEvents = await this.prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    if (autoMode) {
      let rawHolidays = await this.getSystemHolidays(now);

      if (!includeExpired) {
        rawHolidays = rawHolidays.filter((h) => new Date(h.date) >= now);
      }

      const systemHolidays = rawHolidays.map((h, idx) => ({
        id: `sys-holiday-${h.date.getTime()}-${idx}`,
        title: h.name,
        description: `System Holiday (${h.type})`,
        date: h.date,
        location: 'India',
        link: null,
        color: 'bg-slate-300',
        isHoliday: true,
      }));

      return [...dbEvents, ...systemHolidays].sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
      );
    }

    return dbEvents;
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description || '',
        date: new Date(dto.date),
        location: dto.location || '',
        link: dto.link || null,
        color: dto.color || null,
      },
    });
  }

  async update(id: string, dto: Partial<CreateEventDto>) {
    return this.prisma.event.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
        ...(dto.location !== undefined && { location: dto.location }),
        ...(dto.link !== undefined && { link: dto.link }),
        ...(dto.color !== undefined && { color: dto.color }),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  // Helper method to get comprehensive holidays
  async getSystemHolidays(now: Date) {
    if (
      cachedHolidays.length > 0 &&
      now.getTime() - lastFetchedHolidays < 24 * 60 * 60 * 1000
    ) {
      return cachedHolidays.filter((h) => h.date >= now);
    }

    try {
      const events = await ical.async.fromURL(
        'https://calendar.google.com/calendar/ical/en.indian%23holiday%40group.v.calendar.google.com/public/basic.ics',
      );
      const holidays: any[] = [];
      for (const event of Object.values(events)) {
        const ev = event as any;
        if (ev.type === 'VEVENT' && ev.start) {
          holidays.push({
            name: ev.summary,
            date: new Date(ev.start),
            type: 'Public/Religious Holiday',
          });
        }
      }

      cachedHolidays = holidays.sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
      );
      lastFetchedHolidays = now.getTime();
      return cachedHolidays.filter((h) => h.date >= now);
    } catch (error: any) {
      console.warn(
        'Failed to fetch ICS, falling back to date-holidays',
        error.message,
      );
      const hd = new Holidays('IN');
      let rawHolidays = hd.getHolidays(now.getFullYear());
      if (now.getMonth() === 11) {
        rawHolidays = [
          ...rawHolidays,
          ...hd.getHolidays(now.getFullYear() + 1),
        ];
      }
      return rawHolidays
        .filter((h) => new Date(h.date) >= now)
        .map((h) => ({
          name: h.name,
          date: new Date(h.date),
          type: h.type,
        }));
    }
  }

  // Returns events for the public homepage based on auto-mode setting
  async findUpcoming() {
    let autoMode = true; // Default to true
    let dbEvents: any[] = [];
    const now = new Date();

    // Auto-delete expired events from the database (events older than today)
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      await this.prisma.event.deleteMany({
        where: { date: { lt: startOfToday } },
      });
    } catch (e) {
      // Ignore DB timeouts
    }

    // Attempt to fetch DB settings and events, gracefully degrading if the DB is unreachable
    try {
      const setting = await this.prisma.systemSetting.findUnique({
        where: { key: 'AUTO_EVENT_MODE' },
      });
      if (setting) autoMode = setting.value === 'true';

      dbEvents = await this.prisma.event.findMany({
        where: { date: { gte: now } },
      });
    } catch (error: any) {
      console.warn(
        'Database unreachable, gracefully degrading to mathematical holidays.',
        error.message,
      );
    }

    if (autoMode) {
      // Fetch comprehensive system holidays
      const rawHolidays = await this.getSystemHolidays(now);

      const systemHolidays = rawHolidays.map((h, idx) => ({
        id: `sys-holiday-${h.date.getTime()}-${idx}`,
        title: h.name,
        description: `System Holiday (${h.type})`,
        date: h.date,
        location: 'India',
        link: null,
        color: 'bg-slate-300',
        isHoliday: true,
      }));

      // Merge, sort chronologically, and take the next 6
      const allUpcoming = [...dbEvents, ...systemHolidays]
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 6);

      return allUpcoming;
    } else {
      // Manual mode: show only DB events
      return dbEvents
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 6);
    }
  }

  async getAutoMode() {
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'AUTO_EVENT_MODE' },
    });
    return { autoMode: setting ? setting.value === 'true' : true };
  }

  async setAutoMode(autoMode: boolean) {
    await this.prisma.systemSetting.upsert({
      where: { key: 'AUTO_EVENT_MODE' },
      update: { value: String(autoMode) },
      create: { key: 'AUTO_EVENT_MODE', value: String(autoMode) },
    });
    return { autoMode };
  }
}
