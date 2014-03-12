var path = require('path')
var validator = require('validator');


module.exports = ActionDefiner;



function ActionDefiner(name,options,callback){
	var self = this;
	this.name = {}
	this.app = {};
	this.server = {};
	this.callback = {};
}



ActionDefiner.prototype.route = function(){
	console.log(this.method  + ' ---> ' + this.url);
	

	console.log(this.callback);
	this.server[this.method].call(this.server,this.url,this.callback)


}

ActionDefiner.prototype.optionHandler = function(name,options,callback){
	if( typeof name != 'string' || !validator.isAlpha(name)){
		console.error(this.controller.name + ' 控制器里的action 名称错误!');
		console.error('action 的第一个参数为action名称不能为空,且只能为字母!');
		throw new Error();
	}
	this.name = name;

	if(arguments.length == 2 && typeof options == 'function'){
		this.callback = options;
		this.method = 'all';
		this.url = path.join(this.controller.url , this.name)
		return ;
	}

	if(arguments.length == 3 && typeof options == 'object' && typeof callback == 'function'){ /*这里的options没有处理数组的情况，数组也属于object*/
		this.callback = callback;
		this.method = options.method ? options.method : 'all'
		this.url = options.url ? options.url : path.join(this.controller.url,this.name)
		return 
	}

	console.error(this.controller.name + " 控制器里的action`s arguments = 2, action(name,callback)");
	console.error(this.controller.name + " 控制器里的action`s arguments = 3 action(name,{method:'get',url:'/example/:id?'},callback)");
	throw new Error();


}


