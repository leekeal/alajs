var path = require('path');
var express = require('express'); 

var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;

	
	app.use(express.favicon(path.join(app.get('publicFloder'),'favicon.ico')));
	app.use(express.logger(app.get('logger')));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	// app.use(ctrlHandler());
	app.use(app.router);
	/*静态文件，文件夹管理器*/
	if (app.get('directory')) {
		app.use(express.directory(app.get('publicFloder')))
	}

	app.use(express.static(app.get('publicFloder')));
	/*404*/
	// app.use(function(req, res, next){
	// 	res.status(404);
	// 	res.send("你访问的页面不存在");
	// });
	
	/*如果是没有设置配置文件的模式下，404转到欢迎*/
	if (app.get('env') == 'default') {
		app.get('/*',function(req,res,next){
			res.send('<h1>欢迎使用ALA团队出品的alajs框架</h1>');
		});
	}else{
		app.use(function(req, res, next){
			res.status(404);
			res.send("你访问的页面不存在");
		});
	};

}

