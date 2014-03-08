var path = require('path');
var express = require('express'); 
var alajs = require('alajs'); 

var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);







module.exports = function(app,bootNext){
	app.middleware= {}
	
	app.middleware.flash = flash
	app.middleware.MongoStore = MongoStore

	

	var middlewareConfig = require(path.join(app.paths.app,'/config/middleware.conf'));
	middlewareConfig(app);


	console.info('路由中间件设置成功');
	bootNext()
	
}

