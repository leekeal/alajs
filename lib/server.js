var koa = require('koa');
var router = require('koa-router')
var merge = require('merge-descriptors');
var session = require('koa-session');
var koa_body = require('koa-body');



module.exports = Server;
Server.prototype.__proto__ =  new koa()/*继承koa*/
function Server (options,app){
	this.port = options.port;
	this.app  = app
	this.serverStartupMiddleware()/*添加默认系统级别的中间件*/
	
}




Server.prototype.loader = function(app){
	var Application = require('./application');
	if(!(app instanceof Application)){
		console.error('请传入alajs() 产生的对象');
		throw new Error();
	}
	app.server = this; /*给app指定server对象，必须在加载前，因为加载过程中，会使用server对象来产生路由*/
	/*!!!!!!!!!!!!!!!!!!!!!!*/
	this.setMiddleware()/*加载之前，必须设置路由中间件，不然action无法自动路由*/

	app.load();/*加载模块资源，自动定义控制器，action，*/
	
}



Server.prototype.setMiddleware = function(){

	this.use(router(this))

}

Server.prototype.serverStartupMiddleware = function(){
	this.keys = [this.app.name];/*设置session key 为app名称*/


	this.use(koa_body());/*添加post body处理中间件*/
	this.use(function *(next) {
		this.post = this.request.body; 
		yield next;
	});

	this.use(session());/*使用session*/
	this.extendFromContext();/*扩展context*/
}


/*继承middle中的this对象*/
Server.prototype.extendFromContext = function(){
	var app = this.app;
	var contextEditer = require('./context')
	this.use(function *(next){
		contextEditer(this,app);
		yield next
	})
}


/*启动服务器，启动之前，还能设置中间件，名为路由后中间件*/
Server.prototype.bootstrap = function(){
	this.listen(this.port);
}



