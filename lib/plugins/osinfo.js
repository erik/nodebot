/* prints some information about the computer */

var os = require('os');

var bot;

exports.init = function(plughnd, conf) {
  bot = plughnd.bot;
  plughnd.on('osinfo', oninfo);
}

function oninfo(serv, msg) {
  var str = "";
  str += os.type() + ' ' + os.release() + ' (' + os.arch() + ') on ';
  str += os.cpus()[0].model;
  str += ' ['  + (os.freemem() / 1048576).toFixed() + ' MiB / ';
  str += (os.totalmem() / 1048576).toFixed() + ' MiB free]';
  
  bot.privmsg(serv, msg['channel'], msg['sender'] + ': ' + str);  
}
