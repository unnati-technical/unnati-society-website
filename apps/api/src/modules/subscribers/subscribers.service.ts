import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscribersService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    if (!email || !email.includes('@')) {
      throw new BadRequestException('Invalid email address');
    }

    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.isActive) {
        await this.prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true },
        });
      }
      return { success: true, message: 'Successfully subscribed' };
    }

    await this.prisma.newsletterSubscriber.create({
      data: { email },
    });

    return { success: true, message: 'Successfully subscribed' };
  }

  async getAllSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteSubscriber(id: string) {
    await this.prisma.newsletterSubscriber.delete({
      where: { id },
    });
    return { success: true, message: 'Successfully deleted subscriber' };
  }
}
