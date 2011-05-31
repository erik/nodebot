/* 
 * abstraction of a line recieved from an irc connetions
 */

var c = require('./console');

var msgexpr = /:([\.\!@0-9a-zA-Z-]+)\s([0-9a-zA-Z]+)\s(.*)/;

exports.parse = function(line) {
  var msg = {};
  var mat = line.match(msgexpr);
  
  if(mat == null) {
    //c.warn('Bad message: "' + line + '"');
    return null;
  }
  
  msg = {
    'server' : mat[1],
    'cmd'    : mat[2],
    'args'   : mat[3],
  };
  
  return msg;  
};
