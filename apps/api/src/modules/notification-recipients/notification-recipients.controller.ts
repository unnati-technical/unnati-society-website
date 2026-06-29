import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';
import { NotificationRecipientsService } from './notification-recipients.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('notification-recipients')
@Public()
export class NotificationRecipientsController {
  constructor(
    private readonly recipientsService: NotificationRecipientsService,
  ) {}

  @Get()
  @CacheTTL(1) // effectively disables cache or sets it to 1ms
  async findAll() {
    return this.recipientsService.findAll();
  }

  @Post()
  async create(@Body() body: { email: string; name: string; department?: string; phone?: string; status?: string; categories?: string[] }) {
    return this.recipientsService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { name?: string; department?: string; phone?: string; status?: string; categories?: string[] }) {
    return this.recipientsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipientsService.remove(id);
  }
}
