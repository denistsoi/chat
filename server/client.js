var name = process.argv.pop();

process.stdin.setEncoding('utf8');

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

process.stdin.on('end', function(){

});

process.stdin.on('readable', function(){
  var chunk = process.stdin.read();
  if(chunk !== null){
    send({type: 'message', data: chunk});
  }
});

client.pipe(stream);