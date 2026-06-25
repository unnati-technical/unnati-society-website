import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../queues/email/email.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private notificationsService: NotificationsService,
  ) {}

  async createMessage(data: {
    name: string;
    email: string;
    subject: string;
    role: string;
    message: string;
  }) {
    try {
      const newMessage = await this.prisma.contactMessage.create({
        data,
      });

      this.logger.log(`New contact message received from ${data.email}`);

      // Fire and forget emails (no await so we don't block the response)
      this.emailService.sendContactAutoReply(data.name, data.email);
      this.emailService.sendContactAdminNotification(data);

      // Create in-app notification for admins
      await this.notificationsService.createAdminNotification(
        'New Contact Message',
        `Message received from ${data.name} (${data.role}) regarding "${data.subject}"`,
      );

      return newMessage;
    } catch (error) {
      this.logger.error(`Error saving contact message: ${error.message}`);
      throw error;
    }
  }

  async getAllMessages() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateMessageStatus(id: string, status: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
  }

  async replyToMessage(id: string, replyText: string) {
    // Fetch the original message
    const message = await this.prisma.contactMessage.findUniqueOrThrow({
      where: { id },
    });

    // Send the reply email
    await this.emailService.sendAdminReply({
      to: message.email,
      toName: message.name,
      originalSubject: message.subject,
      replyText,
    });

    // Mark as REPLIED
    const updated = await this.prisma.contactMessage.update({
      where: { id },
      data: { status: 'REPLIED' },
    });

    this.logger.log(`Reply sent to ${message.email} for message ${id}`);
    return updated;
  }
}
