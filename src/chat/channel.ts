import * as net from 'net';
import { EventEmitter } from 'events';

type ClientsType = {
  [id: string]: net.Socket;
};

type Broadcast = (id: string, message: Buffer) => void;

type SubscriptionsType = {
  [id: string]: Broadcast;
};

export type ChannelType = EventEmitter & {
  clients?: ClientsType;
  subscriptions?: SubscriptionsType;
};

class Channel {
  public channel: ChannelType;

  constructor() {
    this.channel = new EventEmitter();
    this.channel.clients = {};
    this.channel.subscriptions = {};

    this.channel.on('join', (id: string, socket: net.Socket): void => {
      this.channel.clients[id] = socket;
      this.channel.subscriptions[id] = this.broadcast(id);
      this.channel.on('broadcast', this.channel.subscriptions[id]);
    });
  }

  private broadcast = (id: string): Broadcast => (clientId, message): void => {
    if (clientId === id) return;

    this.channel.clients[id].write(message);
  };
}

export default Channel;
