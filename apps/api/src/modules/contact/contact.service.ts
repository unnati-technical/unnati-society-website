import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private prisma: PrismaService) {}

  async createMessage(data: { name: string; email: string; subject: string; role: string; message: string }) {
    try {
      const newMessage = await this.prisma.contactMessage.create({
        data,
      });
      
      // We would ideally call the EmailModule here, e.g. this.emailQueue.add(...)
      this.logger.log(`New contact message received from ${data.email}`);
      
      return newMessage;
    } catch (error) {
      this.logger.error(`Error saving contact message: ${error.message}`);
      throw error;
    }
  }
}
