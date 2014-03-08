var path = require('path');
var merge = require('merge-descriptors');
var express = require('express'); 
var proto = require('./application');
var connect = require('connect')
var utils = connect.utils;
exports = module.exports = createApplication;


merge(exports,express);

function createApplication(){
	var appPath = arguments[0]
	var app = express();
    app.paths = {};
    app.paths.app = appPath;
    app.paths.root = path.dirname(require.main.filename);
	/*合并自由对象*/
	utils.merge(app, proto);
	app.bootstrap();

	return app;
}






// Error handler title
exports.errorHandler.title = 'ALAJS';