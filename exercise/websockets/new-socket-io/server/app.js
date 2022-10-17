const app = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('new client connected', socket.id);
  
  // join specific room
  // default room is General
  socket.on('join-room', (data) => {
    const { name, previousRoom, newRoom } = data;
    socket.leave(previousRoom);
    socket.join(newRoom);
    console.log(`${socket.id} joined room ${newRoom}`);
    io.in(newRoom).emit('joined-room', {name, newRoom});
  });

  socket.on('message', (msg) => {
    const { name, message, room } = msg;
    io.to(room).emit('receive-message', {name, message});
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

http.listen(4000, () => {
  console.log(`listening on *:${4000}`);
});
