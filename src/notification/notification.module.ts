import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';

@Module({
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
})
export class NotificationModule {}
