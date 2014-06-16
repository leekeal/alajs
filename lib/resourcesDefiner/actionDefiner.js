var path = require('path')
var validator = require('validator');


module.exports = ActionDefiner;



function ActionDefiner(name,options,callback){
	var self = this;
	this.name = {}
	this.app = {};
	this.server = {};
	this.callback = {};
	this.middlewares = new Array();



	/*修改当前动作的上下文对象*/
	this.context = function *(next){
		this.action = self /*把action管理对象添加到上下文中*/
		yield next
	}
}



ActionDefiner.prototype.route = function(){
	console.info(this.method  + ' ---> ' + this.url);
	
	/*中间件处理*/
	/*合并整个流程的中间件*/
	var middlewares = this.app.middlewares.concat(this.module.middlewares,this.controller.middlewares,this.middlewares);
	middlewares.push(this.callback)

	middlewares.unshift(actionOpenAuthHandler)
	middlewares.unshift(this.context)
	middlewares.unshift(this.url)  /*数组的第一个元素不是中间件，是路由url。整个数组作为参数通过apply传递给route*/

	this.server[this.method].apply(this.server,middlewares)


}





ActionDefiner.prototype.optionHandler = function(name,options,callback){
	this.options = options;
	// if( typeof name != 'string' || !validator.isAlpha(name)){
	if( typeof name != 'string' ){
		console.error(this.controller.name + ' 控制器里的action 名称错误!');
		console.error('action 的第一个参数为action名称不能为空,且只能为字母!');
		throw new Error();
	}
	this.name = name;

	if(this.name == 'all'){
		this.callback = callback;
		this.method = 'get';
		this.url = path.join(this.module.url,this.controller.url+'s')
		return ;
	}

	if(this.name == 'one'){
		this.callback = callback;
		this.method = 'get';
		this.url = path.join(this.module.url,this.controller.url+'s','/:id')
		return ;
	}

	if(this.name == 'update'){
		this.callback = callback;
		this.method = 'put';
		this.url = path.join(this.module.url,this.controller.url+'s','/:id')
		return ;
	}

	if(this.name == 'create'){
		this.callback = callback;
		this.method = 'post';
		this.url = path.join(this.module.url,this.controller.url+'s')
		return ;
	}

	if(this.name == 'delete'){
		this.callback = callback;
		this.method = 'delete';
		this.url = path.join(this.module.url,this.controller.url+'s','/:id')
		return ;
	}
	if(this.name == 'paging'){
		this.callback = callback;
		this.method = 'post';
		this.url = path.join(this.module.url,this.controller.url+'s','paging')
		return ;
	}

	if(arguments.length == 2 && typeof options == 'function'){
		this.callback = options;
		this.method = 'all';
		this.url = path.join(this.module.url,this.controller.url , this.name)
		return ;
	}

	if(arguments.length == 3 && typeof options == 'object' && typeof callback == 'function'){ /*这里的options没有处理数组的情况，数组也属于object*/
		this.callback = callback;
		this.method = options.method ? options.method : 'all'

		if(!options.url){ /*如果 url 没有指定 模型+控制器+action*/
			this.url = path.join(this.module.url,this.controller.url,this.name);
		}
		else if(options.url.match(/^\//)){ /*url 以 / 开始 绝对路径*/
			this.url = options.url
		}
		else { 	/*相对控制器的路径*/
			this.url = path.join(this.module.url,this.controller.url,options.url)
		}
		return 
	}
	console.error(this.controller.name + " 控制器里的action`s arguments = 2, action(name,callback)");
	console.error(this.controller.name + " 控制器里的action`s arguments = 3 action(name,{method:'get',url:'/example/:id?'},callback)");
	throw new Error();


}


ActionDefiner.prototype.use = function(callback){
	this.middlewares.push(callback)
}


/*action middleware*/
function *actionOpenAuthHandler(next){
	var open;
	var action = this.action;
	var app = action.app.options.open
	var module = action.module.options.open
	var controller = action.controller.options.open

	if(typeof app == 'boolean') open = app;
	if(typeof module == 'boolean') open = module;
	if(typeof controller == 'boolean') open = controller;
	if(typeof action.options.open == 'boolean') open = action.options.open;
	this.open = open;
	yield next

}


