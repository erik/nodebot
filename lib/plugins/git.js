/* a github post-recieve server */

var http = require('http');

var c = require('../console');

var server;
var bot;

exports.init = function(plughnd) {
  bot = plughnd.bot;
  server = http.createServer(handleClient);
  server.listen(8080);
}

function handleClient(req, res) {
  var meth = req.method;
    
  if(meth != "POST") {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Bad request: ' + meth);
    return;
  }
  
  var url = req.url.split('/');
  
  if(url.length < 2) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Bad server or channel: server=>"' + server +
      '", channel=>"' + channel + '"');
    return;
  }
  
  var server = url[1];
  var channel = url[2];
  
  if(server == '' || channel == '') {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Bad server or channel: server=>"' + server + 
      '", channel=>"' + channel + '"');
    return;    
  }

  channel = '#' + channel;

  var content = '';

  // handle POST data  
  req.addListener("data", function(chunk) {
    content += chunk;
  });
 
	req.addListener("end", function() {
	  content = content.replace(/^payload=/, '');
	  content = unescape(content);

	  try {
      var json = JSON.parse(content);
  
      var repo = json["repository"];
      var commits = json["commits"];

      var rep = repo['name'] + '/' + repo['owner']['name'];

      var max = commits.length > 3 ? 3 : commits.length - 1;

      // reverse order so most recent gets printed first
      for(var i = max; i >= 0; --i) {
        var commit = commits[i];
        var msg = '\x02' + rep + '\x02: ';
        msg += commit['id'].slice(0, 10) + ' [';
        msg += commit['modified'];
        msg += '] ' + commit['message'];
        
        bot.privmsg(server, channel, msg);
        
      }      
            
    } catch(e) {
      c.error("Bad JSON: " + e);
    }
  });    
}
