var ActionDefiner = require('./action')

module.exports = ControllerDefiner




function ControllerDefiner(options){
	var self = this;
	this.actions = {};
	this.optionHandler(options);






	this.actionDefiner = function(name,options,callback){
		var action = new ActionDefiner();/*创建一个action包装器*/
		action.controller = self; /*把控制器实例 赋值给action*/
		action.optionHandler.apply(action,arguments) /*传入参数*/
		self.actions[action.name] = action; /*把action 加入当前控制器的action集合中*/
	}


}

ControllerDefiner.prototype.optionHandler = function(options){
	this.moduleName = options.module
	this.name = options.name;
	this.url = options.url;

}






