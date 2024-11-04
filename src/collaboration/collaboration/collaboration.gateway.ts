import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CollaborationService } from './collaboration.service';

@WebSocketGateway({
  namespace: '/collaboration',
  cors: {
    origin: '*',
  },
})
export class CollaborationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly collaborationService: CollaborationService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    this.server.to(room).emit('userJoined', { userId: client.id });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room);
    this.server.to(room).emit('userLeft', { userId: client.id });
  }

  @SubscribeMessage('updateDocument')
  handleUpdateDocument(
    @MessageBody() data: { room: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.room).emit('documentUpdated', {
      userId: client.id,
      content: data.content,
    });
  }
}
