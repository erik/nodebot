var fs = require('fs');

var bot = require('bot');

exports.load = function() {
  var contents = fs.readFileSync("config.json");
  var json = JSON.parse(contents);  

  this.config   = json;
  
  return this.config;
};

