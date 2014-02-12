var path = require('path');
var express = require('express'); 
// var ctrlHandler = require('./middle_ctrl')

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
}

