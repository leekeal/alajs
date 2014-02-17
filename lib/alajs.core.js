var http = require("http");
var express = require('express'); 
var path = require('path');


/*-------------- my require ---------------*/
var handlers = require("./globalHandler"); /*开启全局工具*/
var alaEventHandler = require('./alaEventHandler')
var middleware = require('./middleware');
var configuration = require('./configuration');
var router = require('./router')
var ctrlHandler = require('./ctrlHandler');
// var db = require('./db')();
/*------------------- 核心  -----------------*/
var Core = function(appName){
	var app;
	this.appName = appName;
	this.rootPath = path.dirname(require.main.filename);
	this.controllers = {};  /*控制器对象集合*/

	this.bootstrap = function(){
		alaEventHandler(this);
		this.express = express();
		app = this.express;
		configuration(this);/*配置文件*/
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

/*------------------- 占用全局alajs命名  -----------------*/
GLOBAL.alajs = {
	bootstrap:function(appName){
		handlers();/*加载handlers*/
		var core = new Core(appName);
		core.bootstrap();
		return core;
	}
}

module.exports = global.alajs;


/* debugger */