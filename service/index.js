import http from 'http';
import socket_io from 'socket.io';

import config from './config.js';

const port = config.port;
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', config.allowOrigin);
  res.end();
});
let io = socket_io(server);

server.listen(port, config.host, () => {
  console.log('listening on ' + server.address().address + ':'+ port);
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('chat message: ' + msg);
    socket.broadcast.emit('broadcast', msg);
  });
});
