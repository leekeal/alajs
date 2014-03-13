var Definer = require('./definer')
var dabaseDefiner = require('./resourcesDefiner/databaseDefiner')
var Emitter = require('events').EventEmitter;
var path = require('path')
module.exports = Application;
var async = require('async')



Application.prototype.__proto__ = Emitter.prototype;
function Application(){
	var self;
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
	this.path = path.join(path.dirname(require.main.filename))

}

Application.prototype.use = function(callback){
	this.middlewares.push(callback)
}






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
		require(this.path + '/share/models/user.js')
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

Application.prototype.getModeler = function(name){
	if(!name){
		return this.dbs['default']
	}
	else
		return this.dbs[name]

}









