import { OnModuleInit } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { PrismaService } from "src/prisma/prisma.service";

@WebSocketGateway({ cors: '*:*' })
export class MyGateWay implements OnModuleInit, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  // Implement the onModuleInit() method from OnModuleInit interface
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  // Implement the onNewMessage() method with @SubscribeMessage decorator
  @SubscribeMessage("newMessage")
  async onNewMessage(@MessageBody() data: any) {
    try {
      console.log(data);
      
      const auction = await this.prisma.auction.findUnique({
        where: { id: data},
      });

      const item = await this.prisma.item.findUnique({
        where: { id: auction.itemId },
      });

      const user = await this.prisma.user.findUnique({
        where: {id: auction.userId}
      })
      this.server.emit('onMessage', {
        user: user.username,
        price: item.price,
      });
    } catch (error) {
      console.error('Error handling new message:', error);
      throw new Error('Failed to handle new message');
    }
  }

  // Implement the onGatewayInit() method from OnGatewayInit interface
  afterInit(server: Server) {
    // Code to run after the gateway is initialized
  }

  // Implement the onGatewayConnection() method from OnGatewayConnection interface
  handleConnection(client: Socket) {
    // Code to handle a new client connection
  }

  // Implement the onGatewayDisconnect() method from OnGatewayDisconnect interface
  handleDisconnect(client: Socket) {
    // Code to handle a client disconnection
  }
}
// @SubscribeMessage("newMessage")
// onNewMessage(@MessageBody() data: any) {
//   console.log(data);
//   this.server.emit('onMessage', {
//     msg: 'new Message',
//     content: data,
//   });
// }