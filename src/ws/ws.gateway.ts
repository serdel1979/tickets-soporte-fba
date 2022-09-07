import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

 // @SubscribeMessage('signal')
 // async signal(@MessageBody() data: string): Promise<string> {
 //   this.server.emit('signal',data);
 //   console.log(data);
 //   return data;
 // }

  @SubscribeMessage('signal')
  onChgEvent(
      @MessageBody() data: string,
      @ConnectedSocket() socket: Socket,
  ): void {
     socket.broadcast.emit('signal', data);
  }

}
