var date = new Date();

var Log = {};

var Log = function(){
  this.createdat = new Date();
  this.date = date.toString();
  this.logger = fs.createWriteStream(date, {flags: 'a'});
}



var log = new Log();

log.it = function(what){
  
}

log.dest(date)

logger.write()

