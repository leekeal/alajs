var ActionDefiner = require('./actionDefiner')
var RESTfulActionHandler = require('./RESTfulAction')

module.exports = ControllerDefiner




function ControllerDefiner(options){
	var self = this;
	this.actions = {};
	this.optionHandler(options);
	this.middlewares = new Array();





	/*为控制器定义一个actoin，因为这里的函数，是在控制器定义文件里执行，this指向了全局。所以用self*/
	this.actionDefiner = function(name,options,callback){

		var action = new ActionDefiner();/*创建一个action包装器*/

		action.app = self.app; /*把app实例加入action中*/
		action.module = self.module;/*把当前控制器的模块实例加入模块中*/
		action.controller = self; /*把控制器实例 赋值给action*/
		action.server = self.app.server /*把server实例赋值给action，方便路由*/

		action.optionHandler.apply(action,arguments) /*传入参数*/
		if(self.actions[action.name]){
			throw new Error(self.name + "的" + action.name +' action已经存在')
		}
		self.actions[action.name] = action; /*把action 加入当前控制器的action集合中*/
	}
	this.use = function(callback){
		self.middlewares.push(callback)
	}

	/*覆盖默认的REST方法*/
	this.overwriteREST = function(name,options,callback){
		if(!self.actions[name]){
			throw new Error(self.name + "的" + name +' action不存在，不用重写')
		}
		delete self.actions[name]
		self.actionDefiner(name,options,callback)
	}
	/*给actionDefiner 附加控制器的中间件添加器*/
	this.actionDefiner.use = this.use;
	this.actionDefiner.overwriteREST = this.overwriteREST;


}

ControllerDefiner.prototype.init = function(){
	if(this.options.REST){
		RESTfulActionHandler(this);
	}
}

ControllerDefiner.prototype.optionHandler = function(options){
	this.moduleName = options.module
	this.name = options.name;
	this.url = options.url;
	this.options = options;

}
ControllerDefiner.prototype.addRESTSupport = function(){
	RESTfulActionHandler(this);
}
/*把把action路由到对应的路由上*/
ControllerDefiner.prototype.routeAction = function(){
	var actions = this.actions;

	for(var actionName in actions){
		var action = actions[actionName]
		action.route();
	}
}





















