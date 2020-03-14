import * as net from 'net';
import { EventEmitter } from 'events';

type ClientsType = {
  [id: string]: net.Socket;
};

type ChannelType = EventEmitter & {
  clients?: ClientsType;
};

class Server {
  port: number;
  channel: ChannelType;

  constructor() {
    this.channel = new EventEmitter();
    this.channel.clients = {};

    this.channel.on('join', function(id: string, socket: net.Socket): void {
      this.clients[id] = socket;

      this.on('broadcast', function(clientId: string, message: Buffer): void {
        if (clientId === id) return;

        this.clients[id].write(message);
      });
    });
  }

  listen(port: number): void {
    this.port = port || 3000;

    const server = net.createServer(socket => {
      const id = `${socket.remoteAddress}:${socket.remotePort}`;

      this.channel.emit('join', id, socket);

      socket.on('data', data => {
        this.channel.emit('broadcast', id, data);
      });
    });

    server.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;
