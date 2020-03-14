import * as http from 'http';

const requestListener: http.RequestListener = (_, res) => {
  res.writeHead(200);
  res.end('Hello, world!');
};

const server = http.createServer(requestListener);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
