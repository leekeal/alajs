var fs = require("fs");
var path = require("path");
var util = require('util');
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;
	var ctrlHandler = new CtrlHandler();
	ctrlHandler.loadCtrl();
	ala.getControllers = ctrlHandler.getControllers;
}

function CtrlHandler(){


	this.getControllers = function(){
		return ala.controllers;
	}

	this.loadCtrl = function(){
		alajs.echoInfo('(2) load ctrollers success');
		try{
			var files = fs.readdirSync(app.get("controllerPath"));/*读取控制器目录*/

			files.forEach(function(file){
				var filePath = path.join(app.get("controllerPath"),file);
				var stat = fs.statSync(filePath);
				if (stat.isFile()) { /*是文件的直接加入控制器集合*/
					var controller = require(filePath);
					ala.controllers[path.basename(file,'.js')] = controller;
				}
			});
		}catch(err){
			// alajs.echoError('控制器目录不存在');
		}
	}
}