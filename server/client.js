/**
 * [name description]
 * @type {[type]}
 */
var name = process.argv.pop();


var net = require('net');
var JSONStream = require('json-stream');



var client = net.connect({ port: 5555 }, function() {
  send({ type: 'greeting', data: name });
});

function send(message) {
  client.write(JSON.stringify(message) + '\n');
}

var stream = new JSONStream();

stream.on('data', function(message) {
  console.log(message);
  switch(message.type) {
    case 'greeting':
      send({ type: 'room', data: 'seedalpha' });
      break;
    case 'room':
      break;
    case 'message':
      // send({type: 'message', data: message.data});
      break;
  }
});


/**
 * Handle Stdin 
 */

process.stdin.setEncoding('utf8');

process.stdin.on('end', function(){
  // process.stdout.write();
});

process.stdin.on('readable', function(){
  var chunk = process.stdin.read();
  if(chunk !== null){
    send({type: 'message', data: chunk});
    // need to emit 'message'
  }
});

/** Pipe Client to stream */
client.pipe(stream);