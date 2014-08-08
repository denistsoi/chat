/**
 * [User description]
 * @param {[type]} name
 */

function User(name){
  this.name = name;
  this.clientId = Date.now().toString(36);
  this.join = undefined;
}

/**
 * [Room description]
 * @param {[type]} name
 */
function Room(name){
  this.name  = name;
  this.users = {};
  this.status = '';
  if (this.status = 'private'){
    this.password = requires password;
  }
}

/*
  
 */
User.join(room) {
  if room must equal instance of Room;
  else return error message , room does not exist 
    create new room for user to join //
}

user emits('join')
user emits('leave')
user send(type: 'message', data: message.data);
     emits('send')

user on('data', function(message));

/**
 * [join description]
 * @param  {[type]} name
 * @return {[type]}
 */
User.prototype.join = function(name){
  
}
/**
 * [leave description]
 * @param  {[type]} name
 * @return {[type]}
 */
user.prototype.leave = function(name){

}

$.extend(user.prototype, openRoom);

User.prototype.openRoom = function(name){
  name = new Room(name);
  this.join(name);
}

User.openRoom(name);

