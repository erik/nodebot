/* 
 * abstraction of a line recieved from an irc connetions
 */

var c = require('./console');

var msgexpr = /:([\.0-9a-zA-Z-]+)\S*\s([0-9a-zA-Z]+)\s(.*)/;

exports.parse = function(line) {
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
  };
  
  return msg;  
};
