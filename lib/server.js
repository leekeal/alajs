var koa = require('koa');
var router = require('koa-router')
var merge = require('merge-descriptors');
var koa_body = require('koa-body');
// var session = require('koa-session');
var session = require('./session');


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
	


	this.use(koa_body());/*添加post body处理中间件*/
	this.use(function *(next) {
		this.post = this.request.body; 
		yield next;
	});
	this.sessionHandler();
	this.extendFromContext();/*扩展context*/
}

Server.prototype.sessionHandler = function(){
	/*
	*为了配合 ember simple auth 这里通过header 的 Authorization 传递认证参数
	*然后，在这里重新组合成cookie形式，通过session的默认方式去判断。
	*
	*/
	var self = this;
	this.keys = this.app.options.sessionSecretKey;/*设置session 加密字段*/
	this.use(function *(next){
		if(this.get('Authorization')){
			var sessionKeyName = self.app.options.sessionKey;
			var sessionSigName = sessionKeyName + '.sig';

			var authorization = JSON.parse(this.get('Authorization'));
			var sessionId = authorization['sessionId'];
			var sessionSig = authorization['sessionSig'];
			this.accept.headers.cookie = sessionKeyName + "=" + sessionId + "; " + sessionSigName + "=" + sessionSig;
		}
		yield next;
		/*如果判断为初次创建session 也就是登录的时候，自动赋值session信息到登录返回信息中。*/
		if(this.sessionSig){
			this.body.sessionId = this.sessionId;
			this.body.sessionSig = this.sessionSig;
		}

	})

	this.use(session({key:this.app.options.sessionKey}));/*使用session ,以及设置session 在cookie中的名称*/

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



