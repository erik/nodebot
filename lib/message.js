/* 
 * abstraction of a line recieved from an irc connetions
 */

var c = require('./console');
var config = require('./config');

var msgexpr = /:([\.0-9a-zA-Z_-]+)\S*\s([0-9a-zA-Z]+)\s(.*)/;

exports.parse = function(serv, line) {
  var msg = {};
  var mat = line.match(msgexpr);
  
  if(mat == null) {
    var pre = /PING (.*)/;
    var pmat = line.match(pre);
    if(pmat) {
      return {
        'sender' : null,
        'cmd'    : "PING",
        'args'   : pmat[1]
      };
    }
    return null;
  }
  
  msg = {
    'sender' : mat[1],
    'cmd'    : mat[2],
    'args'   : mat[3],
    'isAdmin' : false
  };
  
  var admins = config.config["networks"][serv]["admins"];
  
  for(var i = 0; i < admins.length; ++i) {
    // check if sender is an admin
    if(admins[i] == mat[1]) {
      msg['isAdmin'] = true;
    }
  }
    
  return msg;  
};
