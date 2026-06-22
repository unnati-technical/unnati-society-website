import { Controller, Get, Patch, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Public()
  @Get()
  async getNotifications() {
    return this.notificationsService.getAdminNotifications();
  }

  @Public()
  @Patch('read-all')
  async markAllAsRead() {
    return this.notificationsService.markAllAsRead();
  }

  @Public()
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
