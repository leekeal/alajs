var EventEmitter = require('events').EventEmitter;
var ala;
var app;
module.exports= function(core){
	ala = core;
	var alaEvent = new EventEmitter();
	ala.listentEvent = alaEvent.addListener;
	ala.emitEvent = alaEvent.emit;
}