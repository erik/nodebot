var events = require('events');

var c = require('./console');

var commandHandle = function() {
  events.EventEmitter.call(this);
}

commandHandle.prototype = new events.EventEmitter;

exports.init = function(cmds, bot) {
  this.cmd = new commandHandle();
  this.cmd.bot = bot;
  for(var i = 0; i < cmds.length; ++i) {
    try {
      var t = require('commands/' + cmds[i]);
      t.init(this.cmd);
    } catch(e) {
      c.error(e);
    }
  }
}

exports.emit = function(type, serv, msg) {
  this.cmd.emit(type, serv, msg);
}
