var http = require("http");
var express = require('express'); 
var path = require('path');



/*-------------- my require ---------------*/
require("date-format-lite")
Date.masks.default = 'YYYY-MM-DD hh:mm:ss'
/*设置时间的默认格式*/

var alaEventHandler = require('./alaEventHandler')
// var tools = require('./alajsTools');

var moduleHandler = require('./moduleHandler');


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
		// this.configs = app.settings;

		moduleHandler(this);

	}


	this.validator = require('validator');




	this.config = function(configName,value){
		if(value || typeof value == 'boolean' || typeof value == 'string'){
			set();
		}
		else if(!value && configName){
			return get();
		}
		else{
			throw new Error('没有指定参数名称');
		}

		function set(){
			app.set(configName,value)
		}
		function get(){
			return app.get(configName);
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
			return false;
		}
	}


	this.getDate =function(){
		var now = new Date();
		return now.format();
	}

	this.route = function(method,path,callbacks){
		if (typeof callbacks != 'function') {
			throw new Error(method+" "+path+' 方法不存在');
		};

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

	this.get = function(){	
		app.get.apply(app,arguments);
	}

	this.all = function(){
		app.all.apply(app,arguments);
	}

	this.post = function(){
		app.post.apply(app,arguments);
	}
	this.put = function(){
		app.put.apply(app,arguments);
	}

	this.del = function(){
		app.delete.apply(app,arguments);
	}





}



module.exports = Core;


