
var express = require('express');
var app = express();
var io = require('socket.io');

app.get('/',function(req,res){
  res.sendFile('/home/navdeep/Desktop/chat/ChatBox/index.html');
})

var server = app.listen(3000,function(req,res){
  console.log("Server running on port 3000");
});

var socket = io.listen(server);

socket.on('connection', function (client){
  console.log("User connected");
  client.on('chat message', function(msg){
  console.log('message: ' + msg);
  socket.emit('chat message',msg);
});
  client.on('disconnect',function(){
    console.log("User has disconnected");
    socket.emit('disconnection');
  })

});
