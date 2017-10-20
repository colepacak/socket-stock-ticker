import http from 'http';
import socket_io from 'socket.io';

const port = 4000;
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.end();
});
let io = socket_io(server);

server.listen(port, () => {
  console.log('listening on ' + port)
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
