import Server from 'chat';

const server = new Server();

server.listen(process.env.config['port']);
