import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getAdminNotifications() {
    // Fetch IN_APP notifications where userId is null (system-wide admin notifications)
    return this.prisma.notification.findMany({
      where: {
        userId: null,
        type: 'IN_APP',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Get the latest 50
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { status: 'READ' },
    });
  }

  async markAllAsRead() {
    return this.prisma.notification.updateMany({
      where: {
        userId: null,
        type: 'IN_APP',
        status: 'UNREAD',
      },
      data: {
        status: 'READ',
      },
    });
  }

  // Generic method to create an admin notification
  async createAdminNotification(title: string, message: string) {
    return this.prisma.notification.create({
      data: {
        title,
        message,
        type: 'IN_APP',
        status: 'UNREAD',
        userId: null,
      },
    });
  }
}
