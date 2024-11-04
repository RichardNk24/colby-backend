import { Module } from '@nestjs/common';
import { CollaborationGateway } from './collaboration/collaboration.gateway';
import { CollaborationService } from './collaboration/collaboration.service';

@Module({
  providers: [CollaborationGateway, CollaborationService],
})
export class CollaborationModule {}
