var handlers = require("./globalHandler"); /*开启全局工具*/
var http = require("http");
var express = require('express'); 
var path = require('path');
var middleware = require('./middleware');
var configuration = require('./configuration');
var router = require('./router');
var ctrlHandler = require('./ctrlHandler');

ALAjs = function(appName){
	var app;
	this.appName = appName;
	this.rootPath = path.dirname(require.main.filename);
	this.controllers = {};  /*控制器对象集合*/

	this.bootstrap = function(){
		handlers(this);/*加载handlers*/
		this.express = express();
		app = this.express;
		configuration(this);/*配置文件*/
		debugger;
		middleware(this);/*中间件管理*/
		ctrlHandler(this);
		router = router(this);

		this.createHttp();/*启动http服务*/
	}

	this.createHttp = function(){
		app.set('port',process.env.PORT || app.get('port'));
		app.listen(app.get('port'));
		console.log("[Server Start]listen on --->".success+" http://127.0.0.1:".red+app.get('port').toString().red);
	}


}
module.exports = ALAjs;



/* debugger */