import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationRecipientsService {
  private readonly logger = new Logger(NotificationRecipientsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.notificationRecipient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { email: string; name?: string }) {
    const existing = await this.prisma.notificationRecipient.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Recipient with this email already exists.');
    }

    const recipient = await this.prisma.notificationRecipient.create({
      data,
    });

    this.logger.log(`Added new notification recipient: ${data.email}`);
    return recipient;
  }

  async remove(id: string) {
    const existing = await this.prisma.notificationRecipient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Recipient not found');
    }

    await this.prisma.notificationRecipient.delete({
      where: { id },
    });

    this.logger.log(`Removed notification recipient: ${existing.email}`);
    return { success: true };
  }
}
