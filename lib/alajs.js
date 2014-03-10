var path = require('path')
var koa = require('koa');
var merge = require('merge-descriptors');
var definer = require('./definer');


merge(exports,new definer())  /*合并definer*/

function Server(){}
Server.prototype.__proto__ =  new koa()/*继承koa*/


Server.prototype.bootstrap = function(){
	this.listen(this.port);
}

exports.server = function(port){
	var server = new Server();
	server.modules = this.modules;
	server.port = port;
	return server
}



exports.rootPath  = path.dirname(require.main.filename);





















exports.version = 0.1
/*

alajs.prototype.__proto__.__proto__.__proto__    
                  koa        koa.prototype          Emitter.prototype
app.__proto__.__proto__.__proto__.__proto__             
			    koa       koa.prototype     Emitter.prototype
			    */




