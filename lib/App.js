var http = require("http");
var express = require('express'); 
var path = require('path');



var colors = require('colors');
console.log('ALAjs start ok!!!'.green);

var middleware = require('./middleware');

ALAjs = function(appName){
	var app;
	var appName = appName;
	this.rootPath = path.dirname(require.main.filename);
	this.use = null;

	this.bootstrap = function(){
		this.express = express();
		app = this.express;
		this.setConfig();
		this.setPath();
		
		middleware(this);

		this.createHttp();
	}
	this.createHttp = function(){
		app.set('port',process.env.PORT || app.get('port'));
		app.listen(app.get('port'));
		console.log("listen on ".green+app.get('port'));
	}

	this.getConfig = function(){
		return config = require(path.join(this.rootPath ,appName,'/config/app.conf'));
	}

	this.setPath= function(){
		app.set('appPath',path.join(this.rootPath ,appName))
	}

	this.setConfig = function(){
		config = this.getConfig();
		for (var env in config){
			for(var index in config[env]){
				if(env == "general"){
					app.configure(function(){
						app.set(index,config[env][index]);
					})
				}
				else{
					app.configure(env,function(){
						app.set(index,config[env][index]);
					})
				}
			}
		}
	}

}
module.exports = ALAjs;



