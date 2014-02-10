var http = require("http");
var express = require('express'); 
var path = require('path');



var colors = require('colors');
console.log('ALAjs start ok!!!'.green);

var middleware = require('./middleware');

ALAjs = function(appName){
	var app;
	this.appName = appName;
	this.rootPath = path.dirname(require.main.filename);

	this.bootstrap = function(){
		this.express = express();
		app = this.express;
		/*配置*/
		this.setConfig();
		this.setPath();            
		middleware(this);
		/*启动http服务*/
		this.createHttp();



		var hbs = require('hbs');
		app.get('/hello', function(req, res){
			res.render('index', { title: 'Express' });
		});

		
	}

	this.createHttp = function(){
		app.set('port',process.env.PORT || app.get('port'));
		app.listen(app.get('port'));
		console.log("listen on ".green+app.get('port'));
	}

	this.getConfig = function(){
		return config = require(path.join(this.rootPath ,this.appName,'/config/app.conf'));
	}

	this.setPath= function(){
		app.set('appPath',path.join(this.rootPath ,this.appName));
		app.set('views',path.join(app.get('appPath'),app.get('views')));
		app.set('publicFloder',path.join(this.rootPath,app.get('publicFloder')||'public'))
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



