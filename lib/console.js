/* console stuff */

var sys = require('sys');

exports.cols = {
  black : '0;30',
  dgray : '1;30',
  blue  : '0;34',
  lblue : '1;34',
  green : '0;32',
  lgreen: '1;32',
  cyan  : '0;36',
  lcyan : '1;36',
  red   : '0;31',
  lred  : '1;31',
  purple: '0;35',
  lpurple:'1;35',
  brown  :'0;33',
  yellow :'1;33',
  lgray : '0;37',
  white : '1;37'
};

exports.colorOn = function(col) {
  sys.print("\033[" + col + "m");
}

exports.colorOff = function() {
  sys.print("\033[m");
}

exports.color = function(c, s) {
  this.colorOn(c);
  this.print(s);
  this.colorOff();
}

exports.colorln = function(c, s) {
  this.colorOn(c);
  this.puts(s);
  this.colorOff();
}

exports.print = function(s) {
  sys.print(s);
}

exports.puts  = function(s) {
  sys.puts(s);
}

exports.warn = function(s) {
  this.color(this.cols.yellow, "WARNING: ");
  this.puts(s);
}

exports.error = function(s) {
  this.color(this.cols.red, "ERROR: ");
  this.puts(s);
}

exports.success = function(s) {
  this.color(this.cols.green, "SUCCESS: ");
  this.puts(s);
}
