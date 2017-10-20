import http from 'http';
import socket_io from 'socket.io';

const server = http.createServer();
const port = 4000;
let io = socket_io(server);

server.on('request', (req, res) => {
  res.end('<html><body><h1>Hello, World!</h1></body></html>');
});

server.listen(port, () => {
  console.log('listening on ' + port)
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('broadcast');
  });

  socket.on('message', msg => {
    socket.broadcast.emit('message', msg);
  });
});
