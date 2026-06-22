import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  async submitContactForm(
    @Body()
    body: {
      name: string;
      email: string;
      subject: string;
      role: string;
      message: string;
    },
  ) {
    return this.contactService.createMessage(body);
  }

  @Public()
  @Get()
  async getAllMessages() {
    return this.contactService.getAllMessages();
  }

  @Public()
  @Patch(':id/status')
  async updateMessageStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.contactService.updateMessageStatus(id, status);
  }

  @Public()
  @Post(':id/reply')
  async replyToMessage(
    @Param('id') id: string,
    @Body('replyText') replyText: string,
  ) {
    return this.contactService.replyToMessage(id, replyText);
  }
}


