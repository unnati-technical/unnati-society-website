import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NotificationRecipientsService } from './notification-recipients.service';

@Controller('notification-recipients')
export class NotificationRecipientsController {
  constructor(private readonly recipientsService: NotificationRecipientsService) {}

  @Get()
  async findAll() {
    return this.recipientsService.findAll();
  }

  @Post()
  async create(@Body() body: { email: string; name?: string }) {
    return this.recipientsService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipientsService.remove(id);
  }
}
