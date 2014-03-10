var ModuleDefiner = require('./definer/module');
var ControllerDefiner = require('./definer/controller');

module.exports =  definer  




function definer(){
	this.modules = {}

	// this.modules  =  core.modules
	/* this.modules指向了了核心的modules 是一个object*/


	this.defaultModule = function(moduleName){
		this.modules.default = moduleName;
		return this;
	}

	this.ok = function(loaderMethod){
		for(var moduleName in this.modules){

			if (moduleName == 'default') return   /*defalut 是指定默认模块的参数*/

			this.moduleLoder(moduleName,loaderMethod);
			console.info(loaderMethod + ' successfully loaded ' + moduleName + ' module');
		}
	}

	this.moduleLoder = function(name,loaderMethod){
		this.modules[name].loadControllers(loaderMethod);

	}



	this.module =function(options){
		var module = new ModuleDefiner(options);
		this.modules[module.name] = module;
		// module.loadControllers();
	}








	this.controller = function(options){
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



	
}









