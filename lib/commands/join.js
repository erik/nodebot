/* join / part */

var bot;

exports.init = function(cmdhnd) {
  bot = cmdhnd.bot;
  cmdhnd.on('part', cmdpart);
  cmdhnd.on('join', cmdjoin);
}

function cmdjoin(serv, msg) {
  var chan = msg['commandargs'].split(' ')[0];
  
  if(!chan) {
    bot.privmsg(serv, msg['channel'], "Give me a channel to join!");
    return;
  }

  if(chan[0] != '#') {
    bot.privmsg(serv, msg['channel'], 'Channel name is invalid: "' + chan + '"');
    return;
  }
  
  bot.join(serv, chan);  
}

function cmdpart(serv, msg) {
  var chan = msg['commandargs'].split(' ')[0];
  
  if(!chan) {
    bot.privmsg(serv, msg['channel'], "Give me a channel to part!");
    return;
  }
  
  if(chan[0] != '#') {
    bot.privmsg(serv, msg['channel'], 'Channel name is invalid: "' + chan + '"');
    return;
  }
  
  bot.part(serv, chan);  
}
