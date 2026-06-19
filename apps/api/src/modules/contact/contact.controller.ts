import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

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
}
