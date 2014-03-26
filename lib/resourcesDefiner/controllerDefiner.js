var ActionDefiner = require('./actionDefiner')

module.exports = ControllerDefiner




function ControllerDefiner(options){
	var self = this;
	this.actions = {};
	this.optionHandler(options);
	this.middlewares = new Array();





	/*为控制器定义一个actoin，因为这里的函数，是在控制器里执行，this指向了全局。所以用self*/
	this.actionDefiner = function(name,options,callback){

		var action = new ActionDefiner();/*创建一个action包装器*/

		action.app = self.app; /*把app实例加入action中*/
		action.module = self.module;/*把当前控制器的模块实例加入模块中*/
		action.controller = self; /*把控制器实例 赋值给action*/
		action.server = self.app.server /*把server实例赋值给action，方便路由*/

		action.optionHandler.apply(action,arguments) /*传入参数*/
		self.actions[action.name] = action; /*把action 加入当前控制器的action集合中*/
		action.route();/*开始自动路由*/
	}
	this.use = function(callback){
		self.middlewares.push(callback)
	}

	this.actionDefiner.use = this.use;


}

ControllerDefiner.prototype.optionHandler = function(options){
	this.moduleName = options.module
	this.name = options.name;
	this.url = options.url;
	this.options = options;

}









