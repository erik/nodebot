/* sandboxed javascript evaluation */

var vm = require('vm');
var util = require('util');

var bot;

exports.init = function(plughnd, conf) {
  bot = plughnd.bot;

  plughnd.on('js', onJS);
}

exports.deinit = function() {
}

/* TODO: allow a timeout, so that bot can't be brought down by 'while(true) {}'*/

function onJS(serv, msg) {
  var sandbox = { 'puts' : function(str) {
      bot.privmsg(serv, msg['channel'], '=> ' + str);
    }
  };
  var result;
  
  try {
    var script = vm.createScript(msg['pargs']);
    result = util.inspect(script.runInNewContext(sandbox));
  } catch(e) {
    bot.privmsg(serv, msg['channel'], "=> " + e);
    return;
  }
  
  bot.privmsg(serv, msg['channel'], "=> " + result);  
}
