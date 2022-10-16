const httpServerUrl = 'http://localhost:3000';
const socket = require('socket.io-client')(httpServerUrl);
const readline = require('readline');
const messageReceivedColor = "\x1b[32m";
const sendMessageColor =  "\x1b[33m";
const resetColor = "\x1b[0m";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function promptName(callback) {
    rl.question('What is your name? ', (name) => {
        callback(name);
    });
}
function promptMessage() {
    rl.question('', (message) => {
        socket.emit('send-message', message);
        promptMessage();
    });
}
function print(msg) {
    console.log(messageReceivedColor, msg, sendMessageColor);
}
socket.on('connect', () => {
    console.log('connected to ' + httpServerUrl);
});
// 1
socket.on('get-name', () => {
    promptName((name) => {
        console.log(resetColor, 'identified as ');
        console.log(resetColor, name, sendMessageColor);
        socket.emit('send-name', name);
        promptMessage();
    });
});
// 2
socket.on('message', (messageEvent) => {
    const { username, message } = messageEvent;
    print(username + ': ' + message);
});
