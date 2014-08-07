/**
 * client comms protocol
 */


/**
 * Module dependencies
 */

var JSONStream = require('json-stream');
var through = require('through');
var $ = require('dt-utils');


/**
 * Clients
 */

var clients = {};
var channels = {};

/**
 * Constructor
 */

function decode(socket, onMessage) {
  socket
    .pipe(new JSONStream())
    .pipe(through(onMessage));
}

/**
 * Expose
 */

exports = module.exports = function(socket) { 
  decode(socket, function(message) {
    switch(message.type) {
      case 'greeting':
        var clientName = message.data.name;
        var clientId = Date.now().toString(36);
        var client = clients[clientId] = {
          id: clientId,
          name: clientName,
          write: function(message) {
            socket.write(JSON.stringify(message) + '\n');
          }
        };
        client.write({ 
          clientId: client.id, 
          channels: $.map(channels, function(c) { 
            return c.name; 
          }) 
        });
        break;
    }
  });
};
