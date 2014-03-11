var path = require('path')

var merge = require('merge-descriptors');
var definer = require('./definer');
var Server = require('./server');


merge(exports,new definer())  /*合并definer*/





exports.server = function(options){
	var server = new Server();
	server.optionsHandler(options);
	return server
}






















exports.version = 0.1
/*

alajs.prototype.__proto__.__proto__.__proto__    
                  koa        koa.prototype          Emitter.prototype
app.__proto__.__proto__.__proto__.__proto__             
			    koa       koa.prototype     Emitter.prototype
			    */




