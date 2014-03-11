var ModuleDefiner = require('./resourcesDefiner/moduleDefiner');
var ControllerDefiner = require('./resourcesDefiner/controllerDefiner');
var Server = require('./server');


module.exports =  Definer  



function Definer(){
	this.modules = {}	/*模块容器*/
}


Definer.prototype.defaultModule = function(moduleName){
	this.modules.default = moduleName;
	return this;
}

Definer.prototype.load = function(loaderMethod){
	for(var moduleName in this.modules){

		if (moduleName == 'default') return   /*defalut 是指定默认模块的参数*/

			this.moduleLoder(moduleName,loaderMethod);
		console.info(loaderMethod + ' successfully loaded ' + moduleName + ' module');
	}
}

Definer.prototype.moduleLoder = function(name,loaderMethod){
	this.modules[name].loadControllers(loaderMethod);

}

/*
**模块definer 工厂函数
*/
Definer.prototype.module =function(options){
	ModuleDefiner.__proto__ = this
	var module = new ModuleDefiner(options);
	this.modules[module.name] = module;
// module.loadControllers();
}

/*
**控制器difner 工厂函数
*/
Definer.prototype.controller = function(options){
	var controller = new ControllerDefiner(options);
	/*定义一个控制器*/
	if(!controller.moduleName){  /*如果没有指定模块名称，就加入默认的module*/
		controller.moduleName = this.modules.default;
	}

	if(!this.modules[controller.moduleName]){
		console.error(controller.moduleName + ' module does`t exist');
		throw new Error();
	}

	var currentModule = this.modules[controller.moduleName];

	if(currentModule.controllers[controller.name]){

		console.error(controller.moduleName + '模块的 ' + controller.name + '控制器 已经被定义，请检查是否重复');
		throw new Error();
	}

	currentModule.controllers[controller.name] = controller;


	return controller.actionDefiner;/*返回当前控制器的action 定义器*/

}

/*
**server definer 工厂函数
*/
Definer.prototype.server = function(options){
	var server = new Server();
	server.optionsHandler(options);
	return server
}











