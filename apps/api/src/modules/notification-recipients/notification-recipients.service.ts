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

  async create(data: {
    email: string;
    name: string;
    department?: string;
    phone?: string;
    status?: string;
    categories?: string[];
  }) {
    const existing = await this.prisma.notificationRecipient.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Recipient with this email already exists.');
    }

    const recipient = await this.prisma.notificationRecipient.create({
      data: {
        email: data.email,
        name: data.name,
        department: data.department || 'General',
        phone: data.phone,
        status: data.status || 'Active',
        categories: data.categories || [],
      },
    });

    this.logger.log(`Added new notification recipient: ${data.email}`);
    return recipient;
  }

  async update(
    id: string,
    data: {
      name?: string;
      department?: string;
      phone?: string;
      status?: string;
      categories?: string[];
    },
  ) {
    const existing = await this.prisma.notificationRecipient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Recipient not found');
    }

    const recipient = await this.prisma.notificationRecipient.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.department !== undefined && { department: data.department }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.categories !== undefined && { categories: data.categories }),
      },
    });

    this.logger.log(`Updated notification recipient: ${existing.email}`);
    return recipient;
  }

  async findByCategory(category: string) {
    return this.prisma.notificationRecipient.findMany({
      where: {
        status: 'Active',
        categories: {
          has: category,
        },
      },
    });
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
