var fs = require('fs');
var path = require('path')

module.exports = Module


function Module(options){
	this.controllers = {}
	this.options = options;
	this.optionHandler();
}

Module.prototype.controllerDefiner = function(){

}


Module.prototype.optionHandler = function(){
	var options = this.options;
	if(!options.name) optionError('name');
	this.name = this.options.name 	= 	options.name;

	if(!options.url) 	optionError('.url');
	this.url = this.options.url = options.url

	if(!options.path)  optionError('.path');
	this.path = this.options.path = path.join(path.dirname(require.main.filename),options.path)

	/*下面的路径都依赖this.options.path*/

	if(!options.controllers) optionError('controllers');
	this.options.controllers = this.pathHandler(options.controllers);

	if(!options.models) optionError('models');
	this.options.models = this.pathHandler(options.models);

	if(!options.views)  optionError('views');
	this.options.views = this.pathHandler(options.views);

	if(!options.dbResources) optionError('dbResources');
	this.options.dbResources = this.pathHandler(options.dbResources);

	if(!options.staticResources) optionError('staticResources');
	this.options.staticResources = this.pathHandler(options.staticResources);

	function optionError(optionName){
		console.error("module`s "+ optionName+ " can`t be empty!");
		throw new Error(); 
	}


}


Module.prototype.loadControllers = function(loaderMethod){
	
	var ctrlsPaths = this.options.controllers;
	/* ctrlsPaths 是一个 modules 的 controllers路径数组*/



	for(var i in ctrlsPaths){
		if (loaderMethod == 'async') {
			this.controllerLoader(ctrlsPaths[i]);
		}

		else if (loaderMethod == 'sync') {
			this.syncControllerLoader(ctrlsPaths[i])
		}
		else {
			console.error('加载器的参数是 sync 或者 async');
			throw new Error()
		}
	}

}


Module.prototype.controllerLoader = function(ctrlPath){
	/*ctrlPath 是modules 控制器文件夹中的一个*/
	fs.readdir(ctrlPath,function(err,ctrlFilesName){
		if (err) throw err
			for(var i in ctrlFilesName){
				var ctrlFile = path.join(ctrlPath,ctrlFilesName[i])

				require(ctrlFile)
			}

		})
}

Module.prototype.syncControllerLoader = function(ctrlPath){
	var ctrlFilesName = fs.readdirSync(ctrlPath);
	for(var i in ctrlFilesName){
		var ctrlFile = path.join(ctrlPath,ctrlFilesName[i])

		require(ctrlFile)
	}
}


Module.prototype.pathHandler = function(optionPath){
	var newPath
	if(optionPath instanceof Array){
		newPath = new Array();
		for(var i in optionPath){
			newPath[i] = path.join(this.path,optionPath[i])
		}
	}
	else{
		newPath = path.join(this.path,optionPath);
	}
	return newPath;

}









