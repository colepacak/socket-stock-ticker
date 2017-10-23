import http from 'http';

import config from './config.js';
import io from './io.js';

const port = config.port;
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', config.allowOrigin);
  res.end();
});

server.listen(port, config.host, () => {
  console.log('Listening on ' + server.address().address + ':'+ port);
});

io.attach(server);