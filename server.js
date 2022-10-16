const server = require('http').createServer();
const io = require('socket.io')(server);
// 1
io.on('connection', (socket) => {
    console.log('someone connected to chat, requesting username');
    // 2
    socket.on('send-message', (messageEvent) => {
        console.log('received message from ' + socket.username + ': ' + messageEvent);
        // 3
        socket.broadcast.emit('message', { username: socket.username, message: messageEvent });
    });
    // 4
    socket.on('send-name', (name) => {
        console.log('identified user ' + name);
        socket.username = name;
    });
    // 5
    socket.emit('get-name');
});
console.log("listening on port 3000");
server.listen(3000);
