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

var Boot = require('./bootMiddleware');


// var tools = require('./alajsTools');
var db = require('./new_db');


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


		boot = new Boot(this);

		boot.use(configuration)
		boot.use(db);
		boot.use(router)
		boot.use(middleware)  /*必须在控制器加载之前，控制器中会用到flash中间件*/
		boot.use(ctrlHandler)
		boot.use(viewHandler)

		boot.use(function(core,next){
			core.set('port',process.env.PORT || core.get('port'));
			core.express.listen(core.get('port'));
			console.log("[Server Start]listen on --->".success+" http://127.0.0.1:".red+core.get('port').toString().red);
			next()
		})
		// boot.use(tools)

		boot.start()
	}


	this.validator = require('validator');


	this.get = function(configName){
		return app.get(configName);
	}
	this.set = function(configName,value){
		app.set(configName,value)
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


