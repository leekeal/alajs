var fs = require("fs");
var path = require("path");
var ala;
var app;
module.exports = function(core){
	ala = core;
	app = ala.express;
	ctrlHandler = new CtrlHandler();
	ctrlHandler.loadCtrl();

}

CtrlHandler = function(){

	this.loadCtrl = function(){
		fs.readdir(app.get("controllerPath"),function(err,files){  /*读取控制器目录*/
			files.forEach(function(file){
				var filePath = path.join(app.get("controllerPath"),file);
				fs.stat(filePath,function(err,stat){
					if(stat.isFile()){     /*是文件的直接加入控制器集合*/
						ala.controllers[path.basename(file,'.js')] = require(filePath);
					}
					else if(stat.isDirectory()){ /*是文件夹的，继续读取子文件，把子文件加入控制器集合*/
						ala.controllers[file] = {}
						fs.readdir(filePath,function(err,files){
							files.forEach(function(subFile){
								var subFilePath = path.join(app.get("controllerPath"),file,subFile);
								fs.stat(subFilePath,function(err,stat){
									if(stat.isFile()){
										ala.controllers[file][path.basename(subFile,'.js')] = require(subFilePath)
									}
								});
							});
						});
					}
				});
			});
		});
	}
}