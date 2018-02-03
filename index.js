
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

var nicknames = [];

socket.on('connection', function (client){
  client.on('new user',function(message,callback){
    if(nicknames.indexOf(message) != -1)
    callback(false);
    else {
      {
        callback(true);
        socket.nickname = message;
        nicknames.push(socket.nickname);
        socket.emit('usernames',nicknames);
        updateNicknames();
      }
    }
  });
  function updateNicknames(){
       socket.emit('usernames', nicknames);
   }

   socket.on('send message', function(message){
       io.sockets.emit('new message', {msg: message, nick: socket.nickname});
   });

   socket.on('disconnect', function(message){
       if(!socket.nickname) return;
       nicknames.splice(nicknames.indexOf(socket.nickname), 1);
       updateNicknames();
   });

});
