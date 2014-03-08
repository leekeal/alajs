var fs = require("fs");
var path = require("path");
var util = require('util');

var core;
module.exports = function(coreOrigin,mName){
	core = coreOrigin
	var ctrlPath;

	if(typeof mName == 'string'){
		ctrlPath = core.modules[mName].config.controllerPath;
		core.modules[mName].controllers = loadHandler(ctrlPath);
		
	}
	else if(!mName){
		ctrlPath = app.get('controllers');
		core.controllers = loadHandler(ctrlPath);

		var bootNext = mName;
	}



}


function loadHandler(ctrlPath){
	var	controllers = {}
	var files = fs.readdirSync(ctrlPath);/*读取控制器目录*/

	for(var index in files){
		var fileName = files[index];
		var filePath = path.join(ctrlPath,fileName);
		var stat = fs.statSync(filePath);
		if (stat.isFile()) { 
			// 是文件的直接加入控制器集合
			var controller = require(filePath);
			console.log(filePath);
			// controller = new controller(core);
			controllers[path.basename(fileName,'.js')] = controller;
		}

	}
	return controllers;
}