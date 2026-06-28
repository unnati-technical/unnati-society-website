import { Controller, Get, Patch, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getNotifications() {
    return this.notificationsService.getAdminNotifications();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('read-all')
  async markAllAsRead() {
    return this.notificationsService.markAllAsRead();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
