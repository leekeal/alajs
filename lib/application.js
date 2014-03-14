var Definer = require('./definer')
var dabaseDefiner = require('./resourcesDefiner/databaseDefiner')
var Emitter = require('events').EventEmitter;
var path = require('path')
module.exports = Application;
var async = require('async')
var fs = require('fs');



Application.prototype.__proto__ = Emitter.prototype;
function Application(){
	var self;
	this.path = path.join(path.dirname(require.main.filename))
	this.modules = {};  /*模块对象集合*/
	this.name = {};/*Application 名称*/
	this.server = {};/* 服务器的对象*/
	this.define = new Definer(this); /*加载定义器*/
	this.middlewares = new Array(); /*中间件集合*/
	this.dbs = {}; /*数据库连接集合*/
	this.models = {}; /*公共模型*/
	

}

Application.prototype.optionsHandler = function(options){
	this.options = options;
	this.name = options.name;

}

Application.prototype.use = function(callback){
	this.middlewares.push(callback)
}


// Application.prototype.comesFunctionToRequest = function(){

// }





Application.prototype.moduleLoad = function(){
	for(var moduleName in this.modules){
		if (moduleName == 'default') return   /*defalut 是指定默认模块的参数,不是模块*/
			this.modules[moduleName].loadControllers();
		console.info(' successfully loaded ' + moduleName + ' module');
	}
}

/*Application 资源加载器*/
Application.prototype.load = function(){
	this.addListener('databaseConnected',function(){
		this.modelLoader();
		this.moduleLoad();
	})
	this.databaseConnect(); /*连接数据库*/
}


Application.prototype.databaseConnect = function(){
	var self = this;
	var dbOptions = this.options.databases
	var dbConnectInfo = new Array();
	for(var i in dbOptions){
		dbConnectInfo.push({name:i,url:dbOptions[i]})
	}
	/*顺序加载数据库*/
	async.map(dbConnectInfo,dabaseDefiner,function(err,dbs){
		for(var i in dbs){
			var db =  dbs[i]
			self.dbs[db.name] = db.connect;
		}
		self.emit('databaseConnected');
	});


}


Application.prototype.modelLoader = function(){
	var modelsPaths = this.options.models
	for(var i in modelsPaths){
		var modelsPath = path.join(this.path,modelsPaths[i]);
		var filesName = fs.readdirSync(modelsPath);
		for(var i in filesName){
			require(path.join(modelsPath,filesName[i]))
		}
		
	}
	this.copyModelsFromDbs();
}

Application.prototype.copyModelsFromDbs = function(){
	var dbs = this.dbs;
	for(var dbName in dbs){
		var db = dbs[dbName];
		for(var modelName in db.models){
			if(this.models[modelName]){
				console.error(modelName + '模型名称重复,请检查');
				throw new Error();
			}
			this.models[modelName] = db.models[modelName]
		}
	}
}

Application.prototype.getModeler = function(name){
	if(!name){
		return this.dbs['default']
	}
	else
		return this.dbs[name]

}








