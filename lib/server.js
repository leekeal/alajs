var koa = require('koa');
var router = require('koa-router')




module.exports = Server;
Server.prototype.__proto__ =  new koa()/*继承koa*/
function Server (){




}





Server.prototype.optionsHandler = function(options){
	this.port = options.port;
}


Server.prototype.loader = function(definer){
	var definerOrigin = require('./definer');
	if(!(definer instanceof definerOrigin)){
		console.error('请传入define对象');
		throw new Error();
	}
	definer.load('sync');/*加载模块资源，自动定义控制器，action，*/
	this.setMiddleware()
	
}



Server.prototype.setMiddleware = function(){

	this.use(router(this))
	this.use(function *(next){
		
		console.log('m before');
		yield next
		console.log('m after');
	})

	this.use(function *(next){

		console.log('c before');
		yield next
		console.log('c after');
	})

	this.use(function *(next){

		console.log('a before');
		console.log('action');
		yield next
		console.log('a after');
	})

}



Server.prototype.bootstrap = function(){
	this.listen(this.port);
}



