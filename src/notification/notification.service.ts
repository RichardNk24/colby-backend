import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private notifications = [];

  createNotification(userId: string, message: string) {
    const notification = {
      id: Date.now(),
      userId,
      message,
      timestamp: new Date(),
    };
    this.notifications.push(notification);
    return notification;
  }

  getNotifications(userId: string) {
    return this.notifications.filter(
      (notification) => notification.userId === userId,
    );
  }
}
