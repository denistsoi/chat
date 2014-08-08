var $ = require('dt-utils');

/**
 * [send description]
 * @param  {[type]} name
 * @param  {[type]} message
 * @param  {[type]} options
 * @return {[type]}
 *
 * Usage Example
 *    $.extend(name.prototype, $.broadcast);
 *
 *    name.send()
 *    
 */

$.broadcast = {
  send: function(name,message,options){
    /** @param {[object]} [options] [default as websocket, tcp, or other]  */
    if (!options){
      return name.write(JSON.Stringify(message) + '\n');
    } else {
      return;
    }
  },
  recieve: function(name){
    $.events.on(name);
  },
  ignore: function(name){
    $.events.off(name);
  }
}

/**
 *

 * 
 */