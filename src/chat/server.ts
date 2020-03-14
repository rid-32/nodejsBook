import * as net from 'net';

import Channel, { ChannelType } from './channel';

class Server {
  private port: number;
  private channel: ChannelType;

  constructor() {
    this.channel = new Channel().channel;
  }

  public listen(port: number): void {
    this.port = port || 3000;

    const server = net.createServer(socket => {
      const id = `${socket.remoteAddress}:${socket.remotePort}`;

      this.channel.emit('join', id, socket);

      socket.on('data', data => {
        const message = data.toString();

        if (message.trim() === 'shutdown') {
          this.channel.emit('shutdown');
        }

        this.channel.emit('broadcast', id, message);
      });

      socket.on('close', () => {
        this.channel.emit('leave', id);
      });
    });

    server.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }
}

export default Server;
