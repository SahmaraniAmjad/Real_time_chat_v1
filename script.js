const socket = io('http://localhost:3000', { transports: ['websocket'] });
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name');
appendMessage(`${name} joined`);
socket.emit('new-user', name);

// handle chat message
socket.on('chat-message', data => {
  // call the append message here
  appendMessage(`${data.name}: ${data.message}`)
});

// handle user connected 
socket.on('user-connected', name => {
  // call the append message here
  appendMessage(`${name} connected`)
});

// handle disconnection
socket.on('user-discnnected', name => {
  // call the append message here
  appendMessage(`${name} disconnected`)
});

// add an event listener to our messageForm
messageForm.addEventListener('submit', e => {
  // stop our page to post to our server
  // stop it from refreshing
  // we will use all our chat messages if we don't do that
  e.preventDefault();
  // take the value of our message
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  // send the message
  socket.emit('send-chat-message', message);
  // clear the input after sending the message
  messageInput.value = '';
});


function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message
  messageContainer.append(messageElement);
};