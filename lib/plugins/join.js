/* join / part */

var bot;

exports.init = function(plughnd) {
  bot = plughnd.bot;
  plughnd.on('part', ppart);
  plughnd.on('join', pjoin);
}

function pjoin(serv, msg) {
  var chan = msg['pargs'].split(' ')[0];
  
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

function ppart(serv, msg) {
  var chan = msg['pargs'].split(' ')[0];
  
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
