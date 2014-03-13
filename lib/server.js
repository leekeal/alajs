var koa = require('koa');
var router = require('koa-router')




module.exports = Server;
Server.prototype.__proto__ =  new koa()/*继承koa*/
function Server (){
	
}





Server.prototype.optionsHandler = function(options){
	this.port = options.port;
}


Server.prototype.loader = function(app){
	var Application = require('./application');
	if(!(app instanceof Application)){
		console.error('请传入alajs() 产生的对象');
		throw new Error();
	}
	app.server = this; /*给app指定server对象，必须在加载前，因为加载过程中，会使用server对象来产生路由*/

	this.setMiddleware()/*加载之前，必须设置路由中间件，不然action无法自动路由*/
	app.load();/*加载模块资源，自动定义控制器，action，*/
	
}



Server.prototype.setMiddleware = function(){

	this.use(router(this))

}



Server.prototype.bootstrap = function(){
	this.listen(this.port);
}



