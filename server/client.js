/**
 * [name description]
 * @type {string}
 */
var name = process.argv.pop();


var net = require('net');
var JSONStream = require('json-stream');

var client = net.connect({ port: 5555 }, function() {
  send('greeting');
});

/**
 * Helper Send Function
 * @param  {string} type
 * @param  {string} msg (optional)
 * @return {string}
 */

function send(type, msg) {
  switch(type){
    case 'greeting':
      message = {type: 'greeting', data: name};
      break;
    case 'message':
      message = {type: 'message', data: msg};
      break;
    case 'room':
      message = {type: 'room', data: msg};
      break;
    case 'command':
      message = {type: 'command', data: msg};
      break;
    case 'pm':
      message = {type: 'pm', data: msg};
      break;
    // on error handler?
  }
  client.write(JSON.stringify(message) + '\n');
}


// client.on('end', function(){
  // send({type: 'end'});
  // console.log(send({type: 'end'}));
// });


/**
 * [stream description]
 * @type {JSONStream}
 */
var stream = new JSONStream();

stream.on('data', function(message) {
  console.log(message);
  switch(message.type) {
    case 'greeting':
      send('room', 'seedalpha');
      break;
    case 'room':
      break;
    case 'message':
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
  }
});

/** Pipe Client to stream */
client.pipe(stream);