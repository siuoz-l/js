// Set up event listener for user input
const userInput = document.querySelector('#user-input');
userInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const userInputText = event.target.value;
    event.target.value = '';
    sendMessage(userInputText);
  }
});

// Define the sendMessage() function
function sendMessage(message) {
  const chatWindow = document.querySelector('#chat-window');
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.innerText = message;
  chatWindow.appendChild(messageElement);
}
// Define the receiveMessage() function
function receiveMessage(message) {
    const chatWindow = document.querySelector('#chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('bot-message');
    messageElement.innerText = message;
    chatWindow.appendChild(messageElement);
  }
  
  // Send user message to server-side script for processing
  fetch('/process-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: userInputText
    })
  })
  .then(response => response.json())
  .then(data => {
    receiveMessage(data.message);
  })
  .catch(error => console.error(error));
  const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/process-message', async (req, res) => {
  const userInput = req.body.message;
  
  // Process the user's message and generate a response
  const botResponse = await getBotResponse(userInput);

  res.send({ message: botResponse });
});

async function getBotResponse(userInput) {
  // Implement your logic for generating a bot response here
}
