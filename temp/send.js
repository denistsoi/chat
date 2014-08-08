/**
 *
 * Client Version
 * 
 */

client.on('')

/**
 * [type description]
 * @type {String}
 */

var client = net.connect({ port: 5555 }, function() {
  send({ type: 'greeting', data: name });
});

var client = net.connect({port: 5555}, function(){
  $.send(client, {type: 'greeting', data: name});
});

case 'greeting':
  send({ type: 'room', data: 'seedalpha' });
  break;

case 'greeting':
  $.send(client, { type: 'room', data: 'seedalpha' });
  break;



/**
 *
 * Server Version
 * 
 */


/**
 * [type description]
 * @type {String}
 */

.forEach(function(c) {
  c.send({ 
    type: 'disconnected', 
    data: [client.name]
  });
});

.forEach(function(c) {
  $.send(c, {
    type: 'disconnected',
    data: [client.name] 
  });
});


function(socket) {
  client.on('greeting', function(){
    $.send(client, {
      type: 'greeting',
      rooms: $.map(rooms, function(room){
        return room.name;
      }),
      id: client.id
    });
  })
}