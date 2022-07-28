import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('signal')
  async signal(@MessageBody() data: string): Promise<string> {
    this.server.emit('signal',data);
    return data;
  }


}
