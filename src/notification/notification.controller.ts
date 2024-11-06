import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  getNotifications(@Param('userId') userId: string) {
    return this.notificationService.getNotifications(userId);
  }
}
