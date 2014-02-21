var http = require("http");
var express = require('express'); 
var path = require('path');



/*-------------- my require ---------------*/
require("date-format-lite")
Date.masks.default = 'YYYY-MM-DD hh:mm:ss'
/*设置时间的默认格式*/
var alaEventHandler = require('./alaEventHandler')
var middleware = require('./middleware');
var configuration = require('./configuration');
var router = require('./router')
var ctrlHandler = require('./ctrlHandler');
var viewHandler = require('./viewHandler');


// var tools = require('./alajsTools');
var db = require('./db');
/*------------------- 核心  -----------------*/
var Core = function(appName){
	var app;
	this.appName = appName;
	// this.rootPath = path.dirname(require.main.filename);
	this.rootPath = path.join(__dirname,'../../../')
	this.controllers = {};  /*控制器对象集合*/
	this.models = {};

	this.bootstrap = function(){
		alaEventHandler(this);  /*框架事件handler*/

		this.express = express(); /*启动express*/
		app = this.express;

		configuration(this);/*配置文件*/
		middleware(this);/*中间件管理*/
		router = router(this);
		ctrlHandler(this);
		viewHandler(this);
		db(this);
		this.createHttp();/*启动http服务*/
		// tools(this);
	}

	this.get = function(configName){
		return app.get(configName);
	}
	this.set = function(configName,value){
		app.set(configName,value)
	}


	this.createHttp = function(){
		app.set('port',process.env.PORT || app.get('port'));
		app.listen(this.get('port'));
		console.log("[Server Start]listen on --->".success+" http://127.0.0.1:".red+this.get('port').toString().red);
	}

	this.route = function(method,path,callbacks){
		if(method == 'get'){
			app.get(path,function(req,res,next){
				callbacks(req,res,this)
			});
		}
		else if(method == 'post'){
			app.post(path,callbacks);
		}
		else if(method == 'put'){
			app.put(path,callbacks);
		}
		else if(method == 'delete'){
			app.delete(path,callbacks);
		}else{
			alajs.echoError(method +' method 不存在!!!')
		}
	}

	this.use = function(middle){
		app.use(middle);
	}


	this.getModel =  function(modelName){
		if(typeof this.models[modelName] == 'function'){
			return this.models[modelName];
		}else{
			alajs.echoError(modelName + " 模型不存在");
			return null
		}
	}


	this.getDate =function(){
		var now = new Date();
		return now.format();
	}




}



module.exports = Core;


