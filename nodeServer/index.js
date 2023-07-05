// Node Server which will handle socket.io connections

const io = require('socket.io')(8000);

const users = {};

// Establish the connection with the client

io.on('connection', (socket) => {
  // Method which tells the group that the person has joined the chat room
  socket.on('new-user-joined', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  // Method to send the message

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
