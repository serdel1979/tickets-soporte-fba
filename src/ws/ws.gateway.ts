import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsService } from './ws.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly wsService: WsService){}


  @SubscribeMessage('signal')
  async signal(@MessageBody() data: string): Promise<string> {
    console.log('emitiendo ->',data);
    this.server.emit('signal',data);
    return data;
  }


}
