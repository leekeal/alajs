var fs = require('fs');
var path = require('path')

module.exports = Module


function Module(options){
	this.controllers = {}
	this.options = options;
	this.optionHandler();
	this.modles = {}
	this.middlewares = new Array();
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

Module.prototype.load = function(){

}

Module.prototype.requireControllers = function(){
	var ctrlsPaths = this.options.controllers;
	/* ctrlsPaths 是一个 modules 的 controllers路径数组*/
	for(var i in ctrlsPaths){
		var ctrlPath  = ctrlsPaths[i];
		var ctrlFilesName = fs.readdirSync(ctrlPath);
		for(var i in ctrlFilesName){
			var ctrlFile = path.join(ctrlPath,ctrlFilesName[i])

			require(ctrlFile)
		}
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


Module.prototype.use = function(callback){
	this.middlewares.push(callback);
}













