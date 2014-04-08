// var AppDefiner = require('./resourcesDefiner/appDefiner')  /*放弃定义一个app，define就是一个定义*/
var ModuleDefiner = require('./resourcesDefiner/moduleDefiner');
var ControllerDefiner = require('./resourcesDefiner/controllerDefiner');
var modelDefiner = require('./resourcesDefiner/modelDefiner');
var Server = require('./server');


module.exports =  Definer  



function Definer(app){
	this.app = app
	this.modules = app.modules
}


/*
**模块definer 工厂函数
*/
Definer.prototype.module =function(options){
	var module = new ModuleDefiner(options);
	module.app = this.app; /*把当前app加入模块*/
	this.modules[module.name] = module;
	return module;
// module.loadControllers();
}

/*
**控制器difner 工厂函数
*/
Definer.prototype.controller = function(options){
	var controller = new ControllerDefiner(options);

	/*定义一个控制器*/
	if(!controller.moduleName){  /*如果没有指定模块名称，就加入默认的module*/
		controller.moduleName = this.app.defaultModule;
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
	controller.module = currentModule; /*把模块实例加入 控制器中*/
	controller.app = this.app;/*把当前app信息加入控制器管理器*/
	return controller.actionDefiner;/*返回当前控制器的action 定义器*/

}

/*
**server definer 工厂函数
*/
Definer.prototype.server = function(options){
	var server = new Server(options,this.app);
	return server
}


Definer.prototype.model = function(modelName,dbName,modelInfo,modelOther){
	if(arguments.length == 3){/*如果没有指定数据库名称*/
		modelOther = modelInfo;
		modelInfo = dbName
		dbName = "default"
	}
	var db = this.app.dbs[dbName]; /*获取数据库对象*/
	var model = db.define(modelName,modelInfo,modelOther); /*定义模型*/
	model.__proto__.__proto__= modelDefiner /*继承公共方法*/
	// model.sync() /*同步模型到数据库*/
	return model

}











