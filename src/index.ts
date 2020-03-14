import Server from 'chat';

const port = process.env.config['port'] || 3000;
const server = new Server();

server.listen(port);
