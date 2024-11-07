import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  async getNotificationsForUser(@Param('userId') userId: string) {
    const notifications =
      await this.notificationService.getNotificationsForUser(userId);

    if (!notifications || notifications.length === 0) {
      throw new HttpException(
        'No notifications found for this user.',
        HttpStatus.NOT_FOUND,
      );
    }

    return notifications;
  }
}
