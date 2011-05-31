/* a simple test plugin */

var bot;

exports.init = function(cmdhnd) {
  bot = cmdhnd.bot;
  cmdhnd.on('echo', cmdEcho);
}

function cmdEcho(serv, msg) {
  bot.privmsg(serv, msg['channel'], msg['commandargs']);
}
