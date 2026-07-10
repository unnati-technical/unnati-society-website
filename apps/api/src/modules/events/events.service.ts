import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventsRepository } from './repositories/events.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateEventDto } from './create-event.dto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Holidays = require('date-holidays');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ical = require('node-ical');

const cachedHolidays: any[] = [];
const lastFetchedHolidays = 0;

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findAll(includeExpired = false) {
    const now = new Date();

    const where = includeExpired ? {} : { date: { gte: now } };

    return this.eventsRepository.findMany({
      where,
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.eventsRepository.findUnique({ where: { id } });
  }

  async create(dto: CreateEventDto) {
    return this.eventsRepository.create({
      data: {
        title: dto.title,
        description: dto.description || '',
        date: new Date(dto.date),
        location: dto.location || '',
        link: dto.link || null,
        color: dto.color || null,
        photos: dto.photos || [],
        eventType: dto.eventType || 'AUTO',
      },
    });
  }

  async update(id: string, dto: Partial<CreateEventDto>) {
    return this.eventsRepository.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
        ...(dto.location !== undefined && { location: dto.location }),
        ...(dto.link !== undefined && { link: dto.link }),
        ...(dto.color !== undefined && { color: dto.color }),
        ...(dto.photos !== undefined && { photos: dto.photos }),
        ...(dto.eventType !== undefined && { eventType: dto.eventType }),
      },
    });
  }

  async remove(id: string) {
    const event = await this.eventsRepository.findUnique({ where: { id } });
    if (event && event.photos && event.photos.length > 0) {
      for (const url of event.photos) {
        const match = url.match(/\/v\d+\/(.+)\.[a-zA-Z]+$/);
        if (match && match[1]) {
          await this.cloudinaryService.deleteFile(match[1]).catch(() => {});
        }
      }
    }
    return this.eventsRepository.delete({ where: { id } });
  }

  // Returns events for the public homepage
  async findUpcoming() {
    const dbEvents = await this.eventsRepository.findMany({});

    return dbEvents
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 10);
  }
}
