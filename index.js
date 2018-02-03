
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
  Object.keys(socket.sockets).forEach(function(id) {
console.log("ID:",id)  // socketId
})
  client.on('new user',function(message,callback){
    if(nicknames.indexOf(message) != -1)
    callback(false);
    else {
      {

        callback(true);
        client.nickname = message;
        nicknames.push(client.nickname);
        socket.emit('new connect',{nick:client.nickname});
        socket.emit('usernames',nicknames);
        var nickhaha = [];
        nicknames.forEach(function(item){
          if(item != client.nickname)
          nickhaha.push(item);
        });
        updateNicknames(client.nickname);
      }
    }
  });
  function updateNicknames(me){
       socket.emit('usernames', nicknames, me);
   }

   client.on('send message', function(message){
       socket.emit('new message', {msg: message, nick: client.nickname});
   });

   client.on('disconnect', function(message){
       if(!client.nickname) return;
       socket.emit('disconnect',{nick:client.nickname});
       nicknames.splice(nicknames.indexOf(client.nickname), 1);
       updateNicknames();
   });

});
