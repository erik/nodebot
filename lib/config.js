var fs = require('fs');

var bot = require('bot');

exports.load = function() {
  var contents = fs.readFileSync("config.json");
  var json = JSON.parse(contents);  

  this.config   = json;
  
  contents = fs.readFileSync("plugins.json");
  json = JSON.parse(contents);
  
  this.pluginConfig = json;
  
  return this.config;
};

