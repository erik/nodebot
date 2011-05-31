var fs = require('fs');

var bot = require('./bot');

exports.load = function() {
  var contents = fs.readFileSync("config.json");
  var json = JSON.parse(contents);  

  this.networks = json['networks'];
  return this.networks;
}; 
  
exports.connectTo = function(net) {
  if(typeof this.networks[net] == "undefined") {
    throw "Unknown network: " + net;
  }
  
  return new bot.Bot(this.networks);
};

