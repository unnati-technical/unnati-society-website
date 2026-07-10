import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../queues/email/email.service';
import { startOfDay, endOfDay, addDays } from 'date-fns';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  // Run every day at 08:00 AM
  @Cron('0 8 * * *')
  async handleUpcomingEventNotifications() {
    this.logger.log('Running daily event notification check...');

    // Find events that are exactly 10 days from today
    const targetDate = addDays(new Date(), 10);
    const start = startOfDay(targetDate);
    const end = endOfDay(targetDate);

    const upcomingEvents = await this.prisma.event.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (upcomingEvents.length === 0) {
      this.logger.log('No events found exactly 10 days away.');
      return;
    }

    // Get all active newsletter subscribers
    const subscribers = await this.prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      this.logger.log('No active subscribers found.');
      return;
    }

    this.logger.log(
      `Found ${upcomingEvents.length} upcoming events and ${subscribers.length} subscribers.`,
    );

    // Send emails
    for (const event of upcomingEvents) {
      for (const subscriber of subscribers) {
        await this.emailService.sendEventNotification(subscriber.email, event);
      }
    }

    this.logger.log('Daily event notification check completed.');
  }
}
