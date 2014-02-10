var path = require('path');
var express = require('express'); 
Middleware = function(ala){
	var app = ala.express;
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(ala.rootPath,app.get('publicFloder'))));

}

module.exports = Middleware;