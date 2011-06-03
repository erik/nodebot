var events = require('events');

var c = require('./console');
var config = require('./config');

var pluginHandle = function() {
  events.EventEmitter.call(this);
}

pluginHandle.prototype = new events.EventEmitter;

exports.init = function(plugs, bot) {
  this.plugin = new pluginHandle();
  this.plugin.bot = bot;
  
  var conf = config.pluginConfig;
  
  for(var i = 0; i < plugs.length; ++i) {
    try {
      var t = require('plugins/' + plugs[i]);
      t.init(this.plugin, (conf[plugs[i]] || {}));
    } catch(e) {
      c.error(e);
    }
  }
}

exports.emit = function(type, serv, msg) {
  this.plugin.emit(type, serv, msg);
}
