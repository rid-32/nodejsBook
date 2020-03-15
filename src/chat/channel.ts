import * as net from 'net';
import { EventEmitter } from 'events';

type ClientsType = {
  [id: string]: net.Socket;
};

type Broadcast = (id: string, message: Buffer) => void;

type SubscriptionsType = {
  [id: string]: Broadcast;
};

export type ChannelType = EventEmitter;

const maxUsers: number = process.env.config['maxUsers'];

class Channel {
  public channel: ChannelType;
  private clients: ClientsType;
  private subscriptions: SubscriptionsType;

  constructor() {
    this.channel = new EventEmitter();
    this.clients = {};
    this.subscriptions = {};

    this.channel.setMaxListeners(maxUsers);

    this.channel.on('join', (id: string, socket: net.Socket): void => {
      const usersAmount = this.channel.listeners('broadcast').length;
      const welcomeMessage = usersAmount
        ? `Пользователей онлайн: ${usersAmount}\n`
        : 'Вы единственный пользователь в чате\n';

      socket.write(welcomeMessage);

      this.clients[id] = socket;
      this.subscriptions[id] = this.broadcast(id);
      this.channel.on('broadcast', this.subscriptions[id]);
    });

    this.channel.on('leave', (id: string) => {
      this.channel.removeListener('broadcast', this.subscriptions[id]);

      delete this.subscriptions[id];

      const message = `${id} покинул чат.\n`;

      this.channel.emit('broadcast', id, message);
    });

    this.channel.on('shutdown', () => {
      const message = 'The server has shout down.\n';

      this.channel.emit('broadcast', '', message);
      this.channel.removeAllListeners('broadcast');
    });
  }

  private broadcast = (id: string): Broadcast => (clientId, message): void => {
    if (clientId === id) return;

    this.clients[id].write(message);
  };
}

export default Channel;
