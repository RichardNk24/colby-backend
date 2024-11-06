import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CollaborationService {
  constructor(private readonly redisClient: Redis) {}

  async saveDocumentState(room: string, content: string): Promise<void> {
    await this.redisClient.set(`collab:${room}`, content);
  }

  async getDocumentState(room: string): Promise<string | null> {
    return await this.redisClient.get(`collab:${room}`);
  }
}
