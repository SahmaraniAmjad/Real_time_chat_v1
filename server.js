// import socekt.io and add the port
const io = require('socket.io')(3000)

const users = {}
// each time the user will load our website it will
// call this function and gives each user a specific
// socket

io.on('connection', socket => {
  // catch the new user
  socket.on('new-user', name => {
    users[socket.id] = name;
    // send the name of the new user to the 
    socket.broadcast.emit('user-connected', name)
  });
  // receive the message from the client
  socket.on('send-chat-message', message => {
    // send to all other clients and not to the person who sent 
    // the message
    // we are sending right now the message and the user's name
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });

  // disconnection
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-discnnected', users[socket.id]);
    delete users[socket.id];
  });
});