/**
 * Client
 */

var JSONStream = require('json-stream');
var $ = require('dt-utils');

function Client(socket) {
  var jsonStream = new JSONStream();
  
  this._socket = socket;

  jsonStream.on('data', function(message) {
    switch(message.type) {
      case 'greeting':
        this.id = Date.now().toString(36);
        this.name = message.data;
        this.emit('greeting');
        break;
      case 'room':
        this.emit('room', message.data);
        break;
      case 'message':
        this.emit('message', message.data);
        break;
      case 'command':
        this.emit('command', message.data);
        break;
    }
  }.bind(this));

  socket.pipe(jsonStream);
}

Client.prototype.send = function(message) {
  this._socket.write(JSON.stringify(message) + '\n');
}

$.extend(Client.prototype, $.events);



/**
 * Server
 */

var net = require('net');

var clients = {};
var rooms = {};

var server = net.createServer(function(socket) {
  
  var client = new Client(socket);

  client.on('greeting', function() {
    console.log(client.id, client.name, 'sent', 'greeting');
    clients[client.id] = client;
    client.send({ 
      type: 'greeting',
      rooms: $.map(rooms, function(room) {
        return room.name;
      }),
      id: client.id
    });
  });

  client.on('room', function(name) {
    console.log(client.id, client.name, 'sent', 'room', name);
    client.room = rooms[name] = rooms[name] || { name: name };
    var roommates = $.filter(clients, function(c) {
      return c.room === client.room;
    }).map(function(c) {
      c.send({ type: 'connected', data: [client.name] });
      return c.name;
    });
    client.send({ type: 'connected', data: roommates })
  });

  client.on('message', function(text) {
    if (!client.room) return;
    
    $.filter(clients, function(c) {
      return c.room === client.room;
    }).forEach(function(c) {
      c.send({ 
        type: 'message', 
        data: text, 
        params: { 
          client: client.name 
        } 
      });
    });
  });

  client.on('command', function(text){
    if (!client.room) return;

    console.log(text);
  });

  client.on('end', function() {
    if (!client.room) return;
    
    $.filter(clients, function(c) {
      return c.room === client.room;
    }).forEach(function(c) {
      c.send({ 
        type: 'disconnected', 
        data: [client.name]
      });
    });

    delete clients[client.id];
  });
});

server.on('error', function(err) {
  console.log('ERROR', err);
});

server.listen(5555, function(){
  console.log("Server started");
});