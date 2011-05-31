var net = require('net'),
    events = require('events');

var c = require('./console');
var msg = require('./message');

exports.Bot = function(networks) {
  events.EventEmitter.call(this);
  
  this.networks = {};
  for(n in networks) {
    this.addNetwork(n, networks[n]);
  }
};

exports.Bot.prototype = new events.EventEmitter();

exports.Bot.prototype.addNetwork = function(n, conf) {
  var connection = net.createConnection(conf["port"], conf["server"]);
  
  /* command callbacks */
  this.on("NOTICE", function(serv, msg) {
    var args = msg['args'].split(' ');
    
    if((args[0] == 'Auth' || args[0] == '*') && !this.networks[serv].authed) {
      this.networks[serv].authed = true;
      this.sendRaw(serv, "NICK nodebot");
      this.sendRaw(serv, "USER nodebot * * :nodebot");
    }
  });
  
  this.on("001", function(serv, msg) {
    c.success('[' + serv + '] ' + "authenticated");
    var chans = this.networks[n].channels;
    
    for(var i = 0; i < chans.length; ++i) {
      this.join(serv, chans[i]);
    } 
  });
  
  this.on("PING", function(serv, msg) {
    this.sendRaw(serv, "PONG " + msg['args']);
  });
  
  this.on("PRIVMSG", function(serv, m) {
    console.log("[" + serv + "] " + "<< " + m['args']);
  
    var re = /([\#a-zA-Z0-9]+)\s+:(.*)/;
    var mat = m['args'].match(re);
    
    var chan = mat[1];
    var msg  = mat[2];
    
    // CTCP
    if(msg[0] == '\001') {
      var ctcp = msg.slice(1).split(' ', 1)[0];
      switch(ctcp) {
        case 'PING':
          this.privmsg(serv, m['sender'], msg);
          break;
      }    
      return;
    } else {
      console.log(m['sender']);
    }
  });
  
  
  /* socket callbacks */
  connection.on('connect', function() {
    c.success('[' + n + ']' + " connected");
  });
  
  connection.on('error', function(e) {
    c.error("[" + n + "] " + e);
  });
  
  connection.on('close', function() {
    c.success('[' + n + ']' + " closed");
  });
  
  // javascript!
  var that = this;
  
  connection.on('data', function(dat) {
    var str = dat.toString('utf8');
    var lines = str.split('\r\n');
    for(var i = 0; i < lines.length - 1; ++i) {
      that.onData(n, lines[i]);
    }
  });
  
  this.networks[n] = {
    "server" : conf["server"],
    "port"   : (conf["port"] || 6667),
    "nick"   : (conf["nick"] || "nodebot"),
    "channels" : (conf["channels"] || []),
    "authed" : false,
    "connection": connection
  };
}

exports.Bot.prototype.sendRaw = function(serv, str) {
  c.puts("[" + serv + "] >> " + str);
  this.networks[serv].connection.write(str + "\r\n");
}

exports.Bot.prototype.join = function(serv, chan) {
  this.sendRaw(serv, "JOIN " + chan);
}

exports.Bot.prototype.privmsg = function(serv, chan, msg) {
  this.sendRaw(serv, "PRIVMSG " + chan + " :" + msg);
}

exports.Bot.prototype.onData = function(serv, dat) {
  var m = msg.parse(dat);
  
  // ignore bad lines and just return 
  if(m == null) {
    return;
  }
  
  this.emit(m['cmd'], serv, m);
}
